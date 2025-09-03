@visual
Feature: Visual regression tests for the signup flow
  These scenarios capture element and full-page screenshots and compare them to baselines.

  @visual @fullpage
  Scenario: Full page visual baseline after successful signup
    Given the user is on the signup page
    When the user provides their full name "Visual Test User"
    And the user submits the petition
    Then the page should match the full-page visual baseline

  @visual @validation
  Scenario: Validation UI visual - empty submission
    Given the user is on the signup page
    When the user submits the petition without filling required fields
    Then the page should match the validation visual baseline

  @visual @mobile
  Scenario: Mobile viewport visual for signup page
    Given the user is on the signup page at viewport 375x812
    Then the page should match the mobile visual baseline