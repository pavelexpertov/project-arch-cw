/*where $jsonSchema is where you pass the validated json schema*/
db.createCollection("users", {
    validator: {
        $jsonSchema:
    }
})
