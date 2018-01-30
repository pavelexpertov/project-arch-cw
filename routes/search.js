var search_ops = require('../db/search_ops');
var handleError = require('./error_handler');
var getMiddlewareValidator = require('../util/json_validator');
var express = require('express');
var router = express.Router();
var user_session = require('../util/user_session');

router.use(user_session.checkUserIdSessionMiddleware);

let search_schema = {
    id: "search_schema",
    type: "object",
    properties: {
        search_query: { type: "string", minLength: 1 },
        //search_criteria: { type: "string", enum: ['player', 'team'] },
        search_criteria: { enum: ['player', 'team'] },
        include_date: { type: "boolean" },
        start_date: { type: "string", minLength: 1 },
        end_date: { type: "string", minLength: 1 }
    },
    additionalProperties: false,
    required: ['search_query', 'search_criteria', 'include_date', 'start_date', 'end_date']
}

router.post('/', getMiddlewareValidator(search_schema), (req, res) => {
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