var search_ops = require('../db/search_ops');
var handleError = require('./error_handler');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

router.post('/', (req, res) => {
    let json_doc = req.body;
    let search_query = json_doc.search_query;
    let search_criteria = json_doc.search_criteria;
    let include_date = json_doc.include_date;
    let start_date = json_doc.start_date;
    let end_date = json_doc.end_date;
    search_ops.performSearchQueryQ(search_query, search_criteria, include_date, start_date, end_date)
    .then(result => res.send(result))
    .catch(err => handleError(err, res));
});

module.exports = router;