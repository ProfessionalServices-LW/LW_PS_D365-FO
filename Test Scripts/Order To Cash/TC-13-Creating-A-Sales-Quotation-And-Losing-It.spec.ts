import { leapwork } from "./leapwork";

import { Lauch, launchAndLoginD365, logoutFromD365 } from "@assets/Utilities/Action/LauchAndLoginIntoD365";
import { navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { createNewProspect, createNewQuotation, addSalesQuotationLine, sendSalesQuotation, convertToCustomer, confirmSalesQuotation, lostSalesQuotation } from "@assets/Utilities/Module/SalesQuotation";
import { appToolBarButton, appToolBarTab, OptionsUnderAppToolBarTab } from "@assets/Utilities/Action/AppToolBar";
import { waitUntilPleaseWaitgPopupDisappears, waitUntilProcessingOperationPopupDisappears } from "@assets/Utilities/Action/ProcessingWaits";
import { validateMessage } from "@assets/Utilities/Action/Messages";
import { clickButtonLabel } from "@assets/Utilities/Action/Buttons";
import { getTableCellText } from "@assets/Utilities/Action/TableUtilities";
import { generateRandomString } from "@assets/Utilities/Common/Generate";
import { expandSection } from "@assets/Utilities/Action/ExpandOrCollapse";

leapwork.configuration({
    enableSelfHeal: false,
    timeoutMs: 15000,
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Lauch And Login Into D365", async () => {
    await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw1j18w370
await leapwork.step("Navigate to Module All prospects", async () => {
    await navigateToModule(page,"Sales and marketing","Relationships","Prospects","All prospects");
    waitUntilPleaseWaitgPopupDisappears(page,20000);
}, { action: "custom" });

// ai-studio-step-id: pw104ujwk0
await leapwork.step("Create New Prospect", async () => {
    
          await createNewProspect(page,"Organization",await generateRandomString("Prospect"));

}, { action: "custom" });

// ai-studio-step-id: pw1aunqz10
await leapwork.step("Navigate to Module All quotations", async () => {
    await navigateToModule(page,"Sales and marketing","Sales quotations","All quotations");
    waitUntilPleaseWaitgPopupDisappears(page,20000);
}, { action: "custom" });

// ai-studio-step-id: pw1izm1w00
await leapwork.step("Create New quotation", async () => {
    const prospect=leapwork.variables.get("prospect",leapwork.storage.PERMANENT) as string;
          await createNewQuotation(page,"Prospect",prospect);

}, { action: "custom" });

// ai-studio-step-id: pwataqy500
await leapwork.step("Add Sales quotation Line", async () => {
    
   await addSalesQuotationLine(page,"000002","2","1","11","50");
   await appToolBarButton("Save");
    
}, { action: "custom" });

// ai-studio-step-id: pwthvgdh00
await leapwork.step("Send Sales Quotation", async () => {
   
    await sendSalesQuotation(page);
 
}, { action: "custom" });

// ai-studio-step-id: pw4qlgd500
await leapwork.step("Lost Sales Quotation", async () => {
    await lostSalesQuotation(page,"Competitor");
}, { action: "custom" });
// ai-studio-step-id: pw1x1hmkw0
await leapwork.step("Logout from D365", async () => {
    await logoutFromD365();
}, { action: "custom" });
