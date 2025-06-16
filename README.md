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

- Test data is stored in `test-data/users.json` and verify with login
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

## 📊 Generating Test Sheets

### Using Test Case Generator Script

1. Run the generator script:

```bash
node scripts/generateTestCases.js
```

2. The script will generate `test-cases.xlsx` with two sheets:
   - Signup Test Cases (opens by default)
   - Login Test Cases

### Test Case Format

Each test case includes:

- Test ID
- Test Case
- Description
- Precondition
- Steps
- Expected Result
- Priority
- Status
- Last Run
- Comments

### Example Test Cases

#### Login Test Cases

- Successful Login
- Login with Invalid Password
- Login with Unregistered Email
- Login with Empty Fields

#### Signup Test Cases

- Successful Signup with Valid Data
- Signup with Existing Email
- Signup with Invalid Email Format
- Signup with Weak Password
- Signup with Mismatched Passwords
- And more...


## project Explanation
 - https://drive.google.com/file/d/1RkfiYHx3_HgVs2uIgtkX3LuUVLjnTFf-/view?usp=drive_link
## 📞 Support

- 7070476900
