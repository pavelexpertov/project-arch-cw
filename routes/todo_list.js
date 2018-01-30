var to_do_list_ops = require('../db/to_do_list_ops');
var handleError = require('./error_handler');
var getMiddlewareValidator = require('../util/json_validator');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

/*Return a to do list doc*/
router.get('/:todo_list_id', (req, res) => {
    let todo_list_id = req.param("todo_list_id");
    to_do_list_ops.getToDoListByListIdQ(todo_list_id)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

let todo_schema = {
    id: 'todo_schema',
    type: 'array',
    items: {
        type: 'object',
        properties: {
            title: { type: "string", minLength: 1},
            completed: { type: "boolean" },
            id: { type: "string", minLength: 1 },
            date: { type: "string", minLength: 1 },
            user_id: { type: "string" }
        },
        additionalProperties: false,
        required: ['title', 'completed', 'id', 'date', 'user_id']
    }
}

router.put('/:todo_list_id', getMiddlewareValidator(todo_schema), (req, res) => {
    let todo_list_id = req.param('todo_list_id');
    let list = req.body;
    to_do_list_ops.updateToDoListByListIdQ(todo_list_id, list)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

module.exports = router;
