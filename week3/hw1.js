var MongoClient = require('mongodb').MongoClient
var util = require('util')

var remove_all_lowest_scores = function (db, lowest_scores, callback) {
  var keys = Object.keys(lowest_scores);
  var cb_count = 0;

  keys.forEach(function (key) {
    var student_id = +key;
    var score = lowest_scores[student_id]

    var query = { _id: student_id }
    var value = { type: 'homework', score: score }
    var operator = { '$pull': { scores: value } }

    db.collection('students').update(query, operator, {justOne: true}, function (err, updated) {
      if (err) { return callback(err) }
      if (++cb_count == keys.length) {
        return callback(null)
      }
    })
  })
}

MongoClient.connect('mongodb://localhost:27017/school', function (err, db) {
  if (err)
    throw err

  var lowest_scores = {}

  db.collection('students').find({}).each(function (err, doc) {
    if (err)
      throw err

    if (doc == null) {
      return remove_all_lowest_scores(db, lowest_scores, function (err, data) {
        if (err) { throw err }
        return db.close();
      })
    }

    var lowest;
    doc.scores.forEach(function (mark) {
      if (mark.type !== 'homework')
        return;
      lowest = lowest || mark.score;
      lowest = (mark.score < lowest) ? mark.score : lowest;
      lowest_scores[doc._id] = lowest;
    })

  })
})
