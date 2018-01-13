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

exports.getConnectedMongoClientQ = getConnectedMongoClientQ;
