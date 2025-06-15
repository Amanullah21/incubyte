const { test, expect } = require("@playwright/test");
const { SignupPage } = require("../pages/SignupPage");

test.describe("Signup Page Tests", () => {
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.goto();
  });

  // SIGNUP-001: Successful Signup with Valid Data
  test("should successfully create account with valid data", async ({
    page,
  }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const success = await signupPage.verifySuccessfulSignup();
    expect(success).toBeTruthy();
  });

  // SIGNUP-002: Signup with Existing Email
  test("should show error for existing email", async ({ page }) => {
    const existingEmail = "test@example.com"; // Use an email that exists in your system

    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill(existingEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-003: Signup with Invalid Email Format
  test("should show error for invalid email formats", async ({ page }) => {
    const invalidEmails = ["test@", "test.com", "@test.com", "test@.com"];

    for (const email of invalidEmails) {
      await signupPage.firstName.fill("Test");
      await signupPage.lastName.fill("User");
      await signupPage.email.fill(email);
      await signupPage.password.fill("Test@1234");
      await signupPage.confirmPassword.fill("Test@1234");
      await signupPage.submit();

      const hasError = await signupPage.verifyValidationErrors();
      expect(hasError).toBeTruthy();
    }
  });

  // SIGNUP-004: Signup with Weak Password
  test("should show error for weak password", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("123456");
    await signupPage.confirmPassword.fill("123456");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-005: Signup with Mismatched Passwords
  test("should show error for mismatched passwords", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("DifferentPassword123");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-006: Signup with Special Characters in Name
  test("should show error for special characters in name", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("Test@#$%");
    await signupPage.lastName.fill("User@#$%");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-007: Signup with Numbers in Name
  test("should show error for numbers in name", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("Test123");
    await signupPage.lastName.fill("User456");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-008: Signup with Very Long Names
  test("should show error for very long names", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    const longName = "A".repeat(256); // Assuming 255 is the max length

    await signupPage.firstName.fill(longName);
    await signupPage.lastName.fill(longName);
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-009: Signup with Very Long Password
  test("should show error for very long password", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    const longPassword = "A".repeat(256); // Assuming 255 is the max length

    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill(longPassword);
    await signupPage.confirmPassword.fill(longPassword);
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-010: Signup with Spaces in Email
  test("should show error for spaces in email", async ({ page }) => {
    await signupPage.firstName.fill("Test");
    await signupPage.lastName.fill("User");
    await signupPage.email.fill("test user@example.com");
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-011: Signup with Empty Fields
  test("should show error for empty fields", async ({ page }) => {
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-012: Signup with SQL Injection Attempt
  test("should prevent SQL injection attempts", async ({ page }) => {
    const sqlInjection = "' OR '1'='1";
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill(sqlInjection);
    await signupPage.lastName.fill(sqlInjection);
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill(sqlInjection);
    await signupPage.confirmPassword.fill(sqlInjection);
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-013: Signup with XSS Attempt
  test("should prevent XSS attempts", async ({ page }) => {
    const xssAttempt = '<script>alert("XSS")</script>';
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill(xssAttempt);
    await signupPage.lastName.fill(xssAttempt);
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const hasError = await signupPage.verifyValidationErrors();
    expect(hasError).toBeTruthy();
  });

  // SIGNUP-014: Signup with International Characters
  test("should accept international characters in name", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;

    await signupPage.firstName.fill("José");
    await signupPage.lastName.fill("García");
    await signupPage.email.fill(testEmail);
    await signupPage.password.fill("Test@1234");
    await signupPage.confirmPassword.fill("Test@1234");
    await signupPage.submit();

    const success = await signupPage.verifySuccessfulSignup();
    expect(success).toBeTruthy();
  });
});
