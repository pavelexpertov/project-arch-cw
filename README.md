# University coursework for Web Architecture module for final year

## About

This is a web development coursework that taught about nodejs and its `npm`
ecosystem and gave an opportunity to exercise front-end and back-end
development. The application is a to-do list application where it involves
organising football team trips and managing a list of assigned football players
as well as those involved with them and assign them tasks.

### Components

The application consists of three components:

- front-end part: it is implemented in [VueJs](https://v2.vuejs.org/) as a SPA (Single Page Application). This is a way for web users to interact with the application and perform its functions.
  - Implementation can be found in `vue-ui` directory.
- back-end part: it is implemented in [Express.js](http://expressjs.com/) as a
  back-end CRUD application that completes different client requests, performs various validation and
  application logic and interacts with a database for storing and retrieving
  persistent data.
  - The implementation components can be found in `db`, `routes` and `utils`
    directories.
- database: A [mongodb](https://www.mongodb.com/) is used to store data, manage
  it and serve various client queries on it.
  - Database document schemas can be found in `db_config/schemas` directory.

### Context and Functionality

The to-do application is to serve football managers who manage visiting trips for their
teams. It has the following features:
- User accounts: Allow users to login into the application with their credentials
  as well as ability to create new user accounts for their appropriate role.
- Trip plan management: Allow users to create plans and manage them. They can do
  the following:
  - To-do list: Create tasks, assign them to users if desired and complete them.
  - Trip plan details: enter context around the trip including dates of
    travelling and an opposition team to play against.
  - Player list: Manage a list of players
  - Trip plan management: Create trip plans and invite other users to manage
    them. Also, amend their information and ability to delete them.
- To-do list feature: Add tasks for different users to perform. It allows users
  to assign users, set dates and set a 'completed' status.
- Search for plans: A search bar to look for plans by looking a particular
  football player or an opposition team.


## How to Launch It

**Note**: the application is available on http://localhost:3000 after launching it in one of three ways.

### Docker (recommended)

It's possible to launch the project via Docker Compose.

```sh
docker compose up
```

This will pull pre-built images from a personal repository. 

A below command will built an image from scratch as well as proper docker tags to mongodb database.

```sh
docker compose -f transparent_compose.yaml up
```

### Run it via Vagrant
Follow [installation instructions](https://developer.hashicorp.com/vagrant/tutorials/getting-started/getting-started-index#prerequisites) for Vagrant and then run `vagrant up` inside the root of the project (it will take approximately 5 mins to set it all up). Then go to http://localhost:3000 to access login page.

### Local Setup
```
# Start to be in a project root directory to install node dependencies
npm install
# Then move to Vue folder to install dependencies and build the front-end
cd vue-ui
npm install
npm run build
cd ..
# Open a new tab in your terminal (so you *might* end up in the same
# directory project root) to set up mongo
mkdir data
mongod --dbpath=data
# Then restore the data to the database
mongorestore -d tripdb mongo_backup/initial_backup/tripdb
# Then start the server!
npm start
```
You should be able to access the site on `http://localhost:3000` by clicking [here](http://localhost:3000)

## Usage and Functionality of Interest

To login, use credentials of username `pav` with password `pav`. This is one of
the accounts in the application and it has some trips to look at.

### Trip Management

The first page shows a list of trip plans. Notice two separate lists of `My
Plans` and `Shared Plans`. These show trips that are created and owned by the
user and trips that invited the user to be part of, respectively.

There's a button to add a new trip plan. Do note that it's not possible to
invite other users at that page, but they can be invited **after** the trip plan
has been created.

### Trip Plan

Press 'Go' on one of the trips that the user owns. A page displays various
pieces of information for the trip and allows users to edit two lists:
- the to-do list: Manage a list of tasks
- the player list: assign football players to a specific trip
  - In order to see selectable players, type in anything in the search bar and
    then clear it. A pop up list should appear displaying the players.

There's a "Edit" button that allows editing the trip plan including assigning
other users who can work with the plan. To see assignable users, perform the
same above trick related to the search box.

### Search Trip Plans

Trip plans are searchable via the Search page. Click on the "Search" at top of
the page. Trips can be search by assigned players or specified opposition teams.
It is possible to specify a date range search criteria by toggling "Date Range"
checkbox and edit date boxes.

## Requirements
* Node version: 8.9.4
* mongodb version: 3.6.2

## Links to libraries and frameworks
### Front-end
[Vue framework](https://vuejs.org/)

[vue-router - a router library](https://router.vuejs.org/en/)

[vuex - a state management pattern and library](https://vuex.vuejs.org/en/intro.html)

[Element - a desktop UI Library](http://element.eleme.io/#/en-US)

[moment.js - a library for manipulating time formats](http://momentjs.com/)

[vue-resource - a library to perform http requests inside vue](https://github.com/pagekit/vue-resource)

### Back-end
[jsonschema - a library to validate JSON schema](https://www.npmjs.com/package/jsonschema)

[mocha - a framework for writing tests](https://mochajs.org/)

[chai - an assert library](http://chaijs.com/)

[Q - a library for making promises for nodejs](http://documentup.com/kriskowal/q/)
