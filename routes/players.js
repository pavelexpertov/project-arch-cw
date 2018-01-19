var players_ops = require('../db/players_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

/*Returns a list of players based on a search query*/
router.get('/:name', (req, res) => {
   let name = req.param('name');
   players_ops.findPlayersByNameQ(name)
   .then(result => {
       res.json(result);
   })
   .catch(err => handleError(err, res));
});

module.exports = router;
