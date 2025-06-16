import { expect, test } from "@playwright/test";

test("Criação de novo Artigo", async ({ page }) => {
    await page.goto("http://localhost:1337/admin");

    await page.fill('input[name="email"]', "admin@satc.edu.br");
    await page.fill('input[name="password"]', "welcomeToStrapi123");
    await page.click('button[type="submit"]');

    await page.waitForSelector('a[aria-label="Content Manager"]');
    await page.getByRole('link', { name: 'Content Manager' }).click();

    await page.waitForSelector('text=Artigo');
    await page.click('text=Artigo');

    await page.waitForSelector('text=Create new entry');
    await page.click('text=Create new entry');

    await page.waitForSelector('input[name="title"]');
    await page.locator('input[name="title"]').fill("Título via Playwright", { force: true });

    await page.waitForSelector('input[name="slug"]');
    await page.locator('input[name="slug"]').fill("slug-playwright");

    await page.waitForSelector('textarea[name="description"]');
    await page.locator('textarea[name="description"]').fill("Descrição automática do artigo gerado com Playwright");

    const publishButton = page.getByRole('button', { name: 'Publish' });
    await expect(publishButton).toBeEnabled(); // ou: await publishButton.waitFor({ state: 'visible' });
    await publishButton.click();

});
