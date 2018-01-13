var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const main_collection_name = 'projects';

Q.longStackSupport = true;

/*Function that posts new project to the database as well as
creating other documents that are relevant to it*/
function insertNewProjectQ(user_id, project_title, main_description, opposition_team, match_start_date, trip_start_date){
    let that_client;
    let project_model = {
        user_id: mongodb.generateObject(user_id),
        project_title: project_title,
        main_description: main_description,
        opposition_team: opposition_team,
        match_start_date: match_start_date,
        trip_start_date: trip_start_date
    };
    let project_id = mongodb.generateObject();
    project_model._id = project_id;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            //Create a new to_do list
            that_client = client;
            let todo_collection = client.collection("todo_lists");
            let todo_model = {project_id: project_id, todo_list: []};
            return todo_collection.insertOne(todo_model);
        })
        .then(result => {
            //console.log(result);
            project_model.todo_list_id = mongodb.generateObject(result.insertedId);
            //return Q.Promise((resolve, reject) => resolve(client));
            return that_client;
        })
        .then(client => {
            //Create a new players_list
            let players_list_collection = client.collection("players_list");
            let players_list_model = {project_id: project_id, players_list: []};
            return players_list_collection.insertOne(players_list_model);
        })
        .then(result => {
            project_model.players_list_id = mongodb.generateObject(result.insertedId);
            return that_client;
            //resolve("It's been successful so far");
        })
        .then(client => {
            //Create new userswithrights_list
            let rightful_user_coll = client.collection('userswithrights_list');
            let ruser_model = {owner_id: project_id, users_list: []};
            return rightful_user_coll.insertOne(ruser_model);
        })
        .then(result => {
            project_model.userswithrights_list_id = mongodb.generateObject(result.insertedId);
            return that_client;
        })
        .then(client => {
            //Inserting the project document itself
            let collection = client.collection(main_collection_name);
            return collection.insertOne(project_model);
        })
        .then(result => {
            resolve(project_model._id.valueOf());
        })
        .catch(err => {
            if(err.code === 121) err.code = 500;
            reject(err);
        })
        .finally(() => that_client.close())
        .done();
    });
}

exports.insertNewProjectQ = insertNewProjectQ;