import { leapwork } from "./leapwork";
import type { Page } from "@playwright/test";

export async function navigateToModule(
    page: Page,
    area: string,
    module: string,
    moduleItem: string,
    nestedItem?: string,
): Promise<void> {
    const target = nestedItem
        ? `${moduleItem} > ${nestedItem}`
        : moduleItem;
        if (nestedItem) {
            await leapwork.d365.fno.modulesNavigation(
                page,
                area,
                module,
                moduleItem,
                nestedItem,
            );
        } else {
            await leapwork.d365.fno.modulesNavigation(
                page,
                area,
                module,
                moduleItem,
            );
        }
}