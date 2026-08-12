import { expect, Page } from "@playwright/test";
import { leapwork } from "./leapwork";

export async function clickButtonLabel(
    page: Page,
    buttonLabel: string,
): Promise<void> {
      const button = page.locator('[class*=active-form]').getByRole("button", {
            name: buttonLabel,//new RegExp(buttonLabel,"i"),
            exact: false,
        });
        for (let i = 0; i < await button.count(); i++) {
        const closeButton = button.nth(i);

        if (await closeButton.isVisible()) {
            await closeButton.click();
            break;
        }
    }
}