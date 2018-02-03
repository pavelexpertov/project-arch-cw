/*Purpose of the file is to contain functions responsible for
router that are responsible for the project creation*/

var projects_ops = require('../db/projects_ops');
var handleError = require('./error_handler');
var getMiddlewareValidator = require('../util/json_validator');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

/*Schema for the put http method for /:projectid*/
let project_put_schema = {
    id: "project_schema",
    type: 'object',
    properties: {
        project_title: { type: "string", minLength: 1 },
        main_description: { type: "string" },
        opposition_team: { type: "string", minLength: 1 },
        match_start_date: { type: "string", minLength: 1 },
        trip_start_date: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
    required: ['project_title', 'main_description', 'opposition_team', 'match_start_date', 'trip_start_date']
}
/*Schema for the post http method for /:projectid*/
let project_post_schema = JSON.parse(JSON.stringify(project_put_schema));
project_post_schema.properties.user_id = { type: "string", minLength: 24, maxLength: 24 };
project_post_schema.required.push('user_id')

//Create a new project
router.post('/', getMiddlewareValidator(project_post_schema), (req, res) => {
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

router.put('/:projectid', getMiddlewareValidator(project_put_schema), (req, res) => {
    let project_id = req.param('projectid');
    let project = req.body;
    projects_ops.updateProjectByProjectIdQ(project_id, project)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

router.delete('/:projectid', (req, res) => {
    let project_id = req.param('projectid');
    projects_ops.deleteProjectByProjectId(project_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
})

module.exports = router;
