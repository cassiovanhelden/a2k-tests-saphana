import { SapHanaApi } from './sapHanaApi';
import { sapHanaConfig } from '../../config';

const sahHanaApi = new SapHanaApi();

export class SapHanaApiHelper {

    constructor() {}

    async checkTimeeEntryBaseOnNoteText(text: any) {
        let check = false;
        let timeEntry = await sahHanaApi.getTimeEntries();
        let results = timeEntry.data.d.results;
        for (let i = 0; i < results.length; i++) {
            if (results[i].TimeSheetDataFields.TimeSheetNote.includes(text)) {
                check = true;
            }
        }
        return check
    }


}
