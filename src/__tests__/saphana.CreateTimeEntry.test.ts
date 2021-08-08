import { it, step } from '../../init';
import {SapHanaHelper} from "../helpers/sapHanaHelper";


const sapHana = new SapHanaHelper();
const FIXTURE_NAME = `SAP Hana Test Automation`;
const { v4: uuidv4 } = require('uuid');

describe(FIXTURE_NAME, () => {
    it(FIXTURE_NAME, async ({ context, page }) => {
        await step(context)('Initializing test', async () => {

            let synchronizationType = 'FullSynchronization';
            let text = uuidv4();
            let inputText = '1:23';

            //Login to workspace
            await sapHana.startCommonProcess({page, context, synchronizationType});

            //Accessing Microapp Page
            await sapHana.openCreateTimeEntryMicroapp({page, context});

            //Fill Task Type
            await sapHana.setTaskType({page, context});

            //Fill Date Input
            await sapHana.selectDate({page, context});

            //Fill Recorded Hours
            await sapHana.setRecordedHours({page, context, inputText});

            //Fill Text Area
            await sapHana.fillTextArea({page, context, text});

            //Click Action Button
            await sapHana.clickOnPageActionButton({page,context});

            //Green PopUp
            await sapHana.checkForApprovedPopUp({page,context});

            // expect(await sapHana.isThePageCorrect({page, context})).toBeTruthy;

        });
    });

});