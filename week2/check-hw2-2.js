var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
  if (err) throw err;

  var query = { month_high: { '$exists': true } };

  db.collection('data').count(query, function (err, count) {
    if (err) throw err;
    console.log("Found " + count + " documents that match query.");
    return db.close()
  })

})
