import { expect, type Page } from "@playwright/test";
import { leapwork } from "./leapwork";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
//import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
//import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";

leapwork.variables.set("itemNumberFilter", "001919", leapwork.storage.LOCAL);
const lw__itemNumberFilter = leapwork.variables.get("itemNumberFilter", leapwork.storage.LOCAL) as string;

leapwork.variables.set("itemModelGroup", "FIFO", leapwork.storage.LOCAL);
const lw__itemModelGroup = leapwork.variables.get("itemModelGroup", leapwork.storage.LOCAL) as string;

leapwork.variables.set("itemGroup", "Audio", leapwork.storage.LOCAL);
const lw__itemGroup = leapwork.variables.get("itemGroup", leapwork.storage.LOCAL) as string;

leapwork.variables.set("storageDimensionGroup", "SiteWH", leapwork.storage.LOCAL);
const lw__storageDimensionGroup = leapwork.variables.get("storageDimensionGroup", leapwork.storage.LOCAL) as string;

leapwork.variables.set("trackingDimensionGroup", "None", leapwork.storage.LOCAL);
const lw__trackingDimensionGroup = leapwork.variables.get("trackingDimensionGroup", leapwork.storage.LOCAL) as string;

leapwork.variables.set("purchasePrice", "50", leapwork.storage.LOCAL);
const lw__purchasePrice = leapwork.variables.get("purchasePrice", leapwork.storage.LOCAL) as string;

leapwork.variables.set("salesPrice", "60", leapwork.storage.LOCAL);
const lw__salesPrice = leapwork.variables.get("salesPrice", leapwork.storage.LOCAL) as string;

leapwork.variables.set("inventoryPrice", "55", leapwork.storage.LOCAL);
const lw__inventoryPrice = leapwork.variables.get("inventoryPrice", leapwork.storage.LOCAL) as string;

leapwork.configuration({
    timeoutMs: Number(
        leapwork.team.settings.get("timeoutMs")
        ?? leapwork.workspace.settings.get("timeoutMs")
    ) || 5000,
    enableSelfHeal:
        (leapwork.team.settings.get("enableSelfHeal")
            ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

export async function createAnItemFromReleasedProducts(page: Page,productNumber: string,productType: string,productSubType: string,productName: string,
    itemModelGroup: string,itemGroup: string,storageDimensionGroup: string,trackingDimensionGroup: string,
    inventoryUnit: string,purchaseUnit: string,salesUnit: string,purchasePrice: string,
    salesPrice: string,inventoryPrice: string ) {
    
    // let productNumber = "";
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    productNumber=await page.getByRole('textbox', { name: 'Product number' }).inputValue();
    leapwork.variables.set("productNumber",productNumber,leapwork.storage.LOCAL,);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "Types_ProductType",value: productType,});
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "Types_ProductSubtype",value: productSubType,});
    await page.locator('[data-dyn-controlname=Identification_Name]').locator('input').fill(productName);
    await leapwork.d365.fno.SelectDropdown(page, {controlName: "ModelGroupId",value: itemModelGroup,});
    await leapwork.d365.fno.SelectLookupOption(page, {controlName: "ItemGroupId",
      controlSelector: "[data-dyn-controlname=\"ItemGroupId\"]",
      triggerSelector: "#EcoResProductCreate_3_ItemGroupId > .lookupDock-buttonContainer > .lookupButton",
      optionSelector: undefined,
      value: String(itemGroup),
    });
    await leapwork.d365.fno.SelectLookupOption(page, {
      controlName: "StorageDimensionGroup",
      controlSelector: "[data-dyn-controlname=\"StorageDimensionGroup\"]",
      triggerSelector: ".lookupDock.lookupDock-dockContainer.displayoption.hasdiscretesize-width.discretesize-width-small > div:nth-child(2) > .lookupButton >> nth=0",
      optionSelector: undefined,
      value: String(storageDimensionGroup),
    });

    await leapwork.d365.fno.SelectLookupOption(page, {
      controlName: "TrackingDimensionGroup",
      controlSelector: "[data-dyn-controlname=\"TrackingDimensionGroup\"]",
      triggerSelector: ".lookupDock.lookupDock-dockContainer.displayoption.hasdiscretesize-width.discretesize-width-small.fixed-width.layout-container.layout-horizontal.layout-horizontal-bottomalign.hasFocusedChild > div:nth-child(2) > .lookupButton",
      optionSelector: undefined,
      value: String(trackingDimensionGroup),
    });
     await leapwork.d365.fno.SelectDropdown(page, {controlName: "InventUnitId",value: inventoryUnit,});
     await leapwork.d365.fno.SelectDropdown(page, {controlName: "PurchUnitId",value: purchaseUnit,});
     await leapwork.d365.fno.SelectDropdown(page, {controlName: "SalesUnitId",value: salesUnit,});
     await page.getByRole('textbox', { name: 'Purchase price' }).fill(purchasePrice);
     await page.getByRole('textbox', { name: 'Sales price' }).fill(salesPrice);
     await page.getByRole('textbox', { name: 'Inventory price' }).fill(inventoryPrice);
     await clickButtonLabel(page,"OK");
     await waitUntilPleaseWaitgPopupDisappears(page,45000);
     await expect(page.locator('[data-dyn-controlname=HeaderTitle]')).toContainText(productNumber);
     
}