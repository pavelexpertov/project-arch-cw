var to_do_list_ops = require('../db/to_do_list_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();

/*Return a to do list doc*/
router.get('/:todo_list_id', (req, res) => {
    let todo_list_id = req.param("todo_list_id");
    to_do_list_ops.getToDoListByListIdQ(todo_list_id)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

router.put('/:todo_list_id', (req, res) => {
    let todo_list_id = req.param('todo_list_id');
    let list = req.body;
    to_do_list_ops.updateToDoListByListIdQ(todo_list_id, list)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

module.exports = router;
