/*A file to perform registering and unregistering users
as well as checking the user authentication using a function
as a middleware*/


/* The list will contain objects in the form 
of {user_id, password} where user_id is the 
id of the user who supplied username and password 
in the first place*/
const logged_in_user_list = [];
//Flag to indicate whether to check for the authentication or not
const toCheckForLogins = true;

function registerUser(user_id, password){
    logged_in_user_list.push({id: user_id, password: password});
}

function unregisterUser(user_id){
    let len = logged_in_user_list.length;
    for(var i = 0; i < len; ++i){
        let user = logged_in_user_list[i];
        if(user.id === user_id){
            logged_in_user_list.splice(i, 1);
            break;
        }
    }
}

function checkUserIdSessionMiddleware(req, res, next){
    if(toCheckForLogins){
        let creds = getCredentialsFromRequest(req);
        let user_id = creds.user_id;
        let password = creds.password;
        let len = logged_in_user_list.length;
        let verifiedFlag = false;
        for(var i = 0; i < len; ++i){
            let user = logged_in_user_list[i];
            if(user.id === user_id){
                if(user.password === password){
                    verifiedFlag = true;
                    next();
                    break;
                }
                else{
                    break;
                }
            }
        }
        if(!verifiedFlag){
            if(user_id === '')
                res.status(403).send("Credentials are not provided");
            else
                res.status(403).send("User not authenticated");
        }
    }
    else
        next();
}

function getCredentialsFromRequest(request){
    try
    {
        let auth = request.get('Authorization')
        let indexOfSpace = auth.indexOf(' ');
        auth = auth.slice(indexOfSpace + 1);
        let indexOfColon = auth.indexOf(':');
        let user_id = auth.slice(0, indexOfColon); 
        let password = auth.slice(indexOfColon + 1);
        return {user_id: user_id, password: password};
    }
    catch(err){
        //console.log(err);
        return {user_id: '', password: ''};
    }
}

module.exports.registerUser = registerUser
module.exports.unregisterUser = unregisterUser
module.exports.checkUserIdSessionMiddleware = checkUserIdSessionMiddleware
module.exports.getCredentialsFromRequest = getCredentialsFromRequest