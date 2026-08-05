import { expect, type Page } from "@playwright/test";
import { leapwork } from "./leapwork";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";

leapwork.configuration({
    timeoutMs: Number(
        leapwork.team.settings.get("timeoutMs")
        ?? leapwork.workspace.settings.get("timeoutMs")
    ) || 5000,
    enableSelfHeal:
        (leapwork.team.settings.get("enableSelfHeal")
            ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});


export async function createSalesOrder(page: Page) {
    const customerAccount = leapwork.variables.get(
        "customerAccount",
        leapwork.storage.LOCAL,
    );
    let salesOrderNumber = "";
    await appToolBarButton(page,"New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "SalesTable_CustAccount",value: String(customerAccount),});
    const salesOrderNumberField = page.locator('[data-dyn-controlname=SalesTable_SalesId]').locator("input");
    await leapwork.ScrollToFind(salesOrderNumberField, 0, 500, 5000);
    await expect(salesOrderNumberField).toBeVisible();
    salesOrderNumber = await salesOrderNumberField.inputValue();
    leapwork.variables.set("salesOrderNumber", salesOrderNumber);
    await page.getByRole("button", {name: "OK",exact: true,}).click();
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await expect(page.locator('[data-dyn-controlname=HeaderTitle]')).toContainText(salesOrderNumber);
    await page.waitForTimeout(5000);
    const removeButton = page.getByRole("button", {name: "Remove",}).last();
    await expect(removeButton).toBeVisible();
    await removeButton.click();
}
export async function addSalesOrderLine(page: Page, itemNumber: string, quantity: string, site: string, warehouse: string, unitPrice: string) {

        const addLineButton = page.getByRole("button", {name: /Add line/i,}).first();
        await expect(addLineButton).toBeVisible();
        await addLineButton.click();
  
        const itemNumberField = page.locator('[data-dyn-controlname="SalesLine_ItemId"] input',).last();
        await expect(itemNumberField).toBeVisible();
        await itemNumberField.fill(itemNumber);
        await itemNumberField.press("Tab");

        const quantityField = page.locator('[data-dyn-controlname="SalesLine_SalesQty"] input',).last();
        await expect(quantityField).toBeVisible();
        await quantityField.fill(quantity);
        await quantityField.press("Tab");
        
        const siteField = page.locator('[data-dyn-controlname="InventoryDimensionsGrid_InventSiteId"] input',).last();
        await expect(siteField).toBeVisible();
        await siteField.fill(site);
        await siteField.press("Tab");
        
        const warehouseField = page.locator('[data-dyn-controlname="InventoryDimensionsGrid_InventLocationId"] input',).last();
        await expect(warehouseField).toBeVisible();
        await warehouseField.fill(warehouse);
        await warehouseField.press("Tab");
        
        const unitPriceField = page.locator('[data-dyn-controlname="SalesLine_SalesPrice"] input',).last();
        await expect(unitPriceField).toBeVisible();
        await unitPriceField.fill(unitPrice);
        await unitPriceField.press("Tab");
        appToolBarButton(page,"Save");
}
export async function confirmSalesOrder(page: Page) {
      
        await appToolBarTab(page,"Sell");
        await OptionsUnderAppToolBarTab(page,"Generate","Confirm sales order");
       await waitUntilPleaseWaitgPopupDisappears(page,45000);
        const okButton = page.getByRole("button", {
            name: "OK",
            exact: true,
        }).last();

        await expect(okButton).toHaveCount(1);
        await expect(okButton).toBeVisible();
        await okButton.click();
        
         await expect(okButton).toHaveCount(1);
        await expect(okButton).toBeVisible();
        await okButton.click();
        await waitUntilProcessingOperationPopupDisappears(page,45000);
        await validateMessage(page,"Operation completed");
        
}
        validateMessage(page,"Operation completed");*/