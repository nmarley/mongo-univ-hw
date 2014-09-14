// use agg

// Hint: The answer for CT and NJ (using this data set) is 38177.

// "population": { "$sum": "$pop" },
// "zip_codes": { "$addToSet": "$_id" }
// state: { $in: [ 'CT', 'NJ' ] },

db.zips.aggregate([
  {
    $match: {
      state: { $in: [ 'CA', 'NY' ] },
      pop: { $gt: 25000 }
    }
  },
  {
    $group: {
      _id: { 'state': '$state', 'city': '$city' },
      population: { "$sum": '$pop' }
    }
  },
  {
    $group: {
      _id: 'average population',
      average: { '$avg': "$population" }
    }
  }
])
