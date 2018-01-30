/*Purpose of the file is to contain functions responsible for
router that are responsible for the user authentication and user creation*/

var user_db = require('../db/user_management_auth');
var handleError = require('./error_handler');
var getMiddlewareValidator = require('../util/json_validator');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session')

let login_schema = {
    id: 'login_schema',
    type: "object",
    properties: {
        username: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 }
    },
    additionalProperties: false,
    required: ['username', 'password']
}

router.post('/login', getMiddlewareValidator(login_schema), (req, res) => {
    let obj = req.body;
    user_db.isUserLoginValidQ(obj.username, obj.password)
    .then(user_id => {
        user_session.registerUser(user_id.toHexString(), obj.password);
        res.json({ok: true, id: user_id});
    })
    .catch(err => {
        handleError(err, res);
    })
    .done();
});

let signup_schema = {
    id: 'signup_schema',
    type: 'object',
    properties: {
        username: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 },
        job_role: { enum: ["manager", "trainer", "sport_technician"]},
        fullname: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
    required: ['username', 'password', 'job_role', 'fullname']
}

router.post('/signup', getMiddlewareValidator(signup_schema), (req, res) => {
    let obj = req.body;
    let promise = user_db.signUpUserQ(obj.username, obj.password, obj.fullname, obj.job_role);
    promise.then(result => {
        res.json({ok: true});
    })
    .catch(err => {
        handleError(err, res);
    })
    .done();
});

router.get('/logout', (req, res) => {
    let auth = user_session.getCredentialsFromRequest(req);
    let user_id = auth.user_id;
    user_session.unregisterUser(user_id);
    res.send("Successful logout");
})

module.exports = router;
