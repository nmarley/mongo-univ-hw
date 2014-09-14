use test

db.hw4zips.aggregate([
  {
    $project: {
      _id: 0,
      // zip: "$_id",
      first_char: { $substr: ["$city", 0, 1] },
      population: "$pop"
    }
  },
  {
    $match: {
      first_char: { $in: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ] }
    }
  },
  {
    $group: {
      _id: null,
      sum: { $sum: "$population" }
    }
  }
])
