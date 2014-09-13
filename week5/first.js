
db.zips.aggregate([
  {
    "$group": {
      "_id": { state: "$state", city: "$city" },
      "population": { "$sum": "$pop" },
    }
  },
  {
    "$sort": {
      "_id.state": 1, "population": -1
    }
  },
  {
    "$group": {
      "_id": "$_id.state",
      "city": { "$first": "$_id.city" },
      "population": { "$first": "$population" }
    }
  },
  {
    "$sort": {
      // "population": -1
      "_id": 1
    }
  }
])
