import type { Page } from "@playwright/test";


export async function expandSection(sectionName: string)
{
const contactInformationTab = page.locator("[role=heading]").locator(`button[aria-expanded][aria-label="${sectionName}"], [role="button"][aria-expanded][aria-label="${sectionName}"]`
).first();
    await expect(contactInformationTab).toHaveCount(1);
    const shouldBeExpanded = true;
    const isExpanded = (await contactInformationTab.getAttribute('aria-expanded')) === 'true';
    if (isExpanded !== shouldBeExpanded) {
      await contactInformationTab.click({ force: true });
    }
}

export async function collapseSection(sectionName: string)
{
const contactInformationTab = page.locator("[role=heading]").locator(`button[aria-expanded][aria-label="${sectionName}"], [role="button"][aria-expanded][aria-label="${sectionName}"]`
).first();
    await expect(contactInformationTab).toHaveCount(1);
    const shouldBeExpanded = false;
    const isExpanded = (await contactInformationTab.getAttribute('aria-expanded')) === 'false';
    if (isExpanded !== shouldBeExpanded) {
      await contactInformationTab.click({ force: true });
    }
}
