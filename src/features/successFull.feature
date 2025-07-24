Feature: User petition success
    Scenario: Successful signup on a petition page
        Given the user is on the signup page
        When the user enters a Full name "<fullName>" into the Full name field
        And the user presses the Sign the Petition button
        Then the user should see their name "<fullName>" on the petition page
Examples:
  | fullName              |
  | Jón Sigurðsson        |
  | Anna Guðmundsdóttir   |
  | Kristín Jónsdóttir    |
  | Sigurður Gunnarsson   |
  | Guðrún Ólafsdóttir    |
  | Ólafur Kristjánsson   |
  | Sigríður Einarssdóttir|
  | Magnús Stefánsson     |
  | Jóhanna Jóhannsdóttir |
  | Gunnar Guðmundsson    |
