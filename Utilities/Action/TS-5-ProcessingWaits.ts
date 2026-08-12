import type { Page } from "@playwright/test";

export async function waitUntilPleaseWaitgPopupDisappears(
    page: Page,
    timeoutMs = 45000,
): Promise<void> {
    await page.waitForTimeout(5000);
    const processingPopup = page.getByText("Please wait. We're processing your request.", {
        exact: false,
    }).last();

    await processingPopup.waitFor({
        state: "hidden",
        timeout: timeoutMs,
    });
}
export async function waitUntilProcessingOperationPopupDisappears(
    page: Page,
    timeoutMs = 45000,
): Promise<void> {
    await page.waitForTimeout(5000);
    const processingOperationPopup = page.getByText(new RegExp("Processing operation", "i")).last();

    await processingOperationPopup.waitFor({
        state: "hidden",
        timeout: timeoutMs,
    });
   
}