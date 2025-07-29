@petition
Feature: User petition success
  This feature covers the petition signup process for users.
  It verifies that users can successfully sign a petition, and see their names on the petition page.

  @language:icelandic @positive @skip @regression @allure.label.suite:PetitionSignupPossitive @allure.label.parentSuite:PetitionSignup
  Scenario: Petition accepts Icelandic names with special characters
   This scenario tests that a user can sign a petition using Icelandic names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user provides their full name "<fullName>"
    And the user submits the petition
    Then the user should see their name "<fullName>" on the petition page

    Examples:
      | fullName                           |
      | Jón Þór Sigurðsson                 |
      | Þórunn Ragnheiður Ragnheiðardóttir |
      | Guðrún Elísabet Ólafsdóttir        |
      | Sigríður Björk Einarssdóttir       |
      | Ólafur Kristján Þórðarson          |
      | Jóhanna Katrín Guðmundsdóttir      |
      | Magnús Þór Friðriksson             |
      | Elísabet Ásta Björnsdóttir         |
      | Ásta Ragnhildur Guðbjörnsdóttir    |
      | Kristín Þóra Þórðardóttir          |

  @language:english @positive @smoke @allure.label.suite:PetitionSignupPossitive @allure.label.parentSuite:PetitionSignup
  Scenario: Petition accepts English
   This scenario tests that a user can sign a petition using English names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user provides their full name "<fullName>"
    And the user submits the petition
    Then the user should see their name "<fullName>" on the petition page

    Examples:
      | fullName                                              |
      | John Smith                                            |
      | Mary Elizabeth Catherine Jones                        |
      | Al Li                                                 |
      | Anna-Marie O'Neill                                    |
      | Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr. |

  @allure.label.suite:Accessibility @sanity @allure.label.suite:PetitionSignupPossitive @allure.label.parentSuite:PetitionSignup
  Scenario: the user can use Tab and Enter keys to navigate and submit
    Given the user is on the signup page
    When the user provides their full name "John Doe"
    And the user presses the Tab key
    And the user presses the Enter key
    Then the user should see their name "John Doe" on the petition page
