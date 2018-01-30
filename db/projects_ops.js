var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const main_collection_name = 'projects';

//Q.longStackSupport = true;

/*Function that posts new project to the database as well as
creating other documents that are relevant to it.
On successful operation returns id of the project*/
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
            resolve({id: project_model._id.valueOf()});
        })
        .catch(err => {
            if(err.code === 121) err.code = 500;
            reject(err);
        })
        .finally(() => that_client.close())
        .done();
    });
}

function getProjectByProjectIdQ(project_id)
{
    let that_client;
    project_id = mongodb.generateObject(project_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: project_id};
            return collection.findOne(search_query);
        })
        .then(resultDoc => {
            if(resultDoc === null) reject({code: 404, message: "Project wasn't found by the id of " + project_id.toHexString()});
            resolve(resultDoc);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function updateProjectByProjectIdQ(project_id, project){
    let that_client;
    project_id = mongodb.generateObject(project_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(main_collection_name);
            let search_query = {_id: project_id};
            let update_query = {$set: project}
            return collection.findOneAndUpdate(search_query, update_query);
        })
        .then(result => {
            if(result.value === null) reject({code: 404, message: "The project doc of " + project_id.toHexString() + " does not exist"})
            resolve({ok: true, message: "Successfully updated the project"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close());
    });
}


function deleteProjectByProjectId(project_id){
    let that_client;
    project_id = mongodb.generateObject(project_id);
    let todo_list_id;
    let players_list_id;
    let userswithrights_list_id;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Getting the project doc before deleting it.
            let collection = client.collection(main_collection_name);
            let search_query = {_id: project_id};
            return collection.findOne(search_query);
        })
        .then(project => {
            if(project === null) reject({code: 404, message: "The project of " + project_id.toHexString() + " is not found"})
            todo_list_id = project.todo_list_id;
            userswithrights_list_id = project.userswithrights_list_id;
            players_list_id = project.players_list_id
            //Deleting the project
            let collection = that_client.collection(main_collection_name);
            let search_query = {_id: project_id};
            return collection.deleteOne(search_query);
        })
        .then(result => {
            //Deleting project's to do lists associated with the delted objects
            let collection = that_client.collection('todo_lists');
            let search_query = {_id: todo_list_id};
            return collection.deleteOne(search_query);
        })
        .then(result => {
            //Deleting project's userswithrights lists associated with the delted objects
            let collection = that_client.collection('userswithrights_list');
            let search_query = {_id: userswithrights_list_id};
            return collection.deleteOne(search_query);
        })
        .then(result => {
            //Deleting project's players lists associated with the delted objects
            let collection = that_client.collection('players_list');
            let search_query = {_id: players_list_id};
            return collection.deleteOne(search_query);
        })
        .then(result => {
            resolve({ok: true, message: "Deleted the project successfully"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

exports.insertNewProjectQ = insertNewProjectQ;
exports.getProjectByProjectIdQ = getProjectByProjectIdQ;
exports.updateProjectByProjectIdQ = updateProjectByProjectIdQ;
exports.deleteProjectByProjectId = deleteProjectByProjectId;