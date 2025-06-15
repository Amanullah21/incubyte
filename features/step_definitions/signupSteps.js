const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const SignupPage = require("../../pages/SignupPage");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

let browser, page, signupPage;

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext({
    recordVideo: { dir: "videos/" },
  });
  this.page = await context.newPage();
});

Given("I am on the signup page", async function () {
  signupPage = new SignupPage(this.page);
  await signupPage.goto();
});

When("I enter valid user details", async function () {
  await signupPage.fillSignupForm();
});

When("I submit the registration form", async function () {
  await signupPage.submit();
});

Then("I should be redirected to the account dashboard", async function () {
  const result = await signupPage.verifySuccessfulSignup();
  expect(result).to.be.true;
  await this.page.screenshot({ path: "screenshots/success.png" });

  // Save signup credentials to users.json
  const userData = {
    email: signupPage.generatedEmail,
    password: "Test@1234",
  };
  const userFile = path.resolve(__dirname, "../../test-data/users.json");
  fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
