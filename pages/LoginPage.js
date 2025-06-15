const userData = require("../test-data/users.json");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("#email");
    this.password = page.locator('input[name="login[password]"]');
    this.loginButton = page.locator("button.action.login.primary");
    this.errorMessage = page.locator(".message-error");
    this.fieldErrors = page.locator(".field-error");
    this.validationMessages = page.locator(".mage-error");
  }

  async goto() {
    await this.page.goto(
      "https://magento.softwaretestingboard.com/customer/account/login/"
    );
  }

  async fillLoginForm(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
  }

  async enterCredentials() {
    await this.email.fill(userData.email);
    await this.password.fill(userData.password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async verifyLogin() {
    try {
      // Wait for either success message or account page
      await Promise.race([
        this.page.waitForSelector("text=Welcome", { timeout: 10000 }),
        this.page.waitForSelector("text=My Account", { timeout: 10000 }),
      ]);
      return true;
    } catch {
      return false;
    }
  }

  async verifyValidationErrors() {
    try {
      // Wait for any validation message to appear
      await this.page.waitForSelector(".mage-error", { timeout: 5000 });
      const hasValidationMessages = (await this.validationMessages.count()) > 0;
      const hasErrorMessage = await this.errorMessage.isVisible();
      return hasValidationMessages || hasErrorMessage;
    } catch (error) {
      return false;
    }
  }
}

module.exports = LoginPage;
