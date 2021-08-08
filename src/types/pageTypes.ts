import { BrowserContext, Page } from 'playwright';

export type SimplePage = {
    page: Page;
}

export type SimpleContext = {
    context: BrowserContext
}

export type PageContext = {
    page: Page;
    context: BrowserContext;
}

export type Microapp = {
    page: Page;
    context: BrowserContext;
    selector: string;
}

export type MicroappSelector = {
    page: Page;
    context: BrowserContext;
    selector: string;
    microappSelector: string;
}

export type LookUp = {
    page: Page;
    context: BrowserContext;
    text: string;
    lookupSelector: string;
}

export type Table = {
    page: Page;
    context: BrowserContext;
    selector: string;
}

export type Select = {
    page: Page;
    context: BrowserContext;
    text: string;
    selector: string;

}

export type DateTime = {
    page: Page;
    context: BrowserContext;
    selector: string;
    datetime: string;
}

export type DateElement = {
    page: Page;
    context: BrowserContext;
    dateText: string;
}

export type Login = {
    page: Page;
    context: BrowserContext;
    synchronizationType: string;
}

export type TextArea = {
    page: Page;
    context: BrowserContext;
    text: string;
}

export type InputSelect = {
    page: Page;
    context: BrowserContext;
    inputText: string;
    selector: string;
}

export type Input = {
    page: Page;
    context: BrowserContext;
    inputText: string;
}

export type PageButton = {
    page: Page,
    context: BrowserContext,
    text: string
}

export type Sync = {
    context: BrowserContext;
    synchronizationType: string;
}

export type CommonProcess = {
    page: Page,
    context: BrowserContext;
    synchronizationType: string;
}

export type ApiLogOut = {
    context: BrowserContext,
    authInstance: any
}

export type AuthInstance = {
    context: BrowserContext,
    bearerToken: any
}