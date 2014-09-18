var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27018,localhost:27019,localhost:27020/course?w=1", function(err, db) {
    if (err) throw err;

    // Write concern of one
    db.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;
        console.log(doc);

        // Write concern of two
        db.collection("repl").insert({ 'x' : 2 }, { 'w' : 2 }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
            db.close();
        });
    });
});
