import { expect, test } from "@playwright/test";

test("Criação de novo Autor", async ({ page }) => {
    await page.goto("http://localhost:1337/admin");

    await page.fill('input[name="email"]', "admin@satc.edu.br");
    await page.fill('input[name="password"]', "welcomeToStrapi123");
    await page.click('button[type="submit"]');

    await page.waitForSelector('a[aria-label="Content Manager"]');

    await page.getByRole('link', { name: 'Content Manager' }).click();

    await page.waitForSelector('text=Autor');
    await page.click('text=Autor');

    await page.waitForSelector('text=Create new entry');
    await page.click('text=Create new entry');

    await page.getByLabel("Nome").fill("Giorgian De Arrascaeta");
    await page.getByLabel("Email").fill("mengao@gmail.com");

    await page.click("text=Save");

});
