
db.posts.aggregate([
  {
    $unwind: "$comments"
  }
  ,
  {
    $group: {
      _id: "$comments.author",
      number_comments: { "$sum": 1 }
    }
  },
  {
    $sort: {
      number_comments: -1
    }
  },
  {
    $limit: 1
  }
])
