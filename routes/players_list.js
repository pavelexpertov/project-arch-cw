var players_ops = require('../db/players_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var getMiddlewareValidator = require('../util/json_validator');
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);


//Returns a players list with full details about players
//based on project id.
router.get('/:projectid', (req, res) => {
    let project_id = req.param('projectid');
    players_ops.findPlayerListByPlayersListIdQ(project_id)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

let player_list_schema = {
    "id": "player_list_schema",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            _id: { type: "string", minLength: 24, maxLength: 24}
        },
        additionalProperties: false,
        required: ['_id']
    }
}

//Updates a players list based on provided list id
router.put('/:listid', getMiddlewareValidator(player_list_schema), (req, res) => {
   let list_id = req.param('listid');
   let list_to_update = req.body;
   players_ops.updatePlayerListByPlayerListIdQ(list_id, list_to_update)
   .then(result => {
        res.json(result);
   })
   .catch(err => handleError(err, res));
});

module.exports = router;
