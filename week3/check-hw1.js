var MongoClient = require('mongodb').MongoClient

var lookupLastStudent = function (db, callback) {
  db.collection('students').findOne({_id: 100}, function (err, doc) {
    if (err)
      return callback(err);
    console.log(doc)
    return callback(null)
  })
}

MongoClient.connect('mongodb://localhost:27017/school', function (err, db) {
  if (err)
    throw err

  db.collection('students').count(function (err, count) {
    if (err)
      throw err
    console.log("count = " + count)

    lookupLastStudent(db, function (err) {
      if (err)
        throw err;
      return db.close();
    })
  })


})
