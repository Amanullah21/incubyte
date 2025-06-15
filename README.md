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

## 🤝 Contributing

1. Create a new branch for your changes
2. Write clear test scenarios
3. Update test data if needed
4. Run tests to verify changes
5. Submit a pull request

## 📚 Best Practices

1. **Test Data Management**

   - Keep test data in `test-data/` directory
   - Use realistic test data
   - Avoid hardcoding credentials

2. **Page Objects**

   - Maintain selectors in page objects
   - Keep page objects updated
   - Use meaningful method names

3. **Test Structure**
   - Write clear scenario descriptions
   - Use appropriate tags
   - Follow Gherkin syntax

## 🔒 Security

- Never commit sensitive data
- Use environment variables for credentials
- Keep test data separate from code

## 📞 Support

 - 7070476900
