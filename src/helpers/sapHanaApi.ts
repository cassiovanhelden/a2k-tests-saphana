import axios from 'axios';
import { sapHanaConfig } from '../../config';

const baseUrl = 'https://my305939.s4hana.ondemand.com/sap/opu/odata/sap/';

export class SapHanaApi {
    constructor() {
    }

    async getTimeEntries() {
        try {
            return await axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: sapHanaConfig.username,
                    password: sapHanaConfig.password
                },
                timeout: 180000,
                url: `${baseUrl}API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$filter=TimeSheetStatus eq '10' or TimeSheetStatus eq '20' or  TimeSheetStatus eq '30' or TimeSheetStatus eq '40' or TimeSheetStatus eq '50'`,
                method: 'GET'
            });
        } catch (error) {
            throw error.stack;
        }
    }

}