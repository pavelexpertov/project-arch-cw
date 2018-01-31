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

## Links to libraries and frameworks
### Front-end
[Vue framework](https://vuejs.org/)

[vue-router - a router library](https://router.vuejs.org/en/)

[vuex - a state management pattern and library](https://vuex.vuejs.org/en/intro.html)

[Element - a desktop UI Library](http://element.eleme.io/#/en-US)

[moment.js - a library for manipulating time formats](http://momentjs.com/)

[vue-resouce - a library to perform http requests inside vue](https://github.com/pagekit/vue-resource)

### Back-end
[jsonschema - a libary to validate JSON schema](https://www.npmjs.com/package/jsonschema)

[mocha - a framework for writing tests](https://mochajs.org/)

[chai - an assert library](http://chaijs.com/)

[Q - a library for making promises for nodejs](http://documentup.com/kriskowal/q/)
