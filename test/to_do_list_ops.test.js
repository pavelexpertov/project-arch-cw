var assert = require('chai').assert;
var to_do_list_ops = require('../db/to_do_list_ops');

let test_todo_list_id = "5a5d9efe65cf041ad72321e9"
let test_false_todo_list_id = "5a5d9efe65cf041ad7231234"

suite("getToDoListByIdQ database function", function() {
    test("Successful todo list retrieval", () => {
        return to_do_list_ops.getToDoListByListIdQ(test_todo_list_id)
        .then(result => {
            assert.hasAllKeys(result, ['_id', 'project_id', 'todo_list'], "The result object doesn't have required keys")
            let list = result.todo_list
            let length = list.length
            assert.isAtLeast(length, 1, "The todo_list doc needs to have some todo entries for testing purposes")
            for(var i = 0; i < length; ++i)
                assert.hasAllKeys(list[i], ['title', 'completed', 'date', 'id', 'user_id'], "Certain keys don't exist in one of the todo entries within a todo list")
        })
    })
    test("Unsuccessful todo list retrieval", function() {
        return to_do_list_ops.getToDoListByListIdQ(test_false_todo_list_id)
        .then(result => {
            assert.isTrue(true, "The promise was not supposed to successfully resolve/pass the result successfully. It's supposed to reach the catch's promise")
        })
        .catch(err => {
            assert.equal(err.code, 404, "The error code do not look the same")
            assert.equal(err.message, "The to do list couldn't be found", "The error message does not match")
        })
    })
})