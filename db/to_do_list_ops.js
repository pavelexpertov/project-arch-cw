var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const main_collection_name = 'todo_lists';

function getToDoListByListIdQ(list_id){
    let that_client;
    list_id = mongodb.generateObject(list_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: list_id};
            return collection.findOne(search_query);
        })
        .then(result => {
            if(result === null) reject({code:404, message:"The to do list couldn't be found"});
            resolve(result);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function updateToDoListByListIdQ(list_id, todo_list){
    let that_client;
    list_id = mongodb.generateObject(list_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: list_id};
            let update_query = {$set: {todo_list: todo_list}};
            return collection.findOneAndUpdate(search_query, update_query);
        })
        .then(result => {
            if(result.value === null) reject({code: 404, message: "to do list of " + list_id.toHexString() + " is not found"})
            resolve({ok: true, message: "Updated the todo successfully"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

module.exports.getToDoListByListIdQ = getToDoListByListIdQ;
module.exports.updateToDoListByListIdQ = updateToDoListByListIdQ;