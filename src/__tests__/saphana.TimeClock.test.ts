import { it, step } from '../../init';
import {SapHanaHelper} from "../helpers/sapHanaHelper";
import {SapHanaApiHelper} from "../helpers/sapHanaApiHelper";


const sapHana = new SapHanaHelper();
const sapHanaApi = new SapHanaApiHelper();
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
            await sapHana.openTimeClockMicroapp({page, context});

            //Fill Task Type
            await sapHana.setTaskTimeClockType({page, context});

            //Fill Text Area
            await sapHana.fillTextArea({page, context, text});

            //Click Action Button
            await sapHana.clickOnPageActionButton({page,context});

            //Green PopUp
            await sapHana.checkForApprovedPopUp({page,context});


            await page.keyboard.press('Escape');

            //--------------------------------------------------------//

            //Accessing Microapp Page
            await sapHana.openTimeClockMicroappStopClock({page, context});

            //Click Action Button
            await sapHana.clickOnPageActionButton({page,context});

            //Green PopUp
            await sapHana.checkForApprovedPopUp({page,context});

            expect(await sapHanaApi.checkTimeeEntryBaseOnNoteText(text)).toBeTruthy;


        });
    });

});
