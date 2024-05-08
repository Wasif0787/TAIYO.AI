# Contacts Management and Covid Cases Tracker

## Start the Project

First Clone the Project

### `git clone https://github.com/Wasif0787/TAIYO.AI.git`

Move to the root directory of the project.

### `cd TAIYO.AI`

Now install all dependencies.

### `npm install`

Now start the project using:

### `npm start`

Visit [http:localhost:3000](http://localhost:3000) to view the project running

# Project Overview

This section provides an overview of the project structure and key features.

## Contact Section

### Add Contact Tab

- Description: Allows users to add new contacts.
- Functionality:
  - Users can input contact details.
  - Contacts are stored using Redux and localStorage.

![AddContacts](./snapshots/addContact.png)

### View Contacts Tab

- Description: Displays all contacts.
- Functionality:

  - Users can view a list of all saved contacts.
  - Each contact includes options to update, delete, and view details of that contact.
    -Green background indicates contact is active whereas red background indicates contact is inactive.

- View Contacts
  ![ViewContacts](./snapshots/addContact.png)

- Update Contacts
  ![UpdateContacts](./snapshots/UpdateContact.png)

- Details of the Contacts
  ![DetailContacts](./snapshots/DetailContact.png)

## Charts Section

### Graphs

- Description: Displays COVID-19 data in graph format.
- Data Source: [Disease.sh API](https://disease.sh/v3/covid-19/historical/all?lastdays=all#)
- Functionality:
  - Fetches data from the provided API endpoint.
  - Displays graphs showing COVID-19 cases, deaths, and recoveries over time.

![AddContact](./path/to/graphs-image.png)

## Maps Section

### COVID-19 Maps

- Description: Displays COVID-19 data on an interactive map.
- Data Source: [Disease.sh API](https://disease.sh/v3/covid-19/countries#)
- Functionality:
  - Fetches data from the provided API endpoint.
  - Places markers on the map to represent COVID-19 data for each country.
  - Includes tooltips with details such as country name, active cases, recoveries, and deaths.

![Maps](./path/to/maps-image.png)
