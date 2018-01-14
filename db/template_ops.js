var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const main_collection_name_template = 'template';

function templateQ(){
    let that_client;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}