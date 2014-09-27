var MongoClient = require('mongodb').MongoClient

var deleteImage = function (db, image_id, callback) {
  var doc = { _id: image_id }

  db.collection('images').remove(doc, function (err, numberOfRemoved) {
    if (err)
      return callback(err)
    else
      return callback(null, numberOfRemoved)
  })
}

MongoClient.connect('mongodb://localhost:27017/photos', function (err, db) {
  if (err)
    throw err

  db.collection('images').find({}, { _id: true }).toArray(function (err, docs) {
    if (err) { throw err }

    docs.forEach(function (doc, index) {

      var image_id = doc._id
      db.collection('albums').find({images: image_id}).count(function (err, count) {
        if (err) { throw err }

        if (doc == null)
          return db.close()

        console.log("image: " + image_id + ", count: " + count)

        // 27 is an orphan
        if (count == 0) {
          console.log("image " + image_id + " is an orphan")
          deleteImage(db, image_id, function (err, num) {
            if (err) { throw err }
            console.log("deleted " + num + " documents")
          })
        }

      })

    })

  })

})

