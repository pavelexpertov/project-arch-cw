/*Purpose is to thest the library of the mongo_db to make sure that it connects properly*/
var mongodb = require('../db/mongo_db.js');
var that_client = '';

var prom = mongodb.getConnectedMongoClientQ()
.then(client => {
    that_client = client;
    console.log("Before getting connected to the client");
    client.db("some_example");
    console.log("Successfully connected to the database or miscreated it");
    //client.close();
    console.log("Also closed it!");
})
.catch(error => {
    console.log("Oh oh something's wrong");
    console.log(error);
})
.finally(() => that_client.close())
.done();
