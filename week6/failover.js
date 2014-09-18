var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27018,localhost:27019,localhost:27020/course", function(err, db) {
    if (err) throw err;

    var documentNumber = 0;
    function insertDocument() {

        db.collection("repl").insert({ 'documentNumber' : documentNumber++ }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
        });

        console.log("Dispatched insert");
        setTimeout(insertDocument, 1000);
    }

    insertDocument();
});
