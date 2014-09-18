var MongoClient = require('mongodb').MongoClient;
    ReadPreference = require('mongodb').ReadPreference;

MongoClient.connect("mongodb://localhost:27018,localhost:27019,localhost:27020/course?readPreference=secondary", function(err, db) {
    if (err) throw err;

    db.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;
        console.log(doc);
    });

    function findDocument() {

        //db.collection("repl").findOne({ 'x' : 1 }, { 'readPreference' : ReadPreference.PRIMARY }, function(err, doc) {
        db.collection("repl").findOne({ 'x' : 1 }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
        });

        console.log("Dispatched find");
        setTimeout(findDocument, 1000);
    }

    findDocument();
});
