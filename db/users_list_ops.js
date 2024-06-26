"use strict"

var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const main_collection_name = 'userswithrights_list';

function getUsersListByListIdQ(list_id){
    let that_client;
    let result_doc;
    list_id = mongodb.generateObject(list_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: list_id};
            return collection.findOne(search_query);
        })
        .then(resultDoc => {
            if(resultDoc === null) reject({code: 404, message: "To do list couldn't not be found with this id of " + list_id.toHexString()})
            result_doc = resultDoc;
            let users_list = result_doc.users_list;
            let id_list = [];
            for(var index = 0; index < users_list.length; ++index){
                id_list.push(users_list[index]._id);
            }
            //Getting a list of users to get full name for them
            let collection = that_client.collection("users");
            let search_query = {_id: {$in: id_list}}
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            //Assigning names to the existing doc
            let users_list = result_doc.users_list;
            for(var index = 0; index < resultArray.length; ++index){
                let user = resultArray[index];
                for(var j = 0; j < users_list.length; ++j){
                    let user_from_list = users_list[j];
                    if(user_from_list._id.equals(user._id))
                        user_from_list.fullname = user.fullname;
                }
            }
            return result_doc;
        })
        .then(resultDoc => {
            if(resultDoc === null) reject({code: 404, message: "To do list couldn't not be found with this id of " + list_id.str})
            resolve(resultDoc);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function updateUsersListByListIdQ(list_id, list){
    let that_client;
    list_id = mongodb.generateObject(list_id);
    for(var index = 0; index < list.length; ++index)
        list[index]._id = mongodb.generateObject(list[index]._id)
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: list_id};
            let update_query = {$set: {users_list: list}};
            return collection.findOneAndUpdate(search_query, update_query);
        })
        .then(result => {
            if(result.value === null) reject({code: 404, message: "users list of " + list_id.toHexString() + " is not found"})
            resolve({ok: true, message: "the to do list is successfully updated"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function getUserRightByUserIdAndUsersListIdQ(list_id, user_id){
    let that_client;
    list_id = mongodb.generateObject(list_id);
    user_id = mongodb.generateObject(user_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: list_id};
            return collection.findOne(search_query);
        })
        .then(resultDoc => {
            if(resultDoc === null) reject({code: 404, message: "Couldn't find the users list"});
            let list = resultDoc.users_list;
            let index = 0;
            let len = list.length;
            for(;index < len; ++index){
               let doc = list[index];
               let objId = doc._id;
               if(objId.equals(user_id))
                resolve({edit_rights: doc.edit_rights});
            }
            reject({code: 404, message: "Couldn't find the user in the users list"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

module.exports.getUsersListByListIdQ = getUsersListByListIdQ;
module.exports.updateUsersListByListIdQ = updateUsersListByListIdQ;
module.exports.getUserRightByUserIdAndUsersListIdQ = getUserRightByUserIdAndUsersListIdQ;
