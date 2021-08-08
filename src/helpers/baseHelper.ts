import { step } from '../../init';
import { config } from '../../config';
import { Workspace, MicroappsAdmin, CitrixCloud } from 'microapps-automation-helper';
import {PageHelper} from "./pageHelper";
import {
    LookUp,
    Microapp,
    PageContext,
    Table,
    Select,
    DateTime,
    Login,
    TextArea, DateElement, PageButton, Input, MicroappSelector, InputSelect
} from "../types/pageTypes";

const {
    microappsAdminUrl,
    citrixCloudClientId,
    citrixCloudClientSecret,
    citrixCloudCustomerId,
    cwaAPI,
    workspaceIdentityProvider,
    workspacePassword,
    workspaceUrl,
    workspaceUsername,
} = config;


const citrixCloud = new CitrixCloud();
const microappsAdmin = new MicroappsAdmin();
const workspace = new Workspace();
const ph = new PageHelper();

let bearerToken: string;
let authInstance: any;


/** Class representing the Integration Helper. */
export class BaseHelper {
    integrationName: string;

    constructor(integrationName: string) {
        this.integrationName = integrationName;
    }

    async simpleLoginToWorkspace({page, context}: PageContext) {
        await step(context)('Login to Workspace', async () => {
            await workspace.login({
                page,
                workspaceUrl,
                workspaceUsername,
                workspacePassword,
                workspaceIdentityProvider,
            });
        });
    }

    async commonIntegrationProcesses({ page, context, synchronizationType }: Login) {
        await step(context)('Get Citrix Cloud token', async () => {
            bearerToken = await citrixCloud.getCCBearerToken({
                cwaAPI,
                citrixCloudCustomerId,
                citrixCloudClientId,
                citrixCloudClientSecret,
            });
        });

        await step(context)('Create Authorization instance for Citrix Cloud', async () => {
            authInstance = await citrixCloud.createAuthInstance({ bearerToken });
        });

        await step(context)('API OAuth logout', async () => {
            let integrationName = this.integrationName;
            await microappsAdmin.oauthLogout({ authInstance, microappsAdminUrl, integrationName, repeatCount: 2 });
        });

        await step(context)(`Run  ${synchronizationType}`, async () => {
            let integrationName = this.integrationName;
            await microappsAdmin.runSynchronization({
                authInstance,
                microappsAdminUrl,
                integrationName,
                synchronizationType,
            });
        });

        await step(context)('Login to Workspace', async () => {
            await workspace.login({
                page,
                workspaceUrl,
                workspaceUsername,
                workspacePassword,
                workspaceIdentityProvider,
            });
        });
    }

    async openMicroappBlade({ page, context, selector, microappSelector }: MicroappSelector) {
        await step(context)('Go to Actions', async () => {
            await workspace.goToActions({ page });
        });

        await step(context)(`Open Microapp`, async () => {
            await ph.clickOnSelector(page, microappSelector);
        });

        await step(context)(`Open Microapp Blade`, async () => {
            await ph.clickOnSelector(page, selector);
        });
    }

    async openMicroappBladeSimple({ page, context, selector, microappSelector }: MicroappSelector) {
        await step(context)(`Open Microapp Blade`, async () => {
            await ph.clickOnSelector(page, selector);
        });
    }


    async fillLookUp({ page, context, text, lookupSelector}: LookUp) {
        await step(context)('Filling Lookup Field', async () => {
            await ph.fillLookup(page, text, lookupSelector)
        });
    }

    async selectRecordOnTable({page, context, selector}: Table) {
        await step(context)('Accessing table record', async () => {
            await ph.clickOnSelector(page, selector)
        });
    }

    async selectOption({ page, context, text, selector}: Select) {
        await step(context)('Picking a start date', async () => {
            await ph.selectOption(page, text, selector)
        });
    }

    async setTextOnSelect({page, context, text, selector}: Select) {
        await step(context)('Setting select text', async () => {
            await ph.setSelectText(page, selector, text)
        });
    }

    async setTextOnInput({page, context, inputText, selector}: InputSelect) {
        await step(context)('Setting input text', async () => {
            await ph.setInputText(page, selector, inputText)
        });
    }

    async setDateTimeValues({page, context, datetime, selector}: DateTime) {
        await step(context)('Setting date & time values', async () => {
            let date = datetime.slice(0,10);
            await ph.setDateTime(page, selector, date)
        });
    }

    async setTextArea({page, context, text}: TextArea) {
        await step(context)('Setting text area', async () => {
            await ph.setTextArea(page, text)
        });
    }


    async setStartDate({page, context, dateText}: DateElement) {
        await step(context)('Picking an end date', async () => {
            await ph.setStartDate(page, dateText)
        });
    }

    async clickOnPageActionButton({page, context}: PageContext) {
        await step(context)('Click on action button', async () => {
            await ph.clickOnPageActionButton(page)
        });
    }

    async clickOnButton({page, context, text}: PageButton) {
        await step(context)('Click on Button', async () => {
            await ph.clickOnButton(page, text)
        });
    }

    async checkForApprovedPopUp({ page, context }: PageContext) {
        await step(context)('Success Popup has been displayed', async () => {
            await workspace.waitForPopUp({
                page,
                text: 'Your request will be processed in',
            });
        });
    }
}

