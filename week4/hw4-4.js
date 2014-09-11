var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/m101', function (err, db) {
  if (err)
    throw err

  var query = {ns: 'school2.students'}
  var fields = { _id: false, millis: true }
  var options = { sort: [['millis', 'desc']], limit: 1 }

  db.collection('profile').find(query, fields, options).each(function (err, doc) {
    if (err)
      throw err;

    if (doc == null)
      return db.close()

    console.log(doc.millis)
  })

})
