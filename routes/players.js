var players_ops = require('../db/players_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();

/*Returns a list of players based on a search query*/
router.get('/players/:name', (req, res) => {
   let name = req.param('name');
   players_ops.findPlayersByNameQ(name)
   .then(result => {
       res.json(result);
   })
   .catch(err => handleError(err, res));
});

//Returns a players list with full details about players
//based on project id.
router.get('/players_list/:projectid', (req, res) => {
    let project_id = req.param('projectid');
    players_ops.findPlayerListByPlayersListIdQ(project_id)
    .then(result => {
        res.json(result);
    })
    .catch(err => handleError(err, res));
});

//Updates a players list based on provided list id
router.put('/players_list/:listid', (req, res) => {
   let list_id = req.param('listid');
   let list_to_update = req.body;
   players_ops.updatePlayerListByPlayerListIdQ(list_id, list_to_update)
   .then(result => {
        res.json(result);
   })
   .catch(err => handleError(err, res));
});

module.exports = router;
