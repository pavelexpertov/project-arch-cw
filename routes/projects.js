/*Purpose of the file is to contain functions responsible for
router that are responsible for the project creation*/

var projects_ops = require('../db/projects_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

//Create a new project
router.post('/', (req, res) => {
    let jbody = req.body;
    let user_id = jbody.user_id;
    let project_title = jbody.project_title;
    let main_description = jbody.main_description;
    let opposition_team = jbody.opposition_team;
    let match_start_date = jbody.match_start_date;
    let trip_start_date = jbody.trip_start_date;
    projects_ops.insertNewProjectQ(user_id, project_title, main_description, opposition_team, match_start_date, trip_start_date)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});


/*Get the project's document based on project id*/
router.get('/:projectid', (req, res) => {
    let project_id = req.param('projectid');
    projects_ops.getProjectByProjectIdQ(project_id)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

router.put('/:projectid', (req, res) => {
    let project_id = req.param('projectid');
    let project = req.body;
    projects_ops.updateProjectByProjectIdQ(project_id, project)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

module.exports = router;
