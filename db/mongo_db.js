"use strict"
var Q = require('q');
var mongodb = require('mongodb');

const db_name = "tripdb";
const url = 'mongodb://127.0.0.1:27017';

function getConnectedMongoClientQ(){
    return Q.Promise(function(resolve, reject){
        mongodb.MongoClient.connect(url, (err, client) => {
            if (err) {
                console.log("oops it got closed");
                client.close();
                reject(err);
            }
            let db_client = client.db(db_name);
            resolve(db_client);
        })
    });
}

/*Generate new objectid if an argument wasn't passed.
Otherwise, use the argument to generate new objectId*/
function generateObject(id = ''){
    if(id)
        return mongodb.ObjectID(id);
    else
        return mongodb.ObjectID();
}

exports.getConnectedMongoClientQ = getConnectedMongoClientQ;
exports.generateObject = generateObject;
