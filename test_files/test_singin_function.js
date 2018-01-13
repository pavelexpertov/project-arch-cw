var mod = require('../db/user_management_auth');

mod.isUserLoginValidQ("pav", "av")
.then(result => {
    if(result)
        console.log("whoo hooo logged in and the id is " + result);
    else
        console.log("ooops, it didn't work" + result);
})
.catch(error => console.log(error));
