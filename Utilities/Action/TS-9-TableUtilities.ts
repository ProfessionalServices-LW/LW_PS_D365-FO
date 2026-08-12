import type { Locator } from "@playwright/test";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";

export async function getTableCellText(page: Page,
    tableName: string,
    columnName: string,
    rowIndex: number,
): Promise<string> {
    
    const table = page.getByLabel(tableName, {exact: false}).getByRole("grid");       
    const cellLocator = table.locator('[role=row]');
   // const cell = cellLocator.nth(1).locator('[aria-label="Work ID"]');
    const cell = cellLocator.nth(rowIndex).locator(`[aria-label="${columnName}"]`);
    return (await cell.inputValue());
}
export async function clickTableMenuOption(page: Page) {
    
     const button = page.locator('[class*=active-form]').getByRole("button", {
            name: new RegExp(buttonLabel,"i"),
            exact: false,
        });
    await clickButtonLabel(page,"Update line");
    await clickButtonLabel(page,"Pick");


