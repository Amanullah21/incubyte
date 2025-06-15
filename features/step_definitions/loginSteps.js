const { Given, When, Then, After } = require("@cucumber/cucumber");
const LoginPage = require("../../pages/LoginPage");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

let loginPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When("I enter valid login credentials", async function () {
  const userFile = path.resolve(__dirname, "../../test-data/users.json");
  const rawData = fs.readFileSync(userFile);
  const userData = JSON.parse(rawData);
  await loginPage.enterCredentials(userData);
});

When("I click the login button", async function () {
  await loginPage.submit();
});

Then("I should be redirected to my account dashboard", async function () {
  const result = await loginPage.verifyLogin();
  expect(result).to.be.true;
  await this.page.screenshot({ path: "screenshots/login-success.png" });
});

After(async () => {
  await browser.close();
});
