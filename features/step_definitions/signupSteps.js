const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const SignupPage = require('../../pages/SignupPage');
const { expect } = require('chai');

let browser, page, signupPage;

Given('I am on the signup page', async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  page = await context.newPage();
  signupPage = new SignupPage(page);
  await signupPage.goto();
});

When('I enter valid user details', async () => {
  await signupPage.fillSignupForm();
});

When('I submit the registration form', async () => {
  await signupPage.submit();
});

Then('I should be redirected to the account dashboard', async () => {
  const result = await signupPage.verifySuccessfulSignup();
  expect(result).to.be.true;
  await page.screenshot({ path: 'screenshots/success.png' });
});

After(async () => {
  await browser.close();
});