# Magento E-commerce Test Automation Framework

This project contains automated tests for the Magento e-commerce platform using Playwright and Cucumber. The framework focuses on testing user registration and login functionality with a robust set of test scenarios.

## 🚀 Features

- **BDD Testing**: Uses Cucumber for Behavior-Driven Development
- **Modern Testing Stack**: Built with Playwright for reliable end-to-end testing
- **Comprehensive Test Coverage**: Tests for both happy paths and edge cases
- **Visual Verification**: Automatic screenshot capture for debugging
- **Video Recording**: Test execution videos for better debugging
- **Detailed Reporting**: Cucumber HTML reports for test results

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd magento-playwright-tests
```

2. Install dependencies:

```bash
npm install
```

## 🏗️ Project Structure

```
magento-playwright-tests/
├── features/
│   ├── step_definitions/
│   │   ├── loginSteps.js
│   │   └── signupSteps.js
│   ├── login.feature
│   └── signup.feature
├── pages/
│   ├── LoginPage.js
│   └── SignupPage.js
├── screenshots/
├── videos/
├── package.json
└── README.md
```

## 🧪 Test Scenarios

### Signup Tests

- Successful account creation
- Validation for existing email
- Invalid email format validation
- Password mismatch validation
- Weak password validation
- Empty field validation
- Required field validation

### Login Tests

- Successful login
- Invalid credentials
- Empty field validation
- Remember me functionality
- Forgot password flow

## 🚀 Running Tests

1. Run all tests:

```bash
npx cucumber-js
```

2. Run specific feature:

```bash
npx cucumber-js --tags @signup
npx cucumber-js --tags @login
```

3. Run with specific browser:

```bash
npx cucumber-js --tags @signup --world-parameters '{"browser":"firefox"}'
```

## 📸 Screenshots and Videos

- Screenshots are automatically captured for:
  - Successful signup/login
  - Validation errors
  - Navigation errors
- Test execution videos are saved in the `videos/` directory

## 🔧 Configuration

### Timeouts

- Default timeout: 60 seconds
- Navigation timeout: 30 seconds
- Element wait timeout: 10 seconds

### Browser Settings

- Headless mode: Disabled by default
- Viewport: 1280x720
- Video recording: Enabled

## 📝 Test Data

The framework uses dynamic test data:

- Unique email generation for each test run
- Standard test credentials
- Validation test cases

## 🔍 Debugging

1. Check screenshots in the `screenshots/` directory
2. Review test execution videos in the `videos/` directory
3. View Cucumber HTML reports
4. Check console logs for detailed error messages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Authors

## Md Amanullah
