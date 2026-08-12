import type { Page } from "@playwright/test";


export async function generateRandomString(text: string): Promise<string>
{
        const randomValue = Math.floor(Math.random() * Math.pow(10, 8)).toString().padStart(8, "0");
        return `${text}_${randomValue}`;
}
export async function generateRandomNumber(): Promise<string>
{
        const randomValue = Math.floor(Math.random() * Math.pow(10, 8)).toString().padStart(8, "0");
        return `${randomValue}`;
}
