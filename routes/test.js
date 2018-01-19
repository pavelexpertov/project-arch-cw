/*The purpose of the file is to contain a single event handler 
for '/test' path so that I can test the connectivity easily between
front end and backend.*/

var express = require('express');
var user_session = require('../util/user_session');
var router = express.Router();

router.use(user_session.checkUserIdSessionMiddleware);

router.get('/', function(req, res) {
    res.json({message: "The request has been received!"});
});

module.exports = router;