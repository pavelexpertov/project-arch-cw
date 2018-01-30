var assert = require('chai').assert;
var players_ops = require('../db/players_ops');

var test_players_list_id = "5a5d9efe65cf041ad72321ea"
var test_false_players_list_id = "5a5d9efe65cf041ad7231234"

suite("Getting a players list", () => {
    test("Successfully getting the list", () => {
        return players_ops.findPlayerListByPlayersListIdQ(test_players_list_id)
        .then(resultDoc => {
            assert.hasAllKeys(resultDoc, ['_id', 'project_id', 'players_list'])
            let length = resultDoc.players_list.length
            assert.isAtLeast(length, 1, "The players_list needs some entries for testing")
            for(var i = 0; i < length; ++i){
                let player_doc = resultDoc.players_list[i]
                assert.hasAllKeys(player_doc, ['_id', 'name', 'role', 'status'], "The player doc's key don't match: " + player_doc)
            }
        })
    })
    test("Unsuccessfully getting the list", () => {
        return players_ops.findPlayerListByPlayersListIdQ(test_false_players_list_id)
        .then(result => {
            assert.isTrue(false, false, "The then method was supposed to have failed due to needed failure outcome")
        })
        .catch(err => {
            assert.hasAllKeys(err, ['code', 'message'], "The error object doesn't have necessary keys")
            assert.equal(err.code, 404, "The error codes do not match")
            assert.equal(err.message, "The player list is not found by this id of " + test_false_players_list_id, "The error message doesn't match")
        })
    })
})