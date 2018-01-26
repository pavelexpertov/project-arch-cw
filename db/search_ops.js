/* the purpose of the file is to contain operations to perform searches
*/

var Q = require('q');
var mongodb = require('./mongo_db');
var players_ops = require('./players_ops')
var assert = require('assert');

/* Returns a list of projects based on a search query.*/
function performSearchQueryQ(search_query, search_criteria, include_date, start_date, end_date){
    let that_client;
    return Q.Promise((resolve, reject) => {
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            //Searching for projects based on include_date flag
            if(include_date){
                return getProjectsByDateRange(that_client, start_date, end_date);
            }
            else {
                let collection = client.collection('projects');
                return collection.find({}).toArray();
            }
        })
        .then(projectsArray => {
            if(projectsArray === null){
                console.log("empty result for projectsArray");
                projectsArray = [];
            }
            //Decide what to search upon
            if(search_criteria === 'player')
                return getProjectsByPlayerName(projectsArray, search_query);
            else if(search_criteria === 'team')
                return getProjectsByOppositionTeam(projectsArray, search_query);
            else
                reject({err: 500, message: "Search criteris isn't specified at all or incorrectly"});
        })
        .then(projectsArray => {
            if(projectsArray === null) reject({err: 500, message: "the end result is empty"});
            resolve(projectsArray);
        })
        .catch(err => reject(err))
        .finally(() => that_client.close())
        .done();
    });
}

function getProjectsByDateRange(mongo_client, start_date, end_date){
    return Q.Promise((resolve, reject) => {
        let search_query = {match_start_date: {$gte: start_date, $lte: end_date}}
        let collection = mongo_client.collection('projects');
        collection.find(search_query).toArray()
        .then(resultArray => {
            if(resultArray === null){
                console.log("detected null value");
                resultArray = [];
            }
            resolve(resultArray);
        })
        .catch(err => reject(err));
    });
}

function getProjectsByPlayerName(projects_list, player_name){
    return Q.Promise((resolve, reject) => {
        //get a list of players_lists from a given list of projects_lists
        let promises_list = [];
        let length = projects_list.length;
        for(var i = 0; i < length; ++i){
            let pl_id = projects_list[i].players_list_id;
            promises_list.push(players_ops.findPlayerListByPlayersListIdQ(pl_id.toHexString()));
        }
        Q.all(promises_list)
        .then(playersListArray => {
            //p_list is a projects_list so it doesn't collide with the parameter of the same name.
            let p_list = [];
            let length = playersListArray.length;
            //For each players list
            for(var i = 0; i < length; ++i){
                let players_list_doc = playersListArray[i];
                let list = players_list_doc.players_list;
                let length = list.length;
                //For each player in the players list
                for(var j = 0; j < length; ++j){
                    let name = list[j].name.toLowerCase();
                    if(name.includes(player_name.toLowerCase())){
                        let project_id = players_list_doc.project_id;
                        let length = projects_list.length;
                        //For each project in a list that was provided as an argument
                        for(var k = 0; k < length; ++k){
                            let project = projects_list[k];
                            if(project._id.equals(project_id)){
                                p_list.push(project);
                                break;
                            }
                        }
                    }
                }
            }
            //making a unique list of projects
            let projects_set = new Set(p_list);
            let l = Array.from(projects_set);
            resolve(l);
        })
        .catch(err => reject(err));
    });
}

function getProjectsByOppositionTeam(projects_list, op_team_name){
    return Q.Promise((resolve, reject) => {
        let filtered_project_list = [];
        let length = projects_list.length;
        for(var i = 0; i < length; ++i){
           let project = projects_list[i];
           if(project.opposition_team.toLowerCase().includes(op_team_name.toLowerCase()))
                filtered_project_list.push(project);
        }
        resolve(filtered_project_list);
    });
}

exports.performSearchQueryQ = performSearchQueryQ;