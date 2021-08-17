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


    async startCommonProcess({page, context, synchronizationType}: Login) {
        await helper.commonIntegrationProcesses({page, context, synchronizationType})
    }

    async openCreateTimeEntryMicroapp({ page, context }: PageContext) {
        let selector = 'div[title="Create Time Entry"]';
        await helper.openMicroappBlade({ page, context, selector, microappSelector });
    }

    async openTimeClockMicroapp({ page, context }: PageContext) {
        let selector = 'div[title="Time Clock"]';
        await helper.openMicroappBlade({ page, context, selector, microappSelector });
    }

    async openTimeClockMicroappStopClock({ page, context }: PageContext) {
        let selector = 'div[title="Time Clock"]';
        await helper.openMicroappBladeSimple({ page, context, selector, microappSelector });
    }


    async fillTextArea({page, context, text}: TextArea) {
        await helper.setTextArea({page, context, text});
    }

    async setTaskType({page, context}: PageContext){
        let text = 'Training';
        let selector = 'div[data-testid="select-1"] > div > div > div > select';
        await helper.setTextOnSelect({page, context, text, selector});
    }

    async setTaskTimeClockType({page, context}: PageContext){
        let text = 'Training';
        let selector = 'div[data-testid="select-1"] > div > div > div > select';
        await helper.setTextOnSelect({page, context, text, selector});
    }

    async setRecordedHours({page, context, inputText}: Input){
        let selector = 'data-testid=text-input-1';
        await helper.setTextOnInput({page, context, inputText, selector});
    }

    async clickOnPageActionButton({page, context}: PageContext) {
        await helper.clickOnPageActionButton({page, context});
    }


    async selectDate({page, context}: PageContext) {
        let dateText = '08/31/2021';
        await helper.setStartDate({page, context, dateText})
    }

    async checkForApprovedPopUp({page, context}: PageContext) {
        await helper.checkForApprovedPopUp({page, context})
    }

}