var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
  if (err)
    throw err

  db.collection('hw4zips').find({}, {_id: false, city: true}).each(function (err, doc) {
    if ( doc == null )
      return db.close()

    console.log(doc.city)
  })
})
