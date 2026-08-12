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

export async function createNewCustomer(page: Page,customerType: string,name: string,customerGroup: string,zipCode: string,streetAddress: string) {
    
    let customerNumber = "";
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    customerNumber=await page.getByRole('textbox', { name: 'Customer account' }).inputValue();
    leapwork.variables.set("customerAccount",customerNumber,leapwork.storage.LOCAL,);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "partyTypeComboBox",value: customerType,});
    await page.locator('[data-dyn-controlname=Org_Name]').locator('input').fill(name);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "DynamicDetail_CustGroup",value: customerGroup,});
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "LogisticsPostalAddress_ZipCode",value: zipCode,});
     await page.getByRole('textbox', { name: 'Street' }).fill(streetAddress);
     await clickButtonLabel(page,"Save");
     await waitUntilPleaseWaitgPopupDisappears(page,45000);
     await expect(page.locator('[data-dyn-controlname=HeaderTitle]')).toContainText(customerNumber);
}
export async function addNewCustomerAddress(page: Page, nameOrDescription: string, zipCode: string, street: string,) {

    const addressesTab = page.locator("[data-dyn-controlname=\"TabAddress\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    await expect(addressesTab).toHaveCount(1);
    const shouldBeExpanded = true;
    const isExpanded = (await addressesTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded !== shouldBeExpanded) {
      await addressesTab.click({ force: true });
    }
    await page.locator('[data-dyn-controlname=NewAddress]').click();
    await waitUntilPleaseWaitgPopupDisappears(page,45000);
    await page.getByRole('dialog', { name: 'New address' }).getByLabel('Name or description').fill(nameOrDescription);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "LogisticsPostalAddress_ZipCode",value: zipCode,});
    await page.getByRole('textbox', { name: 'Street' }).fill(street);
    await page.waitForTimeout(5000);
    const primary=await page.locator('[data-dyn-controlname=IsPrimary]');
    await leapwork.ScrollToFind(primary);
    //if(primary.locator('span').nth(1).textContent()=="No")
    //await page.waitForTimeout(5000);
    //{
      primary.locator('span').first().check();
     // }
    /*if(primary.inputValue=="No")
    {
      primary.click();
    }*/
    //await leapwork.ScrollToFind(primary);
    //await page.locator('[data-dyn-controlname=IsPrimary]').click();
    //await page.getByRole('switch', { name: 'Primary', exact: true }).click();
    await clickButtonLabel(page,"Yes");
    await clickButtonLabel(page,"Ok");
    await waitUntilPleaseWaitgPopupDisappears(page,45000);
}
export async function addNewCustomerContactInformation(page: Page) {
      
    const contactInformationTab = page.locator("[data-dyn-controlname=\"TabCommunication\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    await expect(contactInformationTab).toHaveCount(1);
    const shouldBeExpanded = true;
    const isExpanded = (await contactInformationTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded !== shouldBeExpanded) {
      await contactInformationTab.click({ force: true });
    }
     await page.locator('[data-dyn-controlname=NewContactInfo]').click();
     await page.locator('[data-dyn-controlname=ContactInfo_Description]').nth(1).locator('input').fill("Primary Contact");
     await page.keyboard.press("Tab");
     await page.locator('[data-dyn-controlname=ContactInfo_Type]').nth(1).locator('input').fill("Phone");
     await page.keyboard.press("Tab");
     await page.locator('[data-dyn-controlname=ContactInfo_IsPrimary]').locator('rect').first().click();
      await clickButtonLabel(page,"Yes");
        
}
export async function additionalFields(page: Page,site: string,warehouse: string) {
    
    const creditAndCollectionsTab = page.locator("[data-dyn-controlname=\"TabCreditManagement\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    await expect(creditAndCollectionsTab).toHaveCount(1);
    const shouldBeExpanded = true;
    const isExpanded = (await creditAndCollectionsTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded !== shouldBeExpanded) {
      await creditAndCollectionsTab.click({ force: true });
    }
    await page.getByRole('switch', { name: 'Unlimited credit limit' }).check();
    await page.getByRole('switch', { name: 'Exclude from credit management' }).check();
    await page.getByRole('textbox', { name: 'Credit limit', exact: true }).fill("999999");
    
   const salesOrderDefaultsTab = page.locator("[data-dyn-controlname=\"TabPageSales\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    await expect(salesOrderDefaultsTab).toHaveCount(1);
    const shouldBeExpanded1 = true;
    const isExpanded1 = (await salesOrderDefaultsTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded1 !== shouldBeExpanded1) {
      await salesOrderDefaultsTab.click({ force: true });
    }
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "SalesOrder_InventSiteId",value: site,});
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "InventLocation",value: warehouse,});
    await appToolBarButton("Save"); 
}