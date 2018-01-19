/*Purpose of the file is to contain functions responsible for
router that are responsible for the user authentication and user creation*/

var user_db = require('../db/user_management_auth');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session')


router.post('/login', (req, res) => {
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

router.get('/logout', (req, res) => {
    let auth = user_session.getCredentialsFromRequest(req);
    let user_id = auth.user_id;
    user_session.unregisterUser(user_id);
    res.send("Successful logout");
})

module.exports = router;
