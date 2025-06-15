const {
  Given,
  When,
  Then,
  After,
  Before,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const SignupPage = require("../../pages/SignupPage");
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

// Increase timeout to 60 seconds
setDefaultTimeout(60 * 1000);

let signupPage;

Before(async function () {
  this.browser = await chromium.launch({
    headless: false,
    timeout: 60000,
  });
  const context = await this.browser.newContext({
    recordVideo: { dir: "videos/" },
    viewport: { width: 1280, height: 720 },
  });
  this.page = await context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("I am on the signup page", async function () {
  signupPage = new SignupPage(this.page);
  try {
    await signupPage.goto();
    // Wait for the form to be ready
    await this.page.waitForSelector("#firstname", {
      state: "visible",
      timeout: 10000,
    });
  } catch (error) {
    console.error("Navigation error:", error);
    await this.page.screenshot({
      path: "screenshots/navigation-error.png",
      fullPage: true,
    });
    throw error;
  }
});

When("I enter valid first name {string}", async function (firstName) {
  await signupPage.firstName.fill(firstName);
});

When("I enter valid last name {string}", async function (lastName) {
  await signupPage.lastName.fill(lastName);
});

When("I enter valid email {string}", async function (email) {
  const timestamp = Date.now();
  const uniqueEmail = email.replace("@", `+${timestamp}@`);
  await signupPage.email.fill(uniqueEmail);
});

When("I enter existing email {string}", async function (email) {
  await signupPage.email.fill(email);
});

When("I enter invalid email {string}", async function (email) {
  await signupPage.email.fill(email);
});

When("I enter valid password {string}", async function (password) {
  await signupPage.password.fill(password);
});

When("I enter weak password {string}", async function (password) {
  await signupPage.password.fill(password);
});

When("I confirm the password {string}", async function (password) {
  await signupPage.confirmPassword.fill(password);
});

When("I click the Create Account button", async function () {
  await signupPage.submit();
  // Wait for any network activity to complete
  await this.page
    .waitForLoadState("networkidle", { timeout: 10000 })
    .catch(() => {});
});

Then("I should be successfully registered", async function () {
  const success = await signupPage.verifySuccessfulSignup();
  expect(success).to.be.true;
});

Then(
  "I should be redirected to the account page after signup",
  async function () {
    // Wait for navigation to complete
    await this.page
      .waitForLoadState("networkidle", { timeout: 10000 })
      .catch(() => {});

    const currentUrl = this.page.url();
    expect(currentUrl).to.contain("/customer/account/");

    // Verify we're on the account page
    const pageTitle = await signupPage.accountPageTitle.textContent();
    expect(pageTitle).to.contain("My Account");
  }
);

Then("I should see existing email error message", async function () {
  await this.page.waitForSelector(".message-error", { timeout: 5000 });
  const errorMessage = await signupPage.getErrorMessage();
  expect(errorMessage).to.contain("already an account");
});

Then("I should see invalid email format error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("email_address");
  expect(hasError).to.be.true;
});

Then("I should see password mismatch error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible(
    "password-confirmation"
  );
  expect(hasError).to.be.true;
});

Then("I should see weak password error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("password");
  expect(hasError).to.be.true;
});

Then("I should see first name validation error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("firstname");
  expect(hasError).to.be.true;
});

Then("I should see last name validation error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("lastname");
  expect(hasError).to.be.true;
});

Then("I should see email validation error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("email_address");
  expect(hasError).to.be.true;
});

Then("I should see password validation error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible("password");
  expect(hasError).to.be.true;
});

Then("I should see confirm password validation error", async function () {
  await this.page.waitForSelector(".mage-error, .field-error", {
    timeout: 5000,
  });
  const hasError = await signupPage.isFieldErrorVisible(
    "password-confirmation"
  );
  expect(hasError).to.be.true;
});

Then(
  "I should see validation errors for all required fields",
  async function () {
    await this.page.waitForSelector(".mage-error, .field-error", {
      timeout: 5000,
    });

    // Check all required fields
    const fields = [
      "firstname",
      "lastname",
      "email_address",
      "password",
      "password-confirmation",
    ];

    for (const field of fields) {
      const hasError = await signupPage.isFieldErrorVisible(field);
      expect(hasError).to.be.true;
    }
  }
);
