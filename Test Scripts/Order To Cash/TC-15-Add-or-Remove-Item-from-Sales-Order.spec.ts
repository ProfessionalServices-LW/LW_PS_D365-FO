import { leapwork } from "./leapwork";

import { launchAndLoginD365, logoutFromD365 } from "@assets/Utilities/Action/LaunchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { addSalesOrderLine, createSalesOrder, confirmSalesOrder, pickingASalesOrder, postingASalesOrder, invoiceSalesOrder } from "@assets/Utilities/Module/SalesOrderFunctions";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
import { getTableCellText, clickTableMenuOption } from "@assets/Utilities/Action/TableUtilities";
import { createNewReleasedProduct } from "@assets/Utilities/Module/ProductInfoManagement";
import { generateRandomString } from "@assets/Utilities/Common/Generate";
import { expandSection, collapseSection } from "@assets/Utilities/Action/ExpandOrCollapse";
import { createNewCustomer, addNewCustomerAddress, addNewCustomerContactInformation, additionalFields } from "@assets/Utilities/Module/Customer";


//import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
leapwork.configuration({
    enableSelfHeal: false,
    timeoutMs: 15000,
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw49jkkz00
await leapwork.step("Navigate to Module All customers", async () => {
    await navigateToModule(page,"Accounts receivable","Customers","All customers");
}, { action: "custom" });

// ai-studio-step-id: pw1ul2ec00
await leapwork.step("Create new customer account", async () => {
    await page.waitForTimeout(5000);
    const customerName = await generateRandomString("Customer");
    await createNewCustomer(page, "Organization", customerName, "10", "00605", "Street123");
}, { action: "custom" });
// ai-studio-step-id: pwkp9yf100
await leapwork.step("Navigate to Module Released Products", async () => {
    await navigateToModule(page,"Product information management","Products","Released products");
}, { action: "custom" });
// ai-studio-step-id: pwylpap600
await leapwork.step("Create new Release product", async () => {
    await page.waitForTimeout(5000);
    const productName = await generateRandomString("Customer");
    await createNewReleasedProduct(page, "Item","Product", productName,"FIFO","PCS","SuteWH","None","ea","ea","ea","100.00","120.00","110.00");
}, { action: "custom" });

// ai-studio-step-id: pw1j18w370
await leapwork.step("Validate to Release Product", async () => {
    await appToolBarTab("Product");
    await OptionsUnderAppToolBarTab("Maintain","Validate");
    await waitUntilPleaseWaitgPopupDisappears(page,45000);
    await validateMessage(page,"All field values required for validation are specified for product ");
}, { action: "custom" });

// ai-studio-step-id: pwyayzke00
await leapwork.step("Navigate to Module All Sales Orders", async () => {
    await navigateToModule(page,"Accounts receivable","Orders","All sales orders");
}, { action: "custom" });

// ai-studio-step-id: pw1qn1ym00
await leapwork.step("Create Sales Order", async () => {
     await page.waitForTimeout(5000);
          await createSalesOrder(page);


}, { action: "custom" });

// ai-studio-step-id: pweoxlcd00
await leapwork.step("Add Sales Order Line", async () => {
   const itemNumber= leapwork.variables.get("productNumber",leapwork.storage.LOCAL) as string;
   await addSalesOrderLine(page,itemNumber,"2","1","11","120");
    
}, { action: "custom" });

// ai-studio-step-id: pw178yb8i0
await leapwork.step("Confirm Sales Order", async () => {
   
    await confirmSalesOrder(page);
 
}, { action: "custom" });

// ai-studio-step-id: pwl84vcr00
await leapwork.step("Logout from D365", async () => {
    await logoutFromD365();
}, { action: "custom" });
