# Magento Playwright BDD Automation

## Description
Automated the signup and login flow for Magento e-commerce site using Playwright, JavaScript, and BDD (Cucumber).

## Project Structure
- `features/` - Contains feature files and step definitions
- `pages/` - Page Object Model classes
- `test-data/` - Static test data (like login credentials)
- `screenshots/` - Screenshots from execution
- `videos/` - Video recordings of tests

## Run Instructions
```bash
npm install
npx cucumber-js
```

## Login Test
The signup test will auto-save the user credentials to `test-data/users.json`. Run login test after signup.
```bash
npx cucumber-js features/login.feature
```

## Output
- Screenshot: `screenshots/*.png`
- Video recording: `videos/`

## Author
Md Amanullah for Incubyte SDET Role