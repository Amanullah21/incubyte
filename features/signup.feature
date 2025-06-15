Feature: User Registration
  As a new user
  I want to create an account
  So that I can access the website's features

  Background:
    Given I am on the signup page

  @signup @smoke
  Scenario: Successful account creation with valid data
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should be successfully registered
    And I should be redirected to the account page after signup

  @signup @validation
  Scenario: Attempt to create account with empty first name
    When I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see first name validation error

  @signup @validation
  Scenario: Attempt to create account with empty last name
    When I enter valid first name "John"
    And I enter valid email "test@example.com"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see last name validation error

  @signup @validation
  Scenario: Attempt to create account with empty email
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see email validation error

  @signup @validation
  Scenario: Attempt to create account with empty password
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see password validation error

  @signup @validation
  Scenario: Attempt to create account with empty confirm password
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I enter valid password "Test@1234"
    And I click the Create Account button
    Then I should see confirm password validation error

  @signup @validation
  Scenario: Attempt to create account with existing email
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter existing email "existing@example.com"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see existing email error message

  @signup @validation
  Scenario: Attempt to create account with invalid email format
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter invalid email "invalid-email"
    And I enter valid password "Test@1234"
    And I confirm the password "Test@1234"
    And I click the Create Account button
    Then I should see invalid email format error

  @signup @validation
  Scenario: Attempt to create account with mismatched passwords
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I enter valid password "Test@1234"
    And I confirm the password "DifferentPassword123"
    And I click the Create Account button
    Then I should see password mismatch error

  @signup @validation
  Scenario: Attempt to create account with weak password
    When I enter valid first name "John"
    And I enter valid last name "Doe"
    And I enter valid email "test@example.com"
    And I enter weak password "123456"
    And I confirm the password "123456"
    And I click the Create Account button
    Then I should see weak password error

  @signup @validation
  Scenario: Attempt to create account with all empty fields
    When I click the Create Account button
    Then I should see validation errors for all required fields