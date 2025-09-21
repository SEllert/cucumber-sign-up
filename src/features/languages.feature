@petition
Feature: User petition success: Languages
  This feature covers the petition signup process for users.
  It verifies that users can successfully sign a petition, and see their names on the petition page.

  @language:icelandic @positive @skip @regression  @visual
  Scenario: Petition accepts Icelandic names with special characters
   This scenario tests that a user can sign a petition using Icelandic names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user provides their full name "<fullName>"
    And the user submits the petition
    Then the user should see their name "<fullName>" on the petition page
    Then the user should see their name "<fullName>" on the petition page visually

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

  @language:english @positive @smoke @visual
  Scenario: Petition accepts English
   This scenario tests that a user can sign a petition using English names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user provides their full name "<fullName>"
    And the user submits the petition
    Then the user should see their name "<fullName>" on the petition page
    Then the user should see their name "<fullName>" on the petition page visually

# Copilot Data: 
Examples:
  | fullName         |
  | Olivia Smith     |
  | Noah Johnson     |
  | Amelia Brown     |
  | Oliver Taylor    |
  | Isla Wilson      |
  | George Harris    |
  | Lily Clark       |
  | Leo Walker       |
  | Ava Lewis        |
  | Henry Young      |

  @language:mandrin @positive @regression @visual
  Scenario: Petition accepts Mandarin
   This scenario tests that a user can sign a petition using Mandarin names.
   It verifies that the name appears correctly on the petition page after signup.

    Given the user is on the signup page
    When the user provides their full name "<fullName>"
    And the user submits the petition
    Then the user should see their name "<fullName>" on the petition page
    Then the user should see their name "<fullName>" on the petition page visually

# Chatpilor:  get me example of 10 Mandarin name so that the entire list has every font possible in the Mandarin language. There should be very long names and very short names
Examples:
  | fullName              |
  | 王伟                  |  // Short, common name (2 characters)
  | 李小龙                |  // Famous name (Bruce Lee), 3 characters
  | 赵钱孙李              |  // 4-character poetic surname sequence
  | 欧阳娜娜              |  // Double-character surname (欧阳), 4 characters total
  | 慕容复                |  // Literary name with rare surname (慕容)
  | 司马相如              |  // Historical name with compound surname (司马)
  | 张三丰                |  // Legendary Taoist figure, 3 characters
  | 冷月如霜              |  // Poetic style name, 4 characters
  | 东方不败              |  // Fictional name, dramatic flair, 4 characters
  | 夏侯惇                |  // Ancient warrior name, compound surname

@language:russian @positive @regression @visual
Scenario: Petition accepts Russian names
  This scenario tests that a user can sign a petition using Russian names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Иван Иванов             |
    | Мария Петрова           |
    | Дмитрий Смирнов         |
    | Анастасия Кузнецова     |
    | Алексей Попов           |
    | Екатерина Соколова      |
    | Сергей Лебедев          |
    | Ольга Морозова          |
    | Владимир Новиков        |
    | Наталья Федорова        |

@language:hindi @positive @regression @visual
Scenario: Petition accepts Hindi names
  This scenario tests that a user can sign a petition using Hindi names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | आर्यन शर्मा             |
    | साक्षी वर्मा            |
    | विवेक सिंह              |
    | प्रिया गुप्ता            |
    | रोहित अग्रवाल           |
    | नेहा चौधरी             |
    | आदित्य मिश्रा           |
    | पूजा यादव              |
    | करण मेहरा              |
    | काव्या जोशी            |

@language:french @positive @regression @visual
Scenario: Petition accepts French names
  This scenario tests that a user can sign a petition using French names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Émile Dubois            |
    | Chloé Lefèvre           |
    | Lucas Moreau            |
    | Camille Laurent         |
    | Hugo Petit              |
    | Manon Girard            |
    | Jules Roux              |
    | Zoé Fontaine            |
    | Louis Mercier           |
    | Léa Faure               |

@language:danish @positive @regression @visual
Scenario: Petition accepts Danish names
  This scenario tests that a user can sign a petition using Danish names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Mads Jensen             |
    | Freja Nielsen           |
    | Emil Hansen             |
    | Ida Pedersen            |
    | Magnus Andersen         |
    | Sofie Christensen       |
    | Oliver Sørensen         |
    | Laura Rasmussen         |
    | Victor Møller           |
    | Anna Larsen             |

@language:spanish @positive @regression @visual
Scenario: Petition accepts Spanish names
  This scenario tests that a user can sign a petition using Spanish names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Alejandro García        |
    | Lucía Fernández         |
    | Pablo Rodríguez         |
    | Marta López             |
    | Daniel Martínez         |
    | Carmen Sánchez          |
    | Javier Pérez            |
    | Sara Gómez              |
    | Diego Ruiz              |
    | Paula Díaz              |

@language:polish @positive @regression @visual
Scenario: Petition accepts Polish names
  This scenario tests that a user can sign a petition using Polish names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Jan Kowalski            |
    | Anna Nowak              |
    | Piotr Wiśniewski        |
    | Katarzyna Wójcik        |
    | Tomasz Kamiński         |
    | Agnieszka Lewandowska   |
    | Michał Zieliński        |
    | Monika Szymańska        |
    | Krzysztof Woźniak       |
    | Ewa Dąbrowska           |

@language:croatian @positive @regression @visual
Scenario: Petition accepts Croatian names
  This scenario tests that a user can sign a petition using Croatian names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Ivan Horvat             |
    | Ana Kovačić             |
    | Marko Babić             |
    | Marija Marić            |
    | Luka Jurić              |
    | Petra Petrović          |
    | Filip Novak             |
    | Ivana Tomić             |
    | Tomislav Pavlović       |
    | Martina Radić           |

@language:italian @positive @regression @visual
Scenario: Petition accepts Italian names
  This scenario tests that a user can sign a petition using Italian names.
  It verifies that the name appears correctly on the petition page after signup.

  Given the user is on the signup page
  When the user provides their full name "<fullName>"
  And the user submits the petition
  Then the user should see their name "<fullName>" on the petition page
  Then the user should see their name "<fullName>" on the petition page visually

  Examples:
    | fullName                |
    | Alessandro Rossi        |
    | Giulia Russo            |
    | Lorenzo Ferrari         |
    | Martina Esposito        |
    | Matteo Bianchi          |
    | Francesca Romano        |
    | Andrea Colombo          |
    | Chiara Ricci            |
    | Davide Marino           |
    | Sara Greco              |