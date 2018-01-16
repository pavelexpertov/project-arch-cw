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
            //Getting projects that the user has been shared with
            let collection = client.collection('userswithrights_list');
            let search_query = {users_list: user_id};
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
            let collection = db.collection(collection_name);
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
