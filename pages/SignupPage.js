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
      await Promise.race([
        this.page.waitForSelector("text=Thank you for registering", {
          timeout: 10000,
        }),
        this.page.waitForSelector("text=My Account", { timeout: 10000 }),
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyValidationErrors() {
    try {
      await this.page.waitForSelector(".mage-error", { timeout: 5000 });
      const hasValidationMessages = (await this.validationMessages.count()) > 0;
      const hasErrorMessage = await this.errorMessage.isVisible();
      return hasValidationMessages || hasErrorMessage;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SignupPage;
