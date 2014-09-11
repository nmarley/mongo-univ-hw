var MongoClient = require('mongodb').MongoClient
var fs = require('fs')

MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
  if (err)
    throw err

  var text = fs.readFileSync('pg5.txt').toString()
  var cb_count = 0

  var doc = {
    name: 'THE CONSTITUTION OF THE UNITED STATES OF AMERICA',
    date: '1787',
    text: text
  }

  db.collection('documents').insert(doc, function (err, inserted) {
    if (err)
      throw err
    console.log("inserted " + inserted.length)
    if (++cb_count == 1) {
      return db.close();
    }
  })

  return;
})
