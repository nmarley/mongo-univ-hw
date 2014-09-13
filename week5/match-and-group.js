
db.zips.aggregate([
  {
    "$match": {
      "state": "CA"
    }
  },
  {
    "$group": {
      "_id": "$city",
      "population": { "$sum": "$pop" },
      "zip_codes": { "$addToSet": "$_id" }
    }
  }
])
