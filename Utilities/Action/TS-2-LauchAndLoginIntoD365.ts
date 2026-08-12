import { leapwork } from "./leapwork";
import type { Page } from "@playwright/test";

leapwork.configuration({
    enableSelfHeal: true,
    timeoutMs: 45000,
});
export async function launchAndLoginD365() {
    const username = leapwork.team.settings.get("d365-username");
    const password = leapwork.variables.getSecret("d365-password");
    await leapwork.launch(leapwork.run.url);
    const emailInput = page.getByRole('textbox', { name: 'Enter your email, phone, or Skype.',exact: true, });
    await expect(emailInput).toHaveCount(1);
    await emailInput.fill(username);
    await page.getByRole("button", { name: "Next", exact: true }).click();
    const passwordInput = page.getByRole('textbox', {name: new RegExp("Enter the password for","i"),exact: true,});
    await expect(passwordInput).toHaveCount(1);
    await passwordInput.fill(password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForTimeout(5000);
    const verificationCode = page.getByLabel("Enter code", { exact: true });
     if (await verificationCode.count()>0) {
            const otp = leapwork.generateTOTP(leapwork.variables.getSecret("d365-mfa-secret"));
            await verificationCode.fill(otp);
            await page.getByRole("button", {name: "Verify", exact: true, }).click();
        }
    const staySignedIn = page.getByRole("button", {name: "Yes",exact: true,});

        if (await staySignedIn.count() > 0) {
            await staySignedIn.click();
            await page.waitForTimeout(5000);
        }
    return page;
}

export async function logoutFromD365() {
        const userOptions = page.locator("[data-dyn-controlname=UserButton]");
        await expect(userOptions).toHaveCount(1);
         await page.mouse.move(0, 0);
        await userOptions.click();

        const signOut = page.locator("[data-dyn-controlname=SignOut]");
        await expect(signOut).toHaveCount(1);
        await page.mouse.move(0, 0);
        await signOut.click({ force: true });
});
        
});
}