class SignupPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator('#firstname');
      this.lastName = page.locator('#lastname');
      this.email = page.locator('#email_address');
      this.password = page.locator('#password');
      this.confirmPassword = page.locator('#password-confirmation');
      this.submitBtn = page.locator('button[title="Create an Account"]');
    }
  
    async goto() {
      await this.page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
    }
  
    async fillSignupForm() {
      const timestamp = Date.now();
      this.generatedEmail = `testuser${timestamp}@example.com`;
      await this.firstName.fill('Test');
      await this.lastName.fill('User');
      await this.email.fill(this.generatedEmail);
      await this.password.fill('Test@1234');
      await this.confirmPassword.fill('Test@1234');
    }
  
    async submit() {
      await this.submitBtn.click();
    }
  
    async verifySuccessfulSignup() {
      try {
        await this.page.waitForSelector('text=My Account', { timeout: 10000 });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  
  module.exports = SignupPage;