/*Purpose of the file is to contain functions responsible for
router that are responsible for the user authentication and user creation*/

var user_db = require('../db/user_management_auth');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();


router.post('/login', (req, res) => {
    let obj = req.body;
    user_db.isUserLoginValidQ(obj.username, obj.password)
    .then(result => {
        res.json({ok: true, id: result});
    })
    .catch(err => {
        handleError(err, res);
    })
    .done();
});

router.post('/signup', (req, res) => {
    let obj = req.body;
    //console.log(obj);
    let promise = user_db.signUpUserQ(obj.username, obj.password, obj.fullname, obj.job_role);
    promise.then(result => {
        res.json({ok: true});
    })
    .catch(err => {
        handleError(err, res);
    })
    .done();
});

module.exports = router;
