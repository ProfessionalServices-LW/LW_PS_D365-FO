import { leapwork } from "./leapwork";

import { LaunchAndLoginIntoD365, launchAndLoginD365, logoutFromD365 } from "@assets/Utilities/Action/LaunchAndLoginIntoD365";
import { NavigateToModule, navigateToModule } from "@assets/Utilities/Action/NavigateToModule";
import { ProductInfoManagement, createNewReleasedProduct } from "@assets/Utilities/Module/ProductInfoManagement";

leapwork.variables.set("itemNumberFilter", "001919", leapwork.storage.LOCAL);
const lw__itemNumberFilter = leapwork.variables.get("itemNumberFilter", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: pw1nu49wy0
await leapwork.step("Launch And Login Into D365", async () => {
  await launchAndLoginD365();
}, { action: "custom" });

// ai-studio-step-id: pw1bp1e9u0
await leapwork.step("Navigate to Module", async () => {
  await navigateToModule(page,"Product information management","Products","Released products");
}, { action: "custom" });

// ai-studio-step-id: pwdkbk3800
await leapwork.step("Create An Item From Released Products", async () => {
  await createNewReleasedProduct(page, "", "", "", "FIFO", "Audio", "SiteWH", "None", "", "", "", "50", "60", "55");
}, {action: "custom"});

// ai-studio-step-id: pw16o0cuo0
await leapwork.step(`Filter the Items grid by Item number: "${lw__itemNumberFilter}"`, async () => {
  await leapwork.d365.fno.grid.quickFilter(page, {
    value: String(lw__itemNumberFilter),
    columnName: "Item number",
    quickFilterControlName: "QuickFilter",
  });
}, { action: "click", relativeXpath: "//*[@data-dyn-role='QuickFilter']//li[.//span[@class='quickFilter-listFieldName' and text()=\"Item number\"]]" });


// ai-studio-step-id: pw1yyal130
await leapwork.step("Validate the Product number field shows '015521' on the Released product details page", async () => {
    // Assert textbox "Product number" contains "015521"
    await expect(page.getByRole('textbox', { name: 'Product number' })).toHaveValue("015521");
}, { action: "validate", relativeXpath: "//*[@data-dyn-controlname=\"Identification_ProductNumber\"]" });
