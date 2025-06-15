# Magento E-commerce Test Automation

This project contains automated tests for the Magento e-commerce platform using Playwright and Cucumber. The framework focuses on testing user registration and login functionality with a robust set of test scenarios.

## 🚀 Features

- **User Registration Testing**

  - Valid registration flow
  - Invalid email format validation
  - Password strength validation
  - Required field validation
  - Duplicate email validation

- **Login Testing**
  - Valid login flow
  - Invalid credentials handling
  - Empty field validation
  - Error message verification

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd magento-playwright-tests
```

2. Install dependencies:

```bash
npm install
```

## 📊 Generating Test Sheets

### Method 1: Using Google Sheets

1. Create a new Google Sheet
2. Add the following columns:
   - Test Case ID
   - Test Scenario
   - Test Steps
   - Test Data
   - Expected Result
   - Status
3. Copy the test scenarios from your feature files
4. Save the sheet and share with your team

### Method 2: Using Excel/CSV

1. Create a new Excel file or CSV
2. Add the same columns as above
3. Export as CSV to `test-cases/` directory
4. Name format: `[feature-name]-test-cases.csv`

### Method 3: Using Test Case Generator Script

1. Install required dependencies:

```bash
npm install @cucumber/gherkin @cucumber/messages --save-dev
```

2. Run the generator script:

```bash
node scripts/generate-test-cases.js
```

3. The script will:
   - Read all `.feature` files
   - Generate test cases automatically
   - Create CSV files in `test-cases/` directory
   - Name format: `[feature-name]-test-cases.csv`

### Test Case Format Example

```csv
Test Case ID,Test Scenario,Test Steps,Test Data,Expected Result,Status
TC001,Valid Login,1. Navigate to login page
2. Enter valid email
3. Enter valid password
4. Click login button,Email: test@example.com
Password: Test123!,User should be redirected to dashboard,Not Run
```

## 🏃‍♂️ Running Tests

### Run All Tests

```bash
npx cucumber-js
```

### Run Specific Feature

```bash
# Run only login tests
npx cucumber-js features/login.feature

# Run only signup tests
npx cucumber-js features/signup.feature
```

### Run with Tags

```bash
# Run tests with specific tag
npx cucumber-js --tags @login
```

## 📁 Project Structure

```
magento-playwright-tests/
├── features/
│   ├── login.feature
│   └── signup.feature
├── features/
│   └── step_definitions/
│       ├── loginSteps.js
│       └── signupSteps.js
├── pages/
│   ├── LoginPage.js
│   └── SignupPage.js
├── test-data/
│   └── users.json
├── test-cases/
│   ├── login-test-cases.csv
│   └── signup-test-cases.csv
├── screenshots/
├── videos/
└── reports/
```

## 📝 Test Case Management

### Test Data

- Test data is stored in `test-data/users.json`
- Update this file with valid test credentials

### Test Reports

After running tests, you can find:

- Screenshots: `screenshots/` directory
- Video recordings: `videos/` directory
- HTML Reports: `reports/cucumber-report.html`

## 🔍 Test Scenarios

### Login Scenarios

1. Valid Login

   - Enter valid credentials
   - Verify successful login
   - Check dashboard access

2. Invalid Login
   - Enter invalid credentials
   - Verify error message
   - Check error handling

### Registration Scenarios

1. Valid Registration

   - Enter valid user details
   - Verify successful registration
   - Check account creation

2. Invalid Registration
   - Enter invalid email format
   - Test password requirements
   - Verify validation messages

## 🐛 Troubleshooting

If you encounter issues:

1. **Browser Issues**

   - Ensure Playwright browsers are installed:

   ```bash
   npx playwright install
   ```

2. **Test Failures**

   - Check screenshots in `screenshots/` directory
   - Review video recordings in `videos/` directory
   - Verify test data in `test-data/users.json`

3. **Common Errors**
   - "Invalid Form Key": Refresh the page and retry
   - "Element not found": Check selectors in page objects
   - "Timeout": Increase timeout in cucumber.js

## 📞 Support

- 7070476900
