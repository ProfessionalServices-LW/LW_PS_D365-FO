import { expect, type Page } from "@playwright/test";
import { leapwork } from "./leapwork";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
//import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
//import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";


leapwork.configuration({
    timeoutMs: Number(
        leapwork.team.settings.get("timeoutMs")
        ?? leapwork.workspace.settings.get("timeoutMs")
    ) || 5000,
    enableSelfHeal:
        (leapwork.team.settings.get("enableSelfHeal")
            ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

export async function createNewReleasedProduct(page: Page,productType: string,productSubType: string,productName: string,
    itemModelGroup: string,itemGroup: string,storageDimensionGroup: string,trackingDimensionGroup: string,
    inventoryUnit: string,purchaseUnit: string,salesUnit: string,purchasePrice: string,
    salesPrice: string,inventoryPrice: string ) {
    
    let productNumber = "";
    await appToolBarButton("New");
    await  waitUntilPleaseWaitgPopupDisappears(page,45000);
    productNumber=await page.getByRole('textbox', { name: 'Product number' }).inputValue();
    leapwork.variables.set("productNumber",productNumber,leapwork.storage.LOCAL,);
    // await leapwork.d365.fno.modulesNavigation();
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
     
     
     