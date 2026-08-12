import { leapwork } from "./leapwork";

import { Lauch, launchAndLoginD365, logoutFromD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { createSalesOrder, createNewCustomer, addNewCustomerAddress, addNewCustomerContactInformation, additionalFields } from "@assets/Utilities/Module/Customer";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";
import { generateRandomString } from "@assets/Utilities/Common/Generate";

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
    await navigateToModule(page,"Accounts receivable","Customers","All customers");
}, { action: "custom" });

// ai-studio-step-id: pw1qn1ym00
await leapwork.step("Create new customer account", async () => {
    await page.waitForTimeout(5000);
    const customerName = await generateRandomString("Customer");
    await createNewCustomer(page, "Organization", customerName, "10", "00605", "Street123");
}, { action: "custom" });

// ai-studio-step-id: pw10q9x930
await leapwork.step("Add New Customer Address", async () => {
    
   await addNewCustomerAddress(page,"PrimaryAddress","00605","Street123");
    
}, { action: "custom" });

// ai-studio-step-id: pw178yb8i0
await leapwork.step("Add New Contact Information", async () => {
   
    await addNewCustomerContactInformation(page);
 
}, { action: "custom" });

// ai-studio-step-id: pw1yu6vf90
await leapwork.step("Additional customer details", async () => {
    await additionalFields(page,"1","11");
}, { action: "custom" });
// ai-studio-step-id: pw1f9nbrq0
await leapwork.step("Logout from D365", async () => {
    await logoutFromD365();
}, { action: "custom" });

