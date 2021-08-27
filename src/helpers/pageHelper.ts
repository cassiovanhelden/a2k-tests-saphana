import { BrowserContext, Page } from 'playwright';
import {config} from "../../config";

/** Class representing the SAP Hana Integration Helper. */
export class PageHelper {
    constructor() {}

    async clickOnSelector(page: Page, selector: string ) {
        await page.waitForSelector(selector);
        await page.click(selector);
    }

    async fillLookup(page: Page, text: string,  lookupSelector: string) {
        await page.waitForSelector(lookupSelector);
        await page.type(lookupSelector, text);
        const environmentUrl = config.microappsAdminUrl.replace('/admin', '');
        await page.waitForResponse(
            (response: { url: () => string; status: () => number }) =>
                response.url().includes(`${environmentUrl}/app/api/app`) && response.status() === 200
        );
        await page.press(lookupSelector, 'Enter');
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
        await page.waitForSelector(`xpath=//label[contains(text(),'Date')]/..//input[@placeholder="Date"]`);
        await page.type(`xpath=//label[contains(text(),'Date')]/..//input[@placeholder="Date"]`, dateText);

    }

}

