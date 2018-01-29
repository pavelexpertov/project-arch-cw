var assert = require('chai').assert;
var projects_ops = require('../db/projects_ops');

var test_project_id = "5a5d9efe65cf041ad72321e8"
var test_false_project_id = "5a5d9efe65cf041ad7231234"


suite("getProjectByProjectIdQ database function", () => {
    test("Get a project doc successfully", () => {
        return projects_ops.getProjectByProjectIdQ(test_project_id)
        .then(function(resultDoc) {
            assert.equal(test_project_id, resultDoc._id, "The project ID doesn't match")
            assert.hasAllKeys(resultDoc, ['_id', 'user_id', 'project_title', 'main_description', 'opposition_team', 'match_start_date', 'trip_start_date', 'todo_list_id', 'players_list_id', 'userswithrights_list_id'])
        })
    })
    test("Get a project doc unsuccessfully", () => {
        return projects_ops.getProjectByProjectIdQ(test_false_project_id)
        .catch(function(err) {
            assert.equal(404, err.code, "Error code is not the same")
            assert.equal("Project wasn't found by the id of " + test_false_project_id,
                         err.message, "The error message is not the same.")
        })
    })
})

var original_project;
var test_project_dummy_update = {
    project_title: "test_title",
    main_description: "test_description",
    opposition_team: "test_opp_team",
    match_start_date: "test_match_date",
    trip_start_date: "test_trip_date"
}


suite("updateProjectByProjectIdQ database function", () => {
    before("Backing one project before it gets updated", () => {
        projects_ops.getProjectByProjectIdQ(test_project_id)
        .then(resultDoc => {
            let doc = {
                project_title: resultDoc.project_title,
                main_description: resultDoc.main_description,
                opposition_team: resultDoc.opposition_team,
                match_start_date: resultDoc.match_start_date,
                trip_start_date: resultDoc.trip_start_date
            }
            original_project = doc;
        })
    })
    test("Update a project successfully", () => {
        return projects_ops.updateProjectByProjectIdQ(test_project_id, test_project_dummy_update)
        .then(function(result) {
            assert.isTrue(result.ok, "The ok flag variable is not true")
            assert.equal("Successfully updated the project", result.message, "The message does not match.")
            return projects_ops.getProjectByProjectIdQ(test_project_id)
        })
        .then(function(resultDoc) {
            assert.equal(resultDoc.project_title, test_project_dummy_update.project_title, "Project titles don't match")
            assert.equal(resultDoc.main_description, test_project_dummy_update.main_description, "Main descriptions don't match")
            assert.equal(resultDoc.opposition_team, test_project_dummy_update.opposition_team, "opposition teams don't match")
            assert.equal(resultDoc.match_start_date, test_project_dummy_update.match_start_date, "Match start dates don't match")
            assert.equal(resultDoc.trip_start_date, test_project_dummy_update.trip_start_date, "trip start dates don't match")
            //assert.equal(resultDoc.trip_start_date, "blah blah", "trip start dates don't match")
        })
    })
    test("Update a project unsuccessfully", () => {
        return projects_ops.updateProjectByProjectIdQ(test_false_project_id, test_project_dummy_update)
        .catch(err => {
            console.log("message", err)
            //assert.equal("dfdf", err.message, "Error message does not match")
            assert.isTrue(err, "It's not false but it's a test " + err)
        })
    })
    after("Restoring the project after testing", () => {
        projects_ops.updateProjectByProjectIdQ(test_project_id, original_project)
    })
})