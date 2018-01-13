var dbops = require('../db/projects_ops');

//function insertNewProject(project_title, main_description, opposition_team, match_start_date, trip_start_date){
dbops.insertNewProjectQ("5a5a94ba27306119109fa0b2", "title of project", "some descr", "arsenal", "28-01-94", "28-01-18")
.then(result => console.log(result), err => console.log(err));