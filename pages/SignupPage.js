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
  }

  async goto() {
    await this.page.goto(
      "https://magento.softwaretestingboard.com/customer/account/create/"
    );
  }

  async fillSignupForm() {
    const timestamp = Date.now();
    this.generatedEmail = `testuser${timestamp}@example.com`;
    await this.firstName.fill("Test");
    await this.lastName.fill("User");
    await this.email.fill(this.generatedEmail);
    await this.password.fill("Test@1234");
    await this.confirmPassword.fill("Test@1234");
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
      const hasValidationMessages = (await this.validationMessages.count()) > 0;
      const hasErrorMessage = await this.errorMessage.isVisible();
      return hasValidationMessages || hasErrorMessage;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SignupPage;
