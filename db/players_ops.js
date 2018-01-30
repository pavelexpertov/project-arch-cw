var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const players_collection_name = 'players';
const players_list_collection_name = 'players_list';

/*Returns a list of players jsons based on
name search query*/
function findPlayersByNameQ(name){
    let that_client;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(players_collection_name);
            let search_query = {name: {$regex: name, $options: 'i'}};
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            if(resultArray === null){
                console.log("Looks like an empty array \n" + resultArray);
                resultArray = [];
            }
            resolve({list: resultArray});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

/*Return a list of the players based on list id*/
function findPlayerListByPlayersListIdQ(project_id){
    let that_client;
    let result_doc;
    project_id = mongodb.generateObject(project_id);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Get a list of ids from the document
            let collection = client.collection(players_list_collection_name);
            let search_query = {_id: project_id};
            return collection.findOne(search_query);
        })
        .then(resultDoc => {
            if(resultDoc === null) reject({code: 404, message: "The player list is not found by this id of " + project_id.valueOf()});
            result_doc = resultDoc;
            //Get a list of players with full details
            let player_id_list = resultDoc.players_list;
            let length = player_id_list.length;
            for(var index = 0; index < length; ++index){
                player_id_list[index] = player_id_list[index]._id;
            }
            let collection = that_client.collection(players_collection_name);
            let search_query = {_id: {$in: player_id_list}};
            return collection.find(search_query).toArray();
        })
        .then(resultArray => {
            if(resultArray === null){
                console.log("Looks like an empty array \n" + resultArray)
                resultArray = [];
            }
            result_doc.players_list = resultArray;
            resolve(result_doc);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

/*Update the list of players based on the player_list_id
*/
function updatePlayerListByPlayerListIdQ(players_list_id, players_list){
    let that_client;
    players_list_id = mongodb.generateObject(players_list_id);
    //console.log("before", players_list);
    for(var index = 0; index < players_list.length; ++index)
        players_list[index]._id = mongodb.generateObject(players_list[index]._id)
    //console.log("after",players_list);
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let collection = client.collection(players_list_collection_name);
            //Generate a query and then update the list
            let search_query = {_id: players_list_id};
            let update_query = {$set: {players_list: players_list}};
            return collection.findOneAndUpdate(search_query, update_query);
        })
        .then(result => {
            if(result.value === null) reject({code: 404, message: "Player list of " + players_list_id.toHexString() + " is not found"})
            resolve({ok: true, message: "succesfully updated"});
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done()
    });
}

module.exports.findPlayersByNameQ = findPlayersByNameQ;
module.exports.findPlayerListByPlayersListIdQ = findPlayerListByPlayersListIdQ;
module.exports.updatePlayerListByPlayerListIdQ = updatePlayerListByPlayerListIdQ;
