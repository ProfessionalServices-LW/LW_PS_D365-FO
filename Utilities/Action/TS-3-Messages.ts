import { Page, expect } from "@playwright/test";

export async function validateMessage(
    page: Page,
    message: string,
): Promise<any> {
    const actualMessageElement = page.locator('[class=messageBar-message]').first();
    const actualMessage=actualMessageElement.textContent();
    expect(actualMessageElement).toContainText(message);
     leapwork.variables.set("Message",actualMessage);
    const messageCloseButton=page.locator('[data-dyn-controlname=MessageBarClose]');
  
     for (let i = 0; i < await messageCloseButton.count(); i++) {
        const closeButton = messageCloseButton.nth(i);

        if (await closeButton.isVisible()) {
            await closeButton.click();
        }
    }
}