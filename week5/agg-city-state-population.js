
db.zips.aggregate([
  {
    "$group": {
      "_id": { city: "$city", state: "$state" },
      "population": { "$sum": "$pop" },
      "zip_codes": { "$addToSet": "$_id" }
    }
  }
])
