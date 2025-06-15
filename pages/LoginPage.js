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
    this.welcomeMessage = page.locator(".greet.welcome");
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
      // Wait for the page to load after login
      await this.page.waitForLoadState("networkidle");

      // Check for multiple possible success indicators
      const successIndicators = [
        "text=Welcome",
        "text=My Account",
        ".greet.welcome",
        '.page-title span:has-text("My Account")',
      ];

      // Try each indicator
      for (const selector of successIndicators) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          return true;
        } catch (e) {
          continue;
        }
      }

      // If none of the indicators are found, check if we're on the account page
      const currentUrl = this.page.url();
      return currentUrl.includes("/customer/account/");
    } catch (error) {
      console.error("Login verification error:", error);
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

  async getErrorMessage() {
    try {
      const errorElement = await this.page.waitForSelector(
        ".messages .message-error, .message-error",
        { timeout: 5000 }
      );
      return await errorElement.textContent();
    } catch (error) {
      return null;
    }
  }
}

module.exports = LoginPage;
