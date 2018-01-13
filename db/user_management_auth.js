var Q = require('q');
var mongodb = require('./mongo_db');
var assert = require('assert');
const collection_name = 'users';


/* Function checks that the login details are correct.
It returns an id of the user if the credentials match.
Otherwise throws an error if a user doesn't exist, or
the password doesn't match.
*/
function isUserLoginValidQ(username, password){
    return Q.Promise(function(resolve, reject){
        let that_client = '';
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            let user_collection = client.collection(collection_name);
            user_collection.findOne({'username':{'$eq':username}}, {fields:{'_id':1, 'password':1}})
            .then((result) => {
                //If nothing returned
                if(!result) reject({code: 404, message: "couldn't find the user"});
                if(result.password === password)
                    resolve(result._id.valueOf());
                else
                    reject({code: 404, message: "couldn't find the password"});
            })
            .catch(error => reject(error))
        })
        .finally(() => that_client.close())
        .done();
    });
}

/*
Inserts a new user into the database.
It returns a boolean of true if the operation was successful.
Throws an error if it hasn't been successful
*/
function signUpUserQ(username, password, full_name, job_role){
    return Q.Promise((resolve, reject) => {
        let that_client = '';
        mongodb.getConnectedMongoClientQ()
        .then(client => {
            that_client = client;
            user_collection = client.collection(collection_name);
            let insertObject = {'username': username, 'password': password, 'fullname': full_name, 'job_role': job_role};
            user_collection.insertOne(insertObject)
            .then(r => {
                assert.equal(1, r.insertedCount, "A document for a user signing up inserted failed to submit");
                resolve(true);
            })
            .catch(err => {
                if(err.code === 121) err.code = 500;
                reject(err);
            });
        })
        .finally(() => that_client.close())
        .done();
    });
}

exports.isUserLoginValidQ = isUserLoginValidQ;
exports.signUpUserQ = signUpUserQ;
