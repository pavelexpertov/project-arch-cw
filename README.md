## Requirements
* Node version: 8.9.4
* mongodb version: 3.6.2

## Quick setup
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
mongod --dbpath=data
# Then restore the data to the database
mongorestore -d tripdb mongo_backup/initial_backup/tripdb
# Then start the server!
npm start
```
You should be able to access the site on `http://localhost:3000` by clicking [here](http://localhost:3000)
