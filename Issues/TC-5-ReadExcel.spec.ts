import { leapwork } from "./leapwork";
import * as fs from "fs";

import { Lauch, launchAndLoginD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { addSalesOrderLine, createSalesOrder,confirmSalesOrder } from "@assets/Utilities/Module/SalesOrder2";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
 declare const require: (name: string) => any;
leapwork.configuration({
    enableSelfHeal: false,
    timeoutMs: 45000,
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });



// ai-studio-step-id: pwbpahfp00
await leapwork.step("Sales Order", async () => {
    const filePath='C:\\Users\\JagannathReddyMedam\\Documents\\SalesOrder12.csv';
    const fs = require("fs");
    leapwork.variables.set("Status",fs.existsSync(filePath));
    console.log(fs.existsSync(filePath));
    const rows = fs.readFileSync(filePath, "utf8").split(/\r?\n/).map((row: string) => row.split(","));

for (let i = 1; i < rows.length; i++) {
    const customerAccount=rows[i][0];
    const site=rows[i][1];
    const warehouse=rows[i][2];
    const itemNumber=rows[i][3];
    const quantity=rows[i][4];
    const unitPrice=rows[i][5];

    await navigateToModule(page,"Accounts receivable","Orders","All sales orders");
   leapwork.variables.set("customerAccount",customerAccount,leapwork.storage.LOCAL);
    await page.waitForTimeout(5000);
    await appToolBarButton(page,"New");
    await createSalesOrder(page);
   await addSalesOrderLine(page,itemNumber,quantity,site,warehouse,unitPrice);
   await appToolBarButton(page,"Save");
    await appToolBarTab(page,"Sell");
        await OptionsUnderAppToolBarTab(page,"Generate","Confirm sales order");
       await waitUntilPleaseWaitgPopupDisappears(page,45000);
    await confirmSalesOrder(page);
    await waitUntilProcessingOperationPopupDisappears(page,45000);
    await validateMessage(page,"Operation completed");
    rows[i][6]=leapwork.variables.get("salesOrderNumber");
    rows[i][7]="Passed";
fs.writeFileSync(filePath, rows.map((row: any[]) => row.join(",")).join("\n"));
}  
    
}, { action: "custom" });

