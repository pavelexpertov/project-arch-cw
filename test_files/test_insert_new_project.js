var dbops = require('../db/projects_ops');

var user_id = "5a5d9bdd2862cb243a657fe4";
var opposition_team= "chelsea";
var project_title= "going away for chelsea";
var main_description= "blah blah blah";
var match_start_date= "2018-07-22";
var trip_start_date= "2018-07-16";
//function insertNewProject(project_title, main_description, opposition_team, match_start_date, trip_start_date){
//dbops.insertNewProjectQ("5a5a94ba27306119109fa0b2", "title of project", "some descr", "arsenal", "28-01-94", "28-01-18")
dbops.insertNewProjectQ(user_id, project_title, main_description, opposition_team, match_start_date, trip_start_date)
.then(result => console.log(result), err => console.log(err));
