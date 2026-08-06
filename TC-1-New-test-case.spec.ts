import { leapwork } from "./leapwork";

leapwork.variables.set("vendorAccountFilter", "Vendo_659751", leapwork.storage.LOCAL);
const lw__vendorAccountFilter = leapwork.variables.get("vendorAccountFilter", leapwork.storage.LOCAL) as string;

leapwork.variables.set("purchaseAgreementClassification", "Blanket purchase agreement", leapwork.storage.LOCAL);
const lw__purchaseAgreementClassification = leapwork.variables.get("purchaseAgreementClassification", leapwork.storage.LOCAL) as string;

leapwork.variables.set("purchAgreementHeader_DocumentTitle1", "Purch_Agreement", leapwork.storage.LOCAL);
const lw__purchAgreementHeader_DocumentTitle1 = leapwork.variables.get("purchAgreementHeader_DocumentTitle1", leapwork.storage.LOCAL) as string;

leapwork.variables.set("defaultCommitment", "Product quantity commitment", leapwork.storage.LOCAL);
const lw__defaultCommitment = leapwork.variables.get("defaultCommitment", leapwork.storage.LOCAL) as string;

leapwork.variables.set("month", "11", leapwork.storage.LOCAL);
const lw__month = leapwork.variables.get("month", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: pwm3j93g00
await leapwork.step("Fill the email field with lpa@leapwork.com", async () => {
    // Change textbox "Enter your email, phone, or Skype."
    await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill("lpa@leapwork.com");
}, { action: "input", relativeXpath: "//*[@id=\"i0116\"]" });

// ai-studio-step-id: pw1t5yw570
await leapwork.step("Click Next after entering the email address on the Microsoft sign-in page", async () => {
    // Click button "Next"
    await page.getByRole('button', { name: 'Next' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"idSIButton9\"]" });

// ai-studio-step-id: pwgw88qy00
await leapwork.step("Fill the password field for lpa@leapwork.com", async () => {
    // Change textbox "Enter the password for lpa@leapwork.com"
    await page.getByRole('textbox', { name: 'Enter the password for lpa@' }).fill(leapwork.variables.getSecret("pwd_D7MpFP1Y"));
}, { action: "input", relativeXpath: "//*[@id=\"i0118\"]" });

// ai-studio-step-id: pw1gdlvld0
await leapwork.step("Click the Sign in button for the Leapwork account lpa@leapwork.com", async () => {
    // Click button "Sign in"
    await page.getByRole('button', { name: 'Sign in' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"idSIButton9\"]" });

// ai-studio-step-id: pw1rg4gq00
await leapwork.step("Click Yes to continue signing in to Finance and Operations Dynamics 365", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // // Click button "Yes"
    // await page.getByRole('button', { name: 'Yes' }).click();
    // [/Leapwork Play self-heal preserved previous code]
    
    const yesButton = page.getByRole('button', { name: 'Yes', exact: true });
    await expect(yesButton).toHaveCount(1);
    await yesButton.click({ force: true });
}, { action: "click", relativeXpath: "//*[@id=\"idSIButton9\"]" });

// ai-studio-step-id: pweblslt00
await leapwork.step("Validate the Dashboard shows “Work items assigned to me” in the Work items group", async () => {
    // Assert heading "Work items assigned to me" contains "Work items assigned to me"
    await expect(page.getByRole('heading', { name: 'Work items assigned to me' })).toContainText("Work items assigned to me");
}, { action: "validate", relativeXpath: "//*[@data-dyn-controlname=\"WorkItemsList\"]" });

// ai-studio-step-id: pwbh4io600
await leapwork.step("Click the Modules menu in the navigation pane", async () => {
    // Click span
    await page.locator('.workspace-image.GroupedList-symbol').click();
}, { action: "click", relativeXpath: "//*[@id=\"navPaneModuleID\"]/span[2]" });



// ai-studio-step-id: pwex2uvh00
await leapwork.step("Click Procurement and sourcing in the navigation menu", async () => {
    // Click treeitem "Procurement and sourcing"
    await page.getByRole('treeitem', { name: 'Procurement and sourcing' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"mainPane\"]/div[5]/div/div[@aria-label=\"Navigation menu\"]/div[2]/a[27]" });





// ai-studio-step-id: pwxf28wy00
await leapwork.step("Expand Purchase agreements in the Finance and Operations dashboard menu", async () => {
    const purchaseAgreements = page.getByRole('treeitem', { name: 'Purchase agreements' });
    if (await purchaseAgreements.getAttribute('aria-expanded') !== 'true') {
        await purchaseAgreements.click();
    }
}, { action: "click", relativeXpath: "//*[@id='undefined#undefined#[\"mainmenu\",\"ProcurementAndSourcing\",\"PurchaseAgreements\"]']" });











// ai-studio-step-id: pw17cxmxf0
await leapwork.step("Click Purchase agreements in the navigation menu", async () => {
    // Click a
    await page.getByText('Purchase agreements').nth(1).click();
}, { action: "click", relativeXpath: ".//div/div[2]/div/div[2]/div[@aria-label=\"Purchase agreements\"]/a[1]" });

// ai-studio-step-id: pw1g5bnzv0
await leapwork.step("Click the New button in the Purchase agreements toolbar", async () => {
    // Click button " New"
    await page.getByRole('button', { name: ' New' }).click();
}, { action: "click", relativeXpath: "//*[@data-dyn-controlname=\"SystemDefinedNewButton\"]" });

// ai-studio-step-id: pwls12cg00
await leapwork.step("Expand Vendor in the Create purchase agreement form", async () => {
    const vendorTab = page.locator("[data-dyn-controlname=\"VendorTab\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    await expect(vendorTab).toHaveCount(1);
    const shouldBeExpanded = true;
    const isExpanded = (await vendorTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded !== shouldBeExpanded) {
        await vendorTab.click({ force: true });
    }
}, { action: "click", relativeXpath: "//*[@data-dyn-controlname=\"VendorTab\"]" });



// ai-studio-step-id: pw1em2djp0
await leapwork.step("Filter the Vendor account column by \"${lw__vendorAccountFilter}\" (is exactly) in the PurchAgreementHeader_VendAccount1 lookup grid", async () => {
    await leapwork.d365.fno.lookup.gridColumnFilter(page, { lookupControlName: "PurchAgreementHeader_VendAccount1", lookupControlSelector: "[data-dyn-controlname=\"PurchAgreementHeader_VendAccount1\"]", lookupTriggerSelector: "#PurchAgreementCreate_4_PurchAgreementHeader_VendAccount1 > .lookupDock-buttonContainer > .lookupButton", columnControlName: "VendTable_AccountNum", columnLabel: "Vendor account", filterValue: String(lw__vendorAccountFilter), filterOperator: "is exactly" });
}, { action: "click", relativeXpath: "//*[@data-dyn-role='ColumnHeaderPopup'][@data-dyn-form-name='VendTable_AccountNum']//button[contains(@data-dyn-controlname,'_ApplyFilters')]" });

// ai-studio-step-id: pwl7xh6600
await leapwork.step("Select \"${lw__vendorAccount}\" from the Vendor account lookup list", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // await leapwork.d365.fno.SelectLookupOption(page, {
    //   controlName: "Vendor account",
    //   controlSelector: undefined,
    //   triggerSelector: undefined,
    //   optionSelector: undefined,
    //   value: String(lw__vendorAccount),
    // });
    // [/Leapwork Play self-heal preserved previous code]
    
    const vendorRow = page.getByRole('row', {
      name: 'Vendo_659751 Vendo_659751 Vendo_659751 Portsmouth NH USA 00210',
      exact: true,
    });
    await expect(vendorRow).toHaveCount(1);
    await vendorRow.click({ force: true });
}, { action: "click", relativeXpath: "//*[@id=\"Grid_10331_0-row-0\"]" });

// ai-studio-step-id: pw1f0vll90
await leapwork.step("Select \"${lw__purchaseAgreementClassification}\" from the Purchase agreement classification lookup list", async () => {
    await leapwork.d365.fno.SelectLookupOption(page, {
      controlName: "PurchAgreementHeader_AgreementClassification1",
      controlSelector: "[data-dyn-controlname=\"PurchAgreementHeader_AgreementClassification1\"]",
      triggerSelector: ".lookupDock.lookupDock-dockContainer.displayoption.hasdiscretesize-width.discretesize-width-large.fixed-width.layout-container.layout-horizontal.layout-horizontal-bottomalign.hasFocusedChild > div:nth-child(2) > .lookupButton",
      optionSelector: undefined,
      value: String(lw__purchaseAgreementClassification),
    });
}, { action: "change", relativeXpath: "//*[@data-dyn-controlname=\"PurchAgreementHeader_AgreementClassification1_Name\"]" });

// ai-studio-step-id: pwldmhly00
await leapwork.step("Expand the General tab in the purchase agreement form", async () => {
    // [Leapwork Play self-heal preserved previous code]
    // const generalTab = page.locator("[data-dyn-controlname=\"GeneralTab\"]").locator('button[aria-expanded], [role="button"][aria-expanded]').first();
    // await expect(generalTab).toHaveCount(1);
    // const shouldBeExpanded = true;
    // const isExpanded = (await generalTab.getAttribute('aria-expanded')) === 'true';
    // if (isExpanded !== shouldBeExpanded) {
    //     await generalTab.click({ force: true });
    // }
    // [/Leapwork Play self-heal preserved previous code]
    
    const generalButton = page.getByRole('button', { name: 'General', exact: true });
    await expect(generalButton).toHaveCount(1);
    await generalButton.click({ force: true });
}, { action: "click", relativeXpath: "//*[@id=\"purchagreementlistpage_2_GeneralLineGridMenuButton_button\"]" });



// ai-studio-step-id: pw2n3og900
await leapwork.step("Fill the Document title field with \"${lw__purchAgreementHeader_DocumentTitle1}\" in the purchase agreement document.", async () => {
    // Fill textbox "Document title"
    await page.locator('#PurchAgreementCreate_4_PurchAgreementHeader_DocumentTitle1_input').fill(String(lw__purchAgreementHeader_DocumentTitle1));
}, { action: "input", relativeXpath: "//*[@data-dyn-controlname=\"PurchAgreementHeader_DocumentTitle1\"]" });



// ai-studio-step-id: pw679b4000
await leapwork.step("Fill the Default commitment field with \"${lw__defaultCommitment}\"", async () => {
    await leapwork.d365.fno.SelectDropdown(page, {
      controlName: "PurchAgreementHeader_DefaultAgreementLineType",
      value: String(lw__defaultCommitment),
    });
}, { action: "input", relativeXpath: "//*[@data-dyn-controlname=\"PurchAgreementHeader_DefaultAgreementLineType\"]" });

// ai-studio-step-id: pwvxxaup00
await leapwork.step("Retrieve value present in Purchase agreement field", async () => {
    // TODO: implement step
}, { action: "custom" });
