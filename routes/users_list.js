var user_list_ops = require('../db/users_list_ops');
var handleError = require('./error_handler');
var express = require('express');
var getMiddlewareValidator = require('../util/json_validator');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

/*returns users list*/
router.get('/:list_id', (req, res) => {
    let list_id = req.param('list_id');
    user_list_ops.getUsersListByListIdQ(list_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

let users_list_schema = {
    id: "users_list_schema",
    type: "array",
    items: {
        type: "object",
        properties: {
            _id: { type: "string", minLength: 24, maxLength: 24 },
            edit_rights: {
                type: "object",
                properties: {
                    players_list: {type: "boolean"},
                    todo_list: {type: "boolean"}
                },
                additionalProperties: false,
                required: ['players_list', 'todo_list']
            }
        },
        additionalProperties: false,
        required: ['_id', 'edit_rights']
    }
}

/*updates users list*/
router.put('/:list_id', getMiddlewareValidator(users_list_schema), (req, res) => {
    let list_id = req.param('list_id');
    let list = req.body;
    user_list_ops.updateUsersListByListIdQ(list_id, list)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

/*returns user's project rights from users list*/
router.get('/:list_id/rights/:user_id', (req, res) => {
    let user_id = req.param('user_id');
    let list_id = req.param('list_id');
    user_list_ops.getUserRightByUserIdAndUsersListIdQ(list_id, user_id)
    .then(result => res.json(result))
    .catch(err => handleError(err, res));
});

module.exports = router;
