import { BrowserContext, Page } from 'playwright';
import {config} from "../../config";

/** Class representing the SAP Hana Integration Helper. */
export class PageHelper {
    constructor() {}

    async getActionsLink(page: Page) {
        await page.waitForSelector('div[class="citrixLogo_1lq7hpv"]');
        await page.waitForSelector('span[class="linkText_fjvumo"]');
        return page.$$('a[href="#/actions/all"]');
    }

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

    async selectOption(page: Page, value: string, selector: string ) {
        await page.waitForSelector(selector);
        await page.selectOption(selector, value);
    }

    async setPreFilledDateElement(page: Page, dateText:string,) {
        await page.waitForSelector(`xpath=//label[contains(text(),'Start')]/..//input[@placeholder="Date"]`);
        await page.type(`xpath=//label[contains(text(),'Start')]/..//input[@placeholder="Date"]`, dateText);

        await page.waitForSelector(`xpath=//label[contains(text(),'End')]/..//input[@placeholder="Date"]`);
        await page.type(`xpath=//label[contains(text(),'End')]/..//input[@placeholder="Date"]`, dateText);
    }

    async setSelectText(page: Page, selector: string,  text: string) {
        await page.waitForTimeout(5000);
        await page.waitForSelector(selector);
        await page.type(selector, text);
    }

    async setInputText(page: Page, selector: string,  text: string) {
        await page.waitForSelector(selector);
        await page.type(selector, text);
    }

    async setDateTime(page: Page, selector: string,  datetime: string) {
        await page.waitForSelector(selector);
        await page.type(selector, datetime);
    }


    async setTextArea(page: Page, text: string ) {
        await page.waitForSelector("div >> div >> textarea");
        await page.type("div >> div >> textarea", text);
    }

    async clickOnPageActionButton(page: Page){
        await page.waitForSelector("footer button");
        await page.click("footer button");
    }

    async clickOnButton(page: Page, text: string){
        await page.waitForTimeout(6000);
        await page.screenshot({path:'aaaaaaaaaaa.png'});
        await page.waitForSelector(`data-testid='${text}'`);
        await page.click(`data-testid='${text}'`);
    }

    async setStartDate(page: Page, dateText:string,) {
        await page.waitForSelector(`input[placeholder="Date"]`);
        await page.type(`input[placeholder="Date"]`, dateText);

    }

}

