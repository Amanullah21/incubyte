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
    "Test Case": "Successful Signup",
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
    "Test Case": "Signup with Invalid Email",
    Description: "Verify validation when invalid email format is entered",
    Precondition: "User is on signup page",
    Steps:
      "1. Enter first name\n2. Enter last name\n3. Enter invalid email format\n4. Enter password\n5. Confirm password\n6. Click Create Account button",
    "Expected Result":
      "Validation message should be displayed for invalid email format",
    Priority: "High",
    Status: "Pass",
    "Last Run": new Date().toLocaleDateString(),
    Comments: "Email validation working correctly",
  },
  {
    "Test ID": "SIGNUP-003",
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
    "Test ID": "SIGNUP-004",
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

// Add worksheets to workbook
XLSX.utils.book_append_sheet(workbook, loginSheet, "Login Test Cases");
XLSX.utils.book_append_sheet(workbook, signupSheet, "Signup Test Cases");

// Write to file
XLSX.writeFile(workbook, "test-cases.xlsx");

console.log("Test cases have been generated in test-cases.xlsx");
