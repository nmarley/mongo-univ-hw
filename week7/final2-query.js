
use enron;

db.messages.aggregate([
  {
    $unwind: "$headers.To"
  },
  {
    $group: {
      _id: {
        id: "$headers.Message-ID", from: "$headers.From", to: "$headers.To"
      }
    }
  },
  {
    $group: {
      _id: { from: "$_id.from", to: "$_id.to" },
      count: { "$sum": 1 }
    }
  },
  {
    $sort: {
      "count": -1
    }
  }, { $limit: 5 }
], {allowDiskUse: true})

