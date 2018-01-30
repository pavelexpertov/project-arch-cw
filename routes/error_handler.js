/*The purpose of the function is to provide reusability of handling
errors with the database or something else, it can use the response object
to return the error. Basically, if an error passed, the logic would handle the error.

The format of error should be {code: number, message: string}
*/

function handleError(error, response){
        if(error.code)
            response.status(error.code).send(error.message || error.errmessage || error);
        else
            response.status(500).send(error.message || error.errmsg || error);
}

module.exports = handleError;
