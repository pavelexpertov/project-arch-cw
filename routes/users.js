var users_ops = require('../db/users_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

/*Returns an object that contains two lists:
one for projects that the user owns 
and the one that the users has been shared with
*/
router.get('/users/:id/projects', (req, res) => {
  let user_id = req.param("id");
  users_ops.getOwnAndSharedProjects(user_id)
  .then(json_result => {
    res.json(json_result);
  })
  .catch(err => handleError(err, res));
});

/*Returns a json of users that's been 
searched using a query
*/
router.get('/users/:name', (req, res) => {
  let name = req.param('name');
  users_ops.findUsersByName(name)
  .then(resultJson => {
    res.json(resultJson);
  })
  .catch(err => handleError(err, res));
});

module.exports = router;
