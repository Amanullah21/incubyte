const {
  Given,
  When,
  Then,
  After,
  Before,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
setDefaultTimeout(30000);

const { chromium } = require("playwright");
const SignupPage = require("../../pages/SignupPage");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

let signupPage;

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

When("I enter an invalid email format", async function () {
  await signupPage.fillInvalidEmail();
});

When("I enter mismatched passwords", async function () {
  await signupPage.fillMismatchedPasswords();
});

When(
  "I submit the registration form without entering any data",
  async function () {
    await signupPage.submitEmptyForm();
  }
);

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

Then("I should see signup field validation errors", async function () {
  const result = await signupPage.verifyValidationErrors();
  expect(result).to.be.true;
});

Then("I should see email format validation error", async function () {
  const result = await signupPage.verifyValidationErrors();
  expect(result).to.be.true;
});

Then("I should see password mismatch error", async function () {
  const result = await signupPage.verifyValidationErrors();
  expect(result).to.be.true;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
