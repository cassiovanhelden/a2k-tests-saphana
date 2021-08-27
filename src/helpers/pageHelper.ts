import { BrowserContext, Page } from 'playwright';
import {config} from "../../config";

/** Class representing the SAP Hana Integration Helper. */
export class PageHelper {
    constructor() {}

    async clickOnSelector(page: Page, selector: string ) {
        await page.waitForSelector(selector);
        await page.click(selector);
    }

    async setSelectText(page: Page, selector: string,  text: string) {
        await page.waitForSelector(selector);
        await page.type(selector, text);
    }

    async setInputText(page: Page, selector: string,  text: string) {
        await page.waitForSelector(selector);
        await page.type(selector, text);
    }

    async setTextArea(page: Page, text: string ) {
        await page.waitForSelector("div >> div >> textarea");
        await page.type("div >> div >> textarea", text);
    }

    async clickOnPageActionButton(page: Page){
        await page.waitForSelector("footer button");
        await page.click("footer button");
    }

    async setStartDate(page: Page, dateText:string,) {
        await page.waitForSelector(`input[placeholder="Date"]`);
        await page.type(`input[placeholder="Date"]`, dateText);

    }

}

