import { step } from '../../init';
import {Input, Login, PageContext, Select, TextArea} from "../types/pageTypes";
import {BaseHelper} from "./baseHelper";
import {SapHanaApiHelper} from "./sapHanaApiHelper";

const integrationName = 'SAP Hana';
const helper = new BaseHelper(integrationName);
const sapHanaApiHelper = new SapHanaApiHelper();
const { v4: uuidv4 } = require('uuid');
const microappSelector = 'a >> text="' + integrationName + '"';

/** Class representing the SAP Hana Integration Helper. */
export class SapHanaHelper {

    constructor() {}

    async simpleLoginToWorkspace({page, context}: PageContext) {
        await helper.simpleLoginToWorkspace({page, context})
    }

    async startCommonProcess({page, context, synchronizationType}: Login) {
        await helper.commonIntegrationProcesses({page, context, synchronizationType})
    }

    async openCreateTimeEntryMicroapp({ page, context }: PageContext) {
        let selector = 'div[title="Create Time Entry"]';
        await helper.openMicroappBlade({ page, context, selector, microappSelector });
    }

    async searchForEmployee({page, context}: PageContext) {
        let text = 'A2k AdminUsr';
        let lookupSelector = 'data-testid=text-input-search-by-name';
        await helper.fillLookUp({page, context, text, lookupSelector});
    }

    async openEmployeeDetailPage({page, context}: PageContext) {
        let text = 'A2k AdminUsr';
        let selector = `td >> span >> text=${text}`;
        await helper.selectRecordOnTable({page, context, selector});
    }

    async isThePageCorrect({page, context}: PageContext) {
        let selector = "span >> text=A2k AdminUsr";
        await step(context)('Ensuring the page is the correct one', async () => {
            await page.waitForSelector(selector);
            return true;
        });
    }


    async fillTextArea({page, context, text}: TextArea) {
        await helper.setTextArea({page, context, text});
    }

    async fillTimeEntryTextArea({page, context}: PageContext) {
        let id = Math.floor(1000 + Math.random() * 9000);
        let text = "Working on ticket CTX:" + id.toString();
        await helper.setTextArea({page, context, text});
    }

    async setTaskType({page, context}: PageContext){
        let text = 'Training';
        let selector = 'div[data-testid="select-task-type"] > div > div > div > select';
        await helper.setTextOnSelect({page, context, text, selector});
    }

    async setRecordedHours({page, context, inputText}: Input){
        let selector = 'data-testid=text-input-recorded-hours-hh-mm';
        await helper.setTextOnInput({page, context, inputText, selector});
    }


    async validateTimeEntry({page, context}: PageContext, paramName: string, expectedValue: boolean, currentValue: boolean) {
        return await step(context)(`Validating: ` + paramName + 
                            `\n Expected value: ` + expectedValue + 
                            `\n Current value: ` + currentValue , async () => {
                            return (expectedValue===currentValue);
        });
    }

    async clickOnPageActionButton({page, context}: PageContext) {
        await helper.clickOnPageActionButton({page, context});
    }

    async clickOnButton({page, context}: PageContext) {
        let text = "button-add-time-entry";
        await helper.clickOnButton({page, context, text});
    }

    async selectDate({page, context}: PageContext) {
        let dateText = '08/31/2021';
        await helper.setStartDate({page, context, dateText})
    }

    async checkForApprovedPopUp({page, context}: PageContext) {
        await helper.checkForApprovedPopUp({page, context})
    }

}