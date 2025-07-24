Feature: User petition success
    Scenario: Successful signup on a petition page
        Given the user is on the signup page
        When the user enters a Full name "<fullName>" into the Full name field
        And the user presses the Sign the Petition button
        Then the user should see their name "<fullName>" on the petition page
Examples:
  | fullName                             |
  | Jón Þór Sigurðsson                   |  # Shortest (20 characters)
  | Þórunn Ragnheiður Ragnheiðardóttir  |  # Longest (33 characters)
  | Guðrún Elísabet Ólafsdóttir          |
  | Sigríður Björk Einarssdóttir         |
  | Ólafur Kristján Þórðarson            |
  | Jóhanna Katrín Guðmundsdóttir        |
  | Magnús Þór Friðriksson               |
  | Elísabet Ásta Björnsdóttir           |
  | Ásta Ragnhildur Guðbjörnsdóttir      |
  | Kristín Þóra Þórðardóttir            |

