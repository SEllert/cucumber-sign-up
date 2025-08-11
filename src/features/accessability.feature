@petition
Feature: User petition success: Accessibility
  This feature covers the petition signup process for users.
  It verifies that users can successfully sign a petition, and see their names on the petition page.

  @visual @positive @sanity
  Scenario: the user can use Tab and Enter keys to navigate and submit
    Given the user is on the signup page
    When the user provides their full name "John Doe"
    And the user presses the Tab key
    And the user presses the Enter key
    Then the user should see their name "John Doe" on the petition page
