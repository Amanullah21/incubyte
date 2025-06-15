Feature: User Signup

  Scenario: Create a new user account
    Given I am on the signup page
    When I enter valid user details
    And I submit the registration form
    Then I should be redirected to the account dashboard

  Scenario: Signup with missing fields
    Given I am on the signup page
    When I submit the registration form without entering any data
    Then I should see signup field validation errors

  Scenario: Signup with invalid email format
    Given I am on the signup page
    When I enter an invalid email format
    And I submit the registration form
    Then I should see email format validation error

  Scenario: Signup with mismatched passwords
    Given I am on the signup page
    When I enter mismatched passwords
    And I submit the registration form
    Then I should see password mismatch error