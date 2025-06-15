const {
  Given,
  When,
  Then,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const LoginPage = require("../../pages/LoginPage");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

let browser, page, context, loginPage;
let users = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../test-data/users.json"))
);

setDefaultTimeout(30000);

Given("I am on the login page", async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ recordVideo: { dir: "videos/" } });
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When("I enter valid login credentials", async function () {
  const userFile = path.resolve(__dirname, "../../test-data/users.json");
  const rawData = fs.readFileSync(userFile);
  const userData = JSON.parse(rawData);
  await loginPage.fillLoginForm(userData.email, userData.password);
});

When("I enter correct email and wrong password", async function () {
  const userFile = path.resolve(__dirname, "../../test-data/users.json");
  const rawData = fs.readFileSync(userFile);
  const userData = JSON.parse(rawData);
  await loginPage.fillLoginForm(userData.email, "wrongpassword");
});

When("I enter an unregistered email and any password", async function () {
  await loginPage.fillLoginForm("unregistered@example.com", "anypassword");
});

When("I leave email and password blank", async function () {
  await loginPage.fillLoginForm("", "");
});

When("I click the login button", async function () {
  await loginPage.submit();
});

Then("I should be redirected to my account dashboard", async function () {
  const result = await loginPage.verifyLogin();
  expect(result).to.be.true;
  await this.page.screenshot({ path: "screenshots/login-success.png" });
});

Then("I should see login error message", async function () {
  const result = await loginPage.verifyValidationErrors();
  expect(result).to.be.true;
  await page.screenshot({ path: "screenshots/login-error.png" });
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.equal("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.");
});

Then("I should see login field validation errors", async function () {
  const result = await loginPage.verifyValidationErrors();
  expect(result).to.be.true;
});

After(async () => {
  await browser?.close();
});
