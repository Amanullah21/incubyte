const userData = require("../test-data/users.json");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("#email");
    this.password = page.locator('input[name="login[password]"]');
    this.loginButton = page.locator("button.action.login.primary");
  }

  async goto() {
    await this.page.goto(
      "https://magento.softwaretestingboard.com/customer/account/login/"
    );
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
      await this.page.waitForSelector("text=My Account", { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = LoginPage;
