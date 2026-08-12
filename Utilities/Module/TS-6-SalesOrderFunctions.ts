import { expect, type Page } from "@playwright/test";
import { leapwork } from "./leapwork";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";


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
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "SalesTable_CustAccount",value: String(customerAccount),});
    const salesOrderNumberField = page.locator('[data-dyn-controlname=SalesTable_SalesId]').locator("input");
    await leapwork.ScrollToFind(salesOrderNumberField, 0, 500, 5000);
    await expect(salesOrderNumberField).toBeVisible();
    salesOrderNumber = await salesOrderNumberField.inputValue();
    leapwork.variables.set("salesOrderNumber", salesOrderNumber,leapwork.storage.PERMANENT);
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
        
        appToolBarButton("Save");
}
export async function confirmSalesOrder(page: Page) {
      
        await appToolBarTab("Sell");
        await OptionsUnderAppToolBarTab("Generate","Confirm sales order");
       await waitUntilPleaseWaitgPopupDisappears(page,45000);
        await clickButtonLabel(page,"OK");
        await waitUntilPleaseWaitgPopupDisappears(page,45000);
        await clickButtonLabel(page,"OK");
        await waitUntilPleaseWaitgPopupDisappears(page,45000);
        await waitUntilProcessingOperationPopupDisappears(page,45000);
        await validateMessage(page,"Operation completed");
        
}
export async function pickingASalesOrder(page: Page) {
    
    await clickButtonLabel(page,"Update line");
    //await clickButtonLabel(page,"Pick");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await page.getByRole('menuitem', { name: 'Process Pick' }).click();
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"Add picking line");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"Confirm pick all");   
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    const status=await getTableCellText(page,"","Issue status",1);
    expect(status).toBe("Picked");
    await appToolBarButton("Save");
    await appToolBarButton("Back");
}
export async function postingASalesOrder(page: Page) {
    
   await appToolBarTab("Pick and pack");
   await OptionsUnderAppToolBarTab("Generate","Post packing slip");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"OK");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"Yes");   
    await waitUntilProcessingOperationPopupDisappears(page,30000);
    await page.waitForTimeout(3000);
    expect(await page.locator('[class=pdfViewer]')).toContainText("Packing slip");
    await appToolBarButton("Back");
     await expect(page.getByRole('combobox', { name: 'Status', exact: true })).toHaveValue("Delivered");
}

export async function invoiceSalesOrder(page: Page) {
    
   await appToolBarTab("Invoice");
   await OptionsUnderAppToolBarTab("Generate","Invoice");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"OK");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"OK");   
    await waitUntilProcessingOperationPopupDisappears(page,45000);
   // expect(await page.locator('[class=pdfViewer]')).toContainText("");
   await validateMessage(page,"Operation completed");
     await expect(page.getByRole('combobox', { name: 'Status', exact: true })).toHaveValue("Invoiced");
}