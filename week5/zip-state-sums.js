
// db.zips.aggregate({ $group: { _id: '$state', population: { '$sum': '$pop' } } })

// db.zips.aggregate({ "$group": { "_id": '$state', "population": { '$sum': '$pop' } } })

db.zips.aggregate([{"$group":{"_id":'$state', "population":{'$sum':'$pop'}}}])

