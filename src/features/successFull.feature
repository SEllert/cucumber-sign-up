@petition
Feature: User petition success
  This feature covers the petition signup process for users.
  It verifies that users can successfully sign a petition, and see their names on the petition page.

  @icelandic @positive @skip 
  @allure.label.suite:PetitionSignupPossitive 
  @allure.label.parentSuite:PetitionSignup
  Scenario: Successful signup on a petition page with Icelandic names
   This scenario tests that a user can sign a petition using Icelandic names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user enters a Full name "<fullName>" into the Full name field
    Then the user presses the Sign the Petition button
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

  @english @positive
  @allure.label.suite:PetitionSignupPossitive 
  @allure.label.parentSuite:PetitionSignup
  Scenario: Successful signup on a petition page with English names
   This scenario tests that a user can sign a petition using English names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user enters a Full name "<fullName>" into the Full name field
    Then the user presses the Sign the Petition button
    Then the user should see their name "<fullName>" on the petition page

    Examples:
      | fullName                                              |
      | John Smith                                            |
      | Mary Elizabeth Catherine Jones                        |
      | Al Li                                                 |
      | Anna-Marie O'Neill                                    |
      | Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr. |

  @allure.label.suite:Accessibility
  @allure.label.suite:PetitionSignupPossitive 
  @allure.label.parentSuite:PetitionSignup
  Scenario: the user can use Tab and Enter keys to navigate and submit
    Given the user is on the signup page
    When the user enters a Full name "John Doe" into the Full name field
    And the user presses the Tab key
    And the user presses the Enter key
    Then the user should see their name "John Doe" on the petition page
