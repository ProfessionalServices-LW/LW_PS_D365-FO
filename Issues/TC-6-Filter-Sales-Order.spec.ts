import { leapwork } from "./leapwork";

import { Lauch, launchAndLoginD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { addSalesOrderLine, createSalesOrder, confirmSalesOrder } from "@assets/Utilities/Module/SalesOrderFunctions";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";

//import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
leapwork.configuration({
    enableSelfHeal: false,
    timeoutMs: 45000,
});
let salesOrderNumber1: string;
// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw1j18w370
await leapwork.step("Navigate to Module", async () => {
    await navigateToModule(page,"Accounts receivable","Orders","All sales orders");
   // leapwork.variables.set("salesOrderNumber","008313",leapwork.storage.PERMANENT);
   salesOrderNumber1=leapwork.variables.get("salesOrderNumber",leapwork.storage.PERMANENT) as string;
}, { action: "custom" });

// ai-studio-step-id: pw1f3tk3e0
await leapwork.step("Filter Sales Order \`${salesOrderNumber1}\` ", async () => { 
     console.log(salesOrderNumber1);
     await leapwork.d365.fno.grid.quickFilter(page, {
        columnName: "Sales order",
        value: salesOrderNumber1,
    });


}, { action: "custom" });



