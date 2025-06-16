const XLSX = require("xlsx");

// Test cases for login
const loginTestCases = [
  {
    "Test ID": "LOGIN-001",
    "Test Case": "Successful Login",
    Description: "Verify user can login with valid credentials",
    Precondition: "User is on login page",
    Steps:
      "1. Enter valid email\n2. Enter valid password\n3. Click Sign In button",
    "Expected Result":
      "User should be logged in successfully and redirected to account dashboard",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Test executed successfully",
  },
  {
    "Test ID": "LOGIN-002",
    "Test Case": "Login with Invalid Password",
    Description: "Verify error message when incorrect password is entered",
    Precondition: "User is on login page",
    Steps:
      "1. Enter valid email\n2. Enter incorrect password\n3. Click Sign In button",
    "Expected Result":
      "Error message should be displayed indicating incorrect password",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Error message displayed correctly",
  },
  {
    "Test ID": "LOGIN-003",
    "Test Case": "Login with Unregistered Email",
    Description: "Verify error message when unregistered email is entered",
    Precondition: "User is on login page",
    Steps:
      "1. Enter unregistered email\n2. Enter any password\n3. Click Sign In button",
    "Expected Result":
      "Error message should be displayed indicating account not found",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Error message displayed correctly",
  },
  {
    "Test ID": "LOGIN-004",
    "Test Case": "Login with Empty Fields",
    Description: "Verify validation when login form is submitted empty",
    Precondition: "User is on login page",
    Steps:
      "1. Leave email field empty\n2. Leave password field empty\n3. Click Sign In button",
    "Expected Result":
      "Validation messages should be displayed for both fields",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Validation messages displayed correctly",
  },
];

// Test cases for signup
const signupTestCases = [
  {
    "Test ID": "SIGNUP-001",
    "Test Case": "Successful Signup with Valid Data",
    Description: "Verify user can create new account with valid data",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter valid email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Account should be created successfully and user redirected to account dashboard",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Account created successfully",
  },
  {
    "Test ID": "SIGNUP-002",
    "Test Case": "Signup with Existing Email",
    Description:
      "Verify error message when trying to create account with existing email",
    Precondition:
      "User is on signup page and an account with test@example.com exists",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter existing email (test@example.com)\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Error message should be displayed indicating email already exists",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Duplicate email validation working correctly",
  },
  {
    "Test ID": "SIGNUP-003",
    "Test Case": "Signup with Invalid Email Format",
    Description: "Verify validation for various invalid email formats",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter invalid email (test@, test.com, @test.com)\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for invalid email format",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Email format validation working correctly",
  },
  {
    "Test ID": "SIGNUP-004",
    "Test Case": "Signup with Weak Password",
    Description: "Verify validation for weak password requirements",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter valid email\n4. Enter weak password (123456)\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for weak password",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Password strength validation working correctly",
  },
  {
    "Test ID": "SIGNUP-005",
    "Test Case": "Signup with Mismatched Passwords",
    Description:
      "Verify validation when password and confirm password do not match",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter valid email\n4. Enter password\n5. Enter different confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for password mismatch",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Password mismatch validation working correctly",
  },
  {
    "Test ID": "SIGNUP-006",
    "Test Case": "Signup with Special Characters in Name",
    Description: "Verify validation for special characters in name fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name with special characters\n2. Enter last name with special characters\n3. Enter valid email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for invalid characters in name fields",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Name field validation working correctly",
  },
  {
    "Test ID": "SIGNUP-007",
    "Test Case": "Signup with Numbers in Name",
    Description: "Verify validation for numbers in name fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name with numbers\n2. Enter last name with numbers\n3. Enter valid email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for numbers in name fields",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Name field validation working correctly",
  },
  {
    "Test ID": "SIGNUP-008",
    "Test Case": "Signup with Very Long Names",
    Description: "Verify validation for maximum length of name fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter very long first name\n2. Enter very long last name\n3. Enter valid email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for name length exceeding limit",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Name length validation working correctly",
  },
  {
    "Test ID": "SIGNUP-009",
    "Test Case": "Signup with Very Long Password",
    Description: "Verify validation for maximum length of password",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter valid email\n4. Enter very long password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for password length exceeding limit",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Password length validation working correctly",
  },
  {
    "Test ID": "SIGNUP-010",
    "Test Case": "Signup with Spaces in Email",
    Description: "Verify validation for spaces in email field",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter email with spaces\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for spaces in email",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Email format validation working correctly",
  },
  {
    "Test ID": "SIGNUP-011",
    "Test Case": "Signup with Empty Fields",
    Description: "Verify validation when signup form is submitted empty",
    Precondition: "User is on signup page",
    Steps: "1. Leave all fields empty\n2. Click Create Account button",
    "Expected Result":
      "Validation messages should be displayed for all required fields",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Empty field validation working correctly",
  },
  {
    "Test ID": "SIGNUP-012",
    "Test Case": "Signup with SQL Injection Attempt",
    Description: "Verify system security against SQL injection in form fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter SQL injection in first name\n2. Enter SQL injection in last name\n3. Enter SQL injection in email\n4. Enter SQL injection in password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "System should reject SQL injection attempts and display appropriate error message",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Security validation working correctly",
  },
  {
    "Test ID": "SIGNUP-013",
    "Test Case": "Signup with XSS Attempt",
    Description: "Verify system security against XSS attacks in form fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter XSS script in first name\n2. Enter XSS script in last name\n3. Enter XSS script in email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "System should reject XSS attempts and display appropriate error message",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Security validation working correctly",
  },
  {
    "Test ID": "SIGNUP-014",
    "Test Case": "Signup with International Characters",
    Description:
      "Verify system handles international characters in form fields",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name with international characters\n2. Enter last name with international characters\n3. Enter valid email\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "System should accept international characters in name fields",
    Priority: "Medium",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "International character support working correctly",
  },
];

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Create worksheets for login and signup test cases
const loginSheet = XLSX.utils.json_to_sheet(loginTestCases);
const signupSheet = XLSX.utils.json_to_sheet(signupTestCases);

// Set column widths for better readability
const wscols = [
  { wch: 10 }, // Test ID
  { wch: 25 }, // Test Case
  { wch: 40 }, // Description
  { wch: 20 }, // Precondition
  { wch: 40 }, // Steps
  { wch: 40 }, // Expected Result
  { wch: 10 }, // Priority
  { wch: 10 }, // Status
  { wch: 15 }, // Last Run
  { wch: 30 }, // Comments
];

loginSheet["!cols"] = wscols;
signupSheet["!cols"] = wscols;

// Add worksheets to workbook - Signup sheet first, then Login sheet
XLSX.utils.book_append_sheet(workbook, signupSheet, "Signup Test Cases");
XLSX.utils.book_append_sheet(workbook, loginSheet, "Login Test Cases");

// Write to file
XLSX.writeFile(workbook, "test-cases.xlsx");

console.log("Test cases have been generated in test-cases.xlsx");
