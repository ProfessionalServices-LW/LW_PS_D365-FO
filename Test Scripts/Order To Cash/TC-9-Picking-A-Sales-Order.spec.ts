import { leapwork } from "./leapwork";

import { Lauch, launchAndLoginD365, logoutFromD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { addSalesOrderLine, createSalesOrder, confirmSalesOrder, pickingASalesOrder, postingASalesOrder, invoiceSalesOrder } from "@assets/Utilities/Module/SalesOrderFunctions";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";

//import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
leapwork.configuration({
    enableSelfHeal: false,
    timeoutMs: 15000,
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw1j18w370
await leapwork.step("Navigate to Module", async () => {
    await navigateToModule(page,"Accounts receivable","Orders","All sales orders");
}, { action: "custom" });

// ai-studio-step-id: pw104ujwk0
await leapwork.step("Create Sales Order", async () => {
     leapwork.variables.set("customerAccount","000002",leapwork.storage.LOCAL);
     await page.waitForTimeout(5000);
          await createSalesOrder(page);


}, { action: "custom" });

// ai-studio-step-id: pwataqy500
await leapwork.step("Add Sales Order Line", async () => {
    
   await addSalesOrderLine(page,"000002","2","1","11","50");
   //await appToolBarButton("Save");
    
}, { action: "custom" });



// ai-studio-step-id: pwthvgdh00
await leapwork.step("Confirm Sales Order", async () => {
   
    await confirmSalesOrder(page);
 
}, { action: "custom" });

// ai-studio-step-id: pw13e33tj0
await leapwork.step("Picking Sales Order", async () => {
    await pickingASalesOrder(page);
}, { action: "custom" });
// ai-studio-step-id: pw1f9nbrq0
await leapwork.step("Logout from D365", async () => {
    await logoutFromD365();
}, { action: "custom" });
