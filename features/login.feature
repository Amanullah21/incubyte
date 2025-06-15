Feature: User Login

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid login credentials
    And I click the login button
    Then I should be redirected to my account dashboard
