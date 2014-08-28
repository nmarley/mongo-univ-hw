var MongoClient = require('mongodb').MongoClient;


var setMonthHigh = function (db, document_id, callback) {
  var query = { _id: document_id };
  var op = { '$set': { month_high: true } };

  db.collection('data').update(query, op, function (err, updated) {
    if (err)
      return callback(err);
    console.dir("Updated doc " + document_id + " with " + updated)
    return callback(null, updated)
  })
};

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
  if (err) throw err;

  var query = {};
  var projection = {"State": true, "Temperature": true};
  var curr_state = '';

  db.collection('data').find(query, projection).sort([["State", 1], ["Temperature", -1]]).each(function (err, doc) {
    if (err) throw err;

    if (doc == null) {
      return db.close();
    }

    // console.dir(doc)

    if (curr_state != doc.State) {
      // console.log("found new state with doc id " + doc._id)
      setMonthHigh(db, doc._id, function (err, updated) {
        if (err) throw err;
        // console.log("updated doc " + doc._id)
      })
    }
    curr_state = doc.State;
  })

})
