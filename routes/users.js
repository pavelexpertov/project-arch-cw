var users_ops = require('../db/users_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

/*Returns an object that contains two lists:
one for projects that the user owns
and the one that the users has been shared with
*/
router.get('/:id/projects', (req, res) => {
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
router.get('/:name', (req, res) => {
  let name = req.param('name');
  users_ops.findUsersByName(name)
  .then(resultJson => {
    res.json(resultJson);
  })
  .catch(err => handleError(err, res));
});

/*Returns a user json doc from the database*/
router.get("/id/:user_id", (req, res) => {
  let user_id = req.param('user_id');
  users_ops.getUserByUserId(user_id)
  .then(user_doc => res.json(user_doc))
  .catch(err => handleError(err, res));
})

/*Update user's details*/
router.put("/id/:user_id", (req, res) => {
  let user_id = req.param('user_id');
  let user_doc = req.body;
  users_ops.updateUserAccountByUserId(user_id, user_doc)
  .then(result = res.json(result))
  .catch(err => handleError(err, res));
})

/*Delete user account*/
router.delete("/id/:user_id", (req, res) => {
  let user_id = req.param('user_id');
  users_ops.deleteUserAccountByUserId(user_id)
  .then(result => res.json(result))
  .catch(err => handleError(err, res));
})



module.exports = router;
