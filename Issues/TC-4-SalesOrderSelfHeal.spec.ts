import { leapwork } from "./leapwork";

import { Lauch, launchAndLoginD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { addSalesOrderLine, createSalesOrder, confirmSalesOrder } from "@assets/Utilities/Module/SalesOrder2";

 leapwork.configuration({
    enableSelfHeal: true,
    timeoutMs: 45000,
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw1j18w370
await leapwork.step("Navigate to Module", async () => {
    await navigateToModule(page,"Accounts receivable","Orders","All sales orders");
}, { action: "custom" });

// ai-studio-step-id: pwx9gguw00
await leapwork.step("Create Sales Order", async () => {
     leapwork.variables.set("customerAccount","000002",leapwork.storage.LOCAL);
     await page.waitForTimeout(5000);

          await createSalesOrder(page);


}, { action: "custom" });

// ai-studio-step-id: pwataqy500
await leapwork.step("Add Sales Order Line", async () => {
    
   await addSalesOrderLine(page,"000002","2","1","11","50");
    
}, { action: "custom" });

// ai-studio-step-id: pwj42wz600
await leapwork.step("Add Sales Order Line2", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // await addSalesOrderLine(page,"000002","10","1","11","20");
    // [/Leapwork Play self-heal preserved previous code]
    
    const itemNumber = page.getByRole('combobox', { name: 'Item number', exact: true });
    await expect(itemNumber).toHaveCount(1);
    await itemNumber.fill('000002');
}, { action: "custom", relativeXpath: "//*[@id=\"SalesLine_ItemId_198_0_1_input\"]" });

// ai-studio-step-id: pw5yvaul00
await leapwork.step("Confirm Sales Order", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // await confirmSalesOrder(page);
    // [/Leapwork Play self-heal preserved previous code]
    
    const confirmSalesOrderButton = page.getByRole('button', {
      name: 'Confirm sales order',
      exact: true,
    });
    await expect(confirmSalesOrderButton).toHaveCount(1);
    await confirmSalesOrderButton.click({ force: true });
}, { action: "custom", relativeXpath: "//*[@id=\"SalesTable_3_buttonUpdateConfirmation\"]" });


