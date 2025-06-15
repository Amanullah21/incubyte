const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const { expect } = require('chai');

let browser, page, loginPage;

Given('I am on the login page', async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I enter valid login credentials', async () => {
  await loginPage.enterCredentials();
});

When('I click the login button', async () => {
  await loginPage.submit();
});

Then('I should be redirected to my account dashboard', async () => {
  const result = await loginPage.verifyLogin();
  expect(result).to.be.true;
  await page.screenshot({ path: 'screenshots/login-success.png' });
});

After(async () => {
  await browser.close();
});
