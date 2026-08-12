import { expect, Page } from "@playwright/test";
import { leapwork } from "./leapwork";

export async function appToolBarButton(
       buttonLabel: string,
): Promise<void> {
      const button = page.getByRole("button", {
            name: new RegExp(buttonLabel,"i"),
            exact: true,
        }).first();

        await expect(button).toHaveCount(1);
        await button.click();
}

export async function appToolBarTab(
    visibleText: string,
): Promise<void> {
        const tab = page.getByRole("button", {
            name: `${visibleText}`,
            exact: true,
        }).first();

        await expect(tab).toHaveCount(1);
        await tab.click();
}

export async function OptionsUnderAppToolBarTab(
    groupText: string,
    optionText: string,
): Promise<void> {
            const option = page.getByRole("group", {
                name: groupText,
                exact: true,
            }).getByRole("button", {
                name: optionText,
                exact: true,
            });

            await expect(option).toHaveCount(1);
            await option.click();
}
