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
            let search_query = {users_list: {$elemMatch: {_id: user_id}}};
            return collection.find(search_query).toArray();
        })
        .then(users_listArray => {
            //Convert a list of documents into an array of objectIds
            //for collecting the documents.
            //console.log(users_listArray);
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

function getUserByUserId(user_id){
    let that_client;
    user_id = mongodb.generateObject(user_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(collection_name);
            let search_query = {_id: user_id};
            return collection.findOne(search_query);
        })
        .then(user_doc => {
            if(user_doc === null) reject({code: 404, message: "Couldn't find the user"});
            resolve(user_doc);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function updateUserAccountByUserId(user_id, user_doc){
    let that_client;
    user_id = mongodb.generateObject(user_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(collection_name);
            let search_query = {_id: user_id};
            let update_query = {$set: user_doc};
            return collection.findOneAndUpdate(search_query, update_query);
        })
        .then(result => {
            if(result.value === null) reject({code: 404, message: "User with id of " + user_id.toHexString() + " is not found"})
            resolve({ok: true, message: "Updated user account successfully"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function deleteUserAccountByUserId(user_id){
    let that_client;
    let usersids_list = [];
    let tdlid_list = [];
    let plid_list = [];
    user_id = mongodb.generateObject(user_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Removing user from userswithrights_list's users_list
            let collection = client.collection('userswithrights_list');
            let search_query = {users_list: {$elemMatch: {_id: user_id}}};
            let delete_query = {$pull: {users_list: {_id: user_id}}};
            return collection.updateMany(search_query, delete_query);
        })
        .then(result => {
            //Collecting users's projects 
            //Before deleting the projects.
            let collection = that_client.collection('projects');
            let search_query = {user_id: user_id};
            return collection.find(search_query).toArray();
        })
        .then(projectsArray => {
            //Compiling lists of todo_lists, userswithrights_lists and players_list
            //Before deleting the projects.
            let project_id_list = [];
            let length = projectsArray.length;
            for(var index = 0; index < length; ++index){
                let project = projectsArray[index];
                usersids_list.push(project.userswithrights_list_id);
                plid_list.push(project.players_list_id);
                tdlid_list.push(project.todo_list_id);
                project_id_list.push(project._id);
            }
            //Deleting projects associated with the user
            let collection = that_client.collection('projects');
            let search_query = {_id: {$in: project_id_list}};
            return collection.deleteMany(search_query);
        })
        .then(result => {
            //Deleting project's to do lists associated with the delted objects
            let collection = that_client.collection('todo_lists');
            let search_query = {_id: {$in: tdlid_list}};
            return collection.deleteMany(search_query);
        })
        .then(result => {
            //Deleting project's userswithrights lists associated with the delted objects
            let collection = that_client.collection('userswithrights_list');
            let search_query = {_id: {$in: usersids_list}};
            return collection.deleteMany(search_query);
        })
        .then(result => {
            //Deleting project's players lists associated with the delted objects
            let collection = that_client.collection('players_list');
            let search_query = {_id: {$in: plid_list}};
            return collection.deleteMany(search_query);
        })
        .then(result => {
            //Deleting the user account from users collection
            let collection = that_client.collection('users');
            let search_query = {_id: user_id};
            return collection.deleteOne(search_query);
        })
        .then(result =>{
            resolve({ok: true, message: 'Successfully deleted the user account'});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}


module.exports.getOwnAndSharedProjects = getOwnAndSharedProjects;
module.exports.findUsersByName = findUsersByName;
module.exports.getUserByUserId = getUserByUserId;
module.exports.updateUserAccountByUserId = updateUserAccountByUserId;
module.exports.deleteUserAccountByUserId = deleteUserAccountByUserId;
