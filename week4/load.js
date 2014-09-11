var MongoClient = require('mongodb').MongoClient
var fs = require('fs')

var emptyPlacesCollection = function (db, cb) {
  db.collection('places').remove(cb)
}

MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
  if (err)
    throw err

  emptyPlacesCollection(db, function (err, numRemoved) {
    if (err)
      throw err
    console.log("removed " + numRemoved + " documents")
  })

  var places = JSON.parse(fs.readFileSync('places.json').toString())
  var cb_count = 0

  places.forEach(function (place) {
    var doc = {
      name: place.name,
      location: [ place.x, place.y ]
    }

    db.collection('places').insert(doc, function (err, inserted) {
      if (err)
        throw err
      console.log("inserted " + inserted.length)
      if (++cb_count == places.length) {
        return db.close();
      }

    })

  })

  return;
})
