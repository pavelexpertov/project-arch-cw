var user_list_ops = require('../db/users_list_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();

/*returns users list*/
router.get('/users_list/:list_id', (req, res) => {
    let list_id = req.param('list_id');
    user_list_ops.getUsersListByListIdQ(list_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

/*updates users list*/
router.put('/users_list/:list_id', (req, res) => {
    let list_id = req.param('list_id');
    user_list_ops.updateUsersListByListIdQ(list_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

/*returns user's project rights from users list*/
router.get('/users_list/:list_id/rights/:user_id', (req, res) => {
    let user_id = req.param('user_id');
    let list_id = req.param('list_id');
    user_list_ops.getUserRightByUserIdAndUsersListIdQ(list_id, user_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

module.exports = router;
