Feature: User Signup

  Scenario: Create a new user account
    Given I am on the signup page
    When I enter valid user details
    And I submit the registration form
    Then I should be redirected to the account dashboard