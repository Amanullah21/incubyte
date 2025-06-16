class SignupPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#firstname");
    this.lastName = page.locator("#lastname");
    this.email = page.locator("#email_address");
    this.password = page.locator("#password");
    this.confirmPassword = page.locator("#password-confirmation");
    this.submitBtn = page.locator('button[title="Create an Account"]');
    this.errorMessage = page.locator(".message-error");
    this.fieldErrors = page.locator(".field-error");
    this.validationMessages = page.locator(".mage-error");
    this.successMessage = page.locator(".message-success");
    this.accountPageTitle = page.locator(".page-title span");
  }

  async goto(retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        // First try to go to the home page with increased timeout
        await this.page.goto("https://magento.softwaretestingboard.com/", {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        // Wait for any initial network activity to complete
        await this.page
          .waitForLoadState("networkidle", { timeout: 30000 })
          .catch(() => {});

        // Then navigate to the signup page with increased timeout
        await this.page.goto(
          "https://magento.softwaretestingboard.com/customer/account/create/",
          {
            waitUntil: "domcontentloaded",
            timeout: 60000,
          }
        );

        // Wait for any network activity to complete
        await this.page
          .waitForLoadState("networkidle", { timeout: 30000 })
          .catch(() => {});

        // Verify we're on the signup page with increased timeout
        await this.page.waitForSelector("#firstname", {
          state: "visible",
          timeout: 30000,
        });

        // Additional check to ensure the page is fully loaded
        await this.page
          .waitForLoadState("domcontentloaded", { timeout: 30000 })
          .catch(() => {});

        return;
      } catch (error) {
        console.log(`Attempt ${i + 1} failed: ${error.message}`);
        if (i === retries - 1) {
          // Take screenshot on final failure
          await this.page.screenshot({
            path: `screenshots/navigation-error-attempt-${i + 1}.png`,
            fullPage: true,
          });
          throw new Error(
            `Failed to navigate to signup page after ${retries} attempts: ${error.message}`
          );
        }
        // Wait longer before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async fillSignupForm(firstName, lastName, email, password, confirmPassword) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
  }

  async fillInvalidEmail() {
    await this.firstName.fill("Test");
    await this.lastName.fill("User");
    await this.email.fill("invalid-email");
    await this.password.fill("Test@1234");
    await this.confirmPassword.fill("Test@1234");
  }

  async fillMismatchedPasswords() {
    const timestamp = Date.now();
    this.generatedEmail = `testuser${timestamp}@example.com`;
    await this.firstName.fill("Test");
    await this.lastName.fill("User");
    await this.email.fill(this.generatedEmail);
    await this.password.fill("Test@1234");
    await this.confirmPassword.fill("DifferentPassword123");
  }

  async submitEmptyForm() {
    await this.submitBtn.click();
  }

  async submit() {
    await this.submitBtn.click();
  }

  async verifySuccessfulSignup() {
    try {
      // Wait for the page to load after signup
      await this.page.waitForLoadState("networkidle");

      // Check for multiple possible success indicators
      const successIndicators = [
        "text=Thank you for registering",
        "text=My Account",
        ".message-success",
        '.page-title span:has-text("My Account")',
      ];

      // Try each indicator
      for (const selector of successIndicators) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          // Take screenshot when signup is successful
          await this.page.screenshot({
            path: "screenshots/signup-success.png",
            fullPage: true,
          });
          return true;
        } catch (e) {
          continue;
        }
      }

      // If none of the indicators are found, check if we're on the account page
      const currentUrl = this.page.url();
      if (currentUrl.includes("/customer/account/")) {
        // Take screenshot when on account page
        await this.page.screenshot({
          path: "screenshots/signup-success.png",
          fullPage: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup verification error:", error);
      return false;
    }
  }

  async verifyValidationErrors() {
    try {
      // Wait for any validation message to appear
      await this.page.waitForSelector(
        ".messages .message-error, .message-error, .mage-error",
        { timeout: 5000 }
      );

      // Take screenshot of validation error
      await this.page.screenshot({
        path: "screenshots/signup-validation-error.png",
        fullPage: true,
      });

      const hasValidationMessages = (await this.validationMessages.count()) > 0;
      const hasErrorMessage = await this.errorMessage.isVisible();
      return hasValidationMessages || hasErrorMessage;
    } catch (error) {
      console.error("Validation error check failed:", error);
      return false;
    }
  }

  async getErrorMessage() {
    try {
      const errorElement = await this.page.waitForSelector(
        ".message-error, .mage-error",
        { timeout: 5000 }
      );
      return await errorElement.textContent();
    } catch (error) {
      return null;
    }
  }

  async isFieldErrorVisible(fieldName) {
    try {
      const fieldError = await this.page.locator(`#${fieldName}-error`);
      return await fieldError.isVisible();
    } catch (error) {
      return false;
    }
  }

  async getFieldError(fieldName) {
    try {
      const fieldError = await this.page.locator(`#${fieldName}-error`);
      return await fieldError.textContent();
    } catch (error) {
      return null;
    }
  }
}

module.exports = SignupPage;
