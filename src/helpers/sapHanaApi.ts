import axios from 'axios';
import { sapHanaConfig } from '../../config';

const baseUrl = '';

export class SapHanaApi {
    constructor() {
    }

    // async getEmployee() {
    //     try {
    //         const token = Buffer.from(`${sapHanaConfig.username}:${sapHanaConfig.pwd}`, 'utf8').toString('base64');
    //         return await axios({
    //             headers: {
    //                 "Authorization": `Basic ${token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             timeout: 180000,
    //             url: `${baseUrl}/emps/?q=WorkEmail='a2kadminusr@a2kpartners.com'`,
    //             method: 'GET'
    //         });
    //     } catch (error) {
    //         throw error.stack;
    //     }
    // }

}