/*The purpose of the file is to contain 
a factory function to make a middleware 
function that checks request's body against
a given validation schema*/

var Validator = require('jsonschema').Validator;

function getMiddlewareValidator(user_schema){
    let validator = new Validator();
    return function(req, res, next){
        let json_body = req.body;
        let error_list = validator.validate(json_body, user_schema).errors;
        let length = error_list.length;
        if(length === 0)
            next();
        else {
            let error_message = [];
            for(var i = 0; i < length; ++i){
                error_message.push(error_list[i].stack)
            }
            error_message = error_message.join('\n');
            res.status(400).send(error_message);
        }
    }
}

module.exports = getMiddlewareValidator;