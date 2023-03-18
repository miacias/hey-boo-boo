# Hey Boo Boo!
social planning app for events where food is on the table!

## Description

Hey Boo-Boo is your ultimate companion in planning a picnic, or any get-together, just like Yogi Bear and his pals. With a user-friendly, bear-ish interface throughout the app, you'll feel like you're right in Jellystone Park.

The app allows you to create a customized picnic plan by selecting the date, time, location, and unique title for your event. You can also invite friends and family to their picnic through the app, send out invitations, and view RSVPs.
<!-- The app also offers a variety of pre-built picnic templates that users can choose from, including romantic picnics, family picnics, and group picnics. These templates provide suggestions for food, drinks, and activities based on the selected theme. -->
<!-- The app includes a checklist feature to help users ensure they have all the necessary items for their picnic, such as a blanket, cooler, plates, utensils, and more. Additionally, the app provides a grocery list feature, where users can create a list of items they need to purchase for their picnic. -->
<!-- Users can also browse through a library of picnic recipes and save their favorite ones to a personal recipe book. The app can generate a shopping list based on the selected recipes, making it easy to purchase all the necessary ingredients. -->

Overall, the picnic planner app provides users with a comprehensive toolset for planning the perfect picnic, from the initial planning stages to the final execution.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contribution](#contribution)
- [Tests](#tests)
- [Contact](#contact)
- [Credits](#credits)
- [License](#license)


## Installation

N/A. [Deployed site here!](https://lit-river-34902.herokuapp.com/)


## Usage

Start by selecting the date, time, and location of your picnic. Give it a fun name like "Honey Pot Picnic," "Pic-a-Nic Basket Potluck," or "Campfire Cookout" ....or "Jessica's Graduation Party." Everything is up to you with Hey Boo-Boo.

<!-- For when finding venue locations are added -->
<!-- With Hey Boo-Boo as your guide, you'll have access to some of the best picnic spots in Jellystone. Choose from options like "Ranger Smith's favorite picnic spot," "Boo Boo's secret picnic spot," or "Yogi's favorite picnic spot by the lake." -->
The app also includes a guest invitation feature, where you can invite all your closest friends and family to join your "picnic" event. You can even track their RSVPs leading up to your picnic date by opening your event page and seeing their names displayed.

Every person attending has the option to let everyone know what they will be bringing in their picnic basket. 


## Roadmap

Content will be added and adjusted as new coding projects are available! Some projects may phase out over time as our work becomes more specialized. Some desired features and functionality to be added in the future:
1. use and store health-related data regarding food items
    - use food database API (Edamam) to store food items with their associated health related flags (allergens, health-related dietary restrictions, contains animal products, etc.)
    - display warning icons on food items with option to view more details regarding health concerns (contains peanuts, etc.)
    - allow users to filter food item display based on their dietary needs or health concerns
    - allow users the option to add any of their food-related health concerns to their private profile settings
2. refactored, more efficient database schema (Picnic and User many-to-many relationship through Food)
3. home page revamp
    - alerts users that changes have occurred in their events which provide a link to go straight to that event
    - display "your year in review" which shows fun stats like history of foods brought to picnics
4. invite page revamp
    - allow users to create "groups" to provide a faster way to organize recurring events
    - allow hosts to send invitations through the app to other users through a friend list or via recent interactions
    - incorporate mobile phone text message invitations
5. picnic page revamp
    - incorporate a message board for updates with email notifications, or add a chat feature for each event
    - shows what friends are most likely to bring based on their history
    - categorize foods by type (dessert, side-dish, needs oven, etc.) or show indicators
    - include requested items list
    - editing features: 
        - host and invitee ability to edit food items, remove food items, or bring multiple items
        - host capability to remove invitees or delete the event
        - invitee ability to uninvite themselves from an event


## Contribution

Not currently accepting contributions. Thank you for your interest!


## Tests

Testing not provided at this time.


## Contacts

Jack Einhorn [GitHub](https://github.com/skullkid4200), [jackeinhorn123@gmail.com](mailto:jackeinhorn123@gmail.com)

Josh Eflin [GitHub](https://github.com/JoshEflin), [eflinjh@gmail.com](mailto:eflinjh@gmail.com)

Mia Ciasullo [GitHub](https://github.com/miacias), [miaciasullo@gmail.com](mailto:miaciasullo@gmail.com)

Stevie O'Connell [GitHub](https://github.com/OConnell-Coder), [oconnellcoder@gmail.com](mailto:oconnellcoder@gmail.com)


## Credits

Documentation referenced:

- Mozilla Developer Network
- Slack Overflow forums
- W3 Schools
- Bootstrap CSS
- Sequelize
- Handlebars JS
- Express-Handlebars JS
- Google Calendar API
- Google Maps API
- Heroku

Tutorial(s) referenced:

- [Stephanie Eckles](https://moderncss.dev/totally-custom-list-styles/) - custom CSS list styles
- [RhymBil on YouTube](https://www.youtube.com/watch?v=1YjybCS4B2U) - dynamically select random images
- [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript) - custom cursors
- [Coding Shiksha](https://www.youtube.com/watch?v=0yjlmGwF-OY) - Google Maps API autocomplete integration

Tools used:

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Shields.io](https://shields.io/) - status badges

U. Penn Bootcamp instructor(s): 

- [Dan Gross](https://github.com/DanielWGross) - Google Calendar API, refactored database structure, complex database queries
- [Andrew Hojnowski](https://github.com/aHojo) - workflow
- [C. Ross King](https://github.com/RomeoKilo125/) - database theory

Tutor(s):
- Geronimo Perez - extracting data from complex database queries

Artist(s):

- [Scheme Color](https://www.schemecolor.com/yogi-bear.php) - Yogi Bear color palette
- [Cameral Dias, James Moulton](https://www.cdnfonts.com/hanna-barbera-1960-font-2.font) - Hanna-Barbera 1960 font
- [Custom-Cursor](https://custom-cursor.com/en/collection/minimal-style/minimal-bear) - bear cursor
- [nawicon](https://www.flaticon.com/free-icons/picnic) - picnic basket icon
- [soytutype fonts](https://fonts.google.com/specimen/Oleo+Script) - Oleo Script font
- [Sideshow](https://fonts.google.com/specimen/Rancho) - Rancho font
- [Impallari Type](https://fonts.google.com/specimen/Caveat+Brush) - Caveat Brush font

## License

Please refer to the LICENSE in the repo:

[![License](https://img.shields.io/badge/license-MIT-blue?logo=github)](https://github.com/miacias/hey-boo-boo/blob/main/LICENSE)