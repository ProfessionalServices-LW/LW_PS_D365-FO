import { expect, type Page } from "@playwright/test";
import { leapwork } from "./leapwork";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { expandSection } from "@assets/Utilities/Action/ExpandOrCollapse";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";


leapwork.configuration({
    timeoutMs: Number(
        leapwork.team.settings.get("timeoutMs")
        ?? leapwork.workspace.settings.get("timeoutMs")
    ) || 5000,
    enableSelfHeal:
        (leapwork.team.settings.get("enableSelfHeal")
            ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});


export async function createNewProspect(page: Page, prospectType: string, name: string) {
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "partyTypeComboBox",value: String(prospectType),});
    const prospect = await page.locator('[data-dyn-controlname=DynamicHeader_BusRelAccount]').locator("input").inputValue();;
    leapwork.variables.set("prospect", prospect,leapwork.storage.PERMANENT);
    leapwork.variables.set("prospectName", name,leapwork.storage.PERMANENT);
    await page.locator('[data-dyn-controlname="Org_Name"] input',).fill(name);
    await clickButtonLabel(page,"Save");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await expect(page.locator('[data-dyn-controlname=HeaderTitle]')).toContainText(prospect);
}
export async function createNewQuotation(page: Page, accountType: string, prospect: string) {
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "AccountType",value: String(accountType),});
    await page.locator('[data-dyn-controlname="SalesQuotationTable_BusRelAccount"] input',).fill(prospect);
    await expandSection("General");
    const quotation = await page.locator('[data-dyn-controlname=SalesQuotationTable_QuotationId]').locator("input").inputValue();;
    leapwork.variables.set("quotation", quotation ,leapwork.storage.PERMANENT);
    
    await clickButtonLabel(page,"OK");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    await expect(page.locator('[data-dyn-controlname=HeaderTitle]')).toContainText(quotation);
    await clickButtonLabel(page,"Remove");
}
export async function addSalesQuotationLine(page: Page, itemNumber: string, quantity: string, site: string, warehouse: string, unitPrice: string) {

        const addLineButton = page.getByRole("button", {name: /Add line/i,}).first();
        await expect(addLineButton).toBeVisible();
        await addLineButton.click();
  
        const itemNumberField = page.locator('[data-dyn-controlname="SalesQuotationLine_ItemId"] input',).last();
        await expect(itemNumberField).toBeVisible();
        await itemNumberField.fill(itemNumber);
        await itemNumberField.press("Tab");

        const quantityField = page.locator('[data-dyn-controlname="SalesQuotationLine_SalesQty"] input',).last();
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
        
        const unitPriceField = page.locator('[data-dyn-controlname="SalesQuotationLine_SalesPrice"] input',).last();
        await expect(unitPriceField).toBeVisible();
        await unitPriceField.fill(unitPrice);
        await unitPriceField.press("Tab");
        appToolBarButton("Save");
}
export async function sendSalesQuotation(page: Page) {
      
        await appToolBarTab("Quotation");
        await OptionsUnderAppToolBarTab("Generate","Send quotation");
       await waitUntilPleaseWaitgPopupDisappears(page,45000);
       await page.getByRole('switch', { name: 'Print quotation' }).uncheck();
        await clickButtonLabel(page,"OK");
        await waitUntilProcessingOperationPopupDisappears(page,45000);
        await validateMessage(page,"O1 quotation(s) updated to status Sent");
         await expect(page.getByRole('combobox', { name: 'Quotation status', exact: true })).toHaveValue("Sent");
        
}
export async function convertToCustomer(page: Page) {
    
   await appToolBarTab("Follow up");
   await OptionsUnderAppToolBarTab("Modify","Convert to customer");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await clickButtonLabel(page,"Yes");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    const name= leapwork.variables.get("prospectName", leapwork.storage.PERMANENT);
    await expect(page.locator('[data-dyn-controlname=HeaderTitle]').last()).toContainText(name);
    await appToolBarButton("Back");
}
export async function confirmSalesQuotation(page: Page) {
    
   await appToolBarTab("Follow up");
   await OptionsUnderAppToolBarTab("Generate","Confirm");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await page.getByRole('switch', { name: 'Print confirmation' }).uncheck();
    await clickButtonLabel(page,"OK");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
     await validateMessage(page,"O1 quotation(s) updated to status Confirmed");
         await expect(page.getByRole('combobox', { name: 'Quotation status', exact: true })).toHaveValue("Confirmed");
}

export async function lostSalesQuotation(page: Page, reason: string) {
    
   await appToolBarTab("Follow up");
   await OptionsUnderAppToolBarTab("Generate","Lost quotation");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
    await leapwork.d365.fno.SelectDropdown(page, {
      controlName: "Fld4_1",
      value: String(reason),
    });
    await clickButtonLabel(page,"OK");
    await waitUntilPleaseWaitgPopupDisappears(page,15000);
     await validateMessage(page,"O1 quotation(s) updated to status Lost");
         await expect(page.getByRole('combobox', { name: 'Quotation status', exact: true })).toHaveValue("Lost");
}