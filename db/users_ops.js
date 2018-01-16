"use strict"
var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const collection_name = 'users';

function getOwnAndSharedProjects(user_id){
    let that_client;
    user_id = mongodb.generateObject(user_id);
    let projects_model = {own_projects: '', shared_projects: ''};
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Get user's own projects first
            let collection = client.collection("projects");
            let search_query = {user_id: user_id};
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            //Getting the projects that the user has created
            if(resultArray === null){
                console.log("Looks like an empty array \n" + resultArray)
                resultArray = [];
            }
            projects_model.own_projects = resultArray;
            return that_client;
        })
        .then(client => {
            //Getting a list of users lists where the user_id is contained
            //so as to find which projects are shared with the user.
            let collection = client.collection('userswithrights_list');
            //let search_query = {users_list: user_id};
            let search_query = {users_list: {$elemMatch: {user_id: user_id}}};
            return collection.find(search_query).toArray();
        })
        .then(users_listArray => {
            //Convert a list of documents into an array of objectIds
            //for collecting the documents.
            let objIdArray = [];
            let length = users_listArray.length;
            for(var index = 0; index < length; ++index){
                objIdArray.push(users_listArray[index].owner_id);
            }
            let collection = that_client.collection('projects');
            let search_query = {_id: {$in: objIdArray}};
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            if(resultArray === null){
                console.log("Looks like an empty array \n" + resultArray)
                resultArray = [];
            }
            projects_model.shared_projects = resultArray;
            resolve(projects_model);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    })
}

function findUsersByName(name){
    let that_client;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Find the users based on the search query
            let collection = client.collection(collection_name);
            let search_query = {fullname: {$regex: name, $options: 'i'}};
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            if(resultArray === null){
                console.log("Looks like an empty array \n" + resultArray)
                resultArray = [];
            }
            resolve(resultArray);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    })
}

module.exports.getOwnAndSharedProjects = getOwnAndSharedProjects;
module.exports.findUsersByName = findUsersByName;
