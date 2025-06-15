Feature: User Login

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid login credentials
    And I click the login button
    Then I should be redirected to my account dashboard

  Scenario: Login with incorrect password
    Given I am on the login page
    When I enter correct email and wrong password
    And I click the login button
    Then I should see login error message

  Scenario: Login with unregistered email
    Given I am on the login page
    When I enter an unregistered email and any password
    And I click the login button
    Then I should see login error message

  Scenario: Login with blank fields
    Given I am on the login page
    When I leave email and password blank
    And I click the login button
    Then I should see login field validation errors