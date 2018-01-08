var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res, next) {
  let absolutePath = path.join(__dirname, 'dist/index.html');
  res.sendFile(absolutePath);
});
module.exports = router;
