var assert = require('chai').assert;
var users_list_ops = require('../db/users_list_ops');

let test_users_list_id = "5a5da2027a05311e0d97abcd"
let test_false_users_list_id = "5a5da2027a05311e0d971234"

suite("getUsersListByListIdQ database function", function() {
    test("Successful users list retrieval", function() {
        return users_list_ops.getUsersListByListIdQ(test_users_list_id)
        .then(result => {
            assert.hasAllKeys(result, ['_id', 'owner_id', 'users_list'], "The doc doesn't have certain key properties")
            let list = result.users_list
            let length = list.length
            assert.isAtLeast(length, 1, "The users list needs to have some user entries for testing purposes")
            for(var i = 0; i < length; ++i){
                let user_doc = list[i]
                assert.hasAllKeys(user_doc, ['_id', 'edit_rights', 'fullname'], "A user doc from users_list doesn't have a certain key property")
                assert.hasAllKeys(user_doc.edit_rights, ['players_list', 'todo_list'], "User doc's edit_rights property doesn't have a certain key property")
            }
        })
    })
    test("Unsuccessful users list retrieval", function() {
        return users_list_ops.getUsersListByListIdQ(test_false_users_list_id)
        .then(result => {
            assert.isTrue(true, "The then's promise was not supposed to be reached since the promise needs to fail for testing purposes")
        })
        .catch(err => {
            assert.equal(err.code, 404, "The error code doesn't match")
            assert.equal(err.message, "To do list couldn't not be found with this id of " + test_false_users_list_id, "The error message doesn't match")
        })
    })
})