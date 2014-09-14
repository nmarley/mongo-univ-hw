use test

db.grades.aggregate([
  {
    $unwind: "$scores"
  },
  {
    $match: {
      "scores.type": { $ne: 'quiz' }
    }
  },
  {
    $group: {
      _id: { student_id: "$student_id", class_id: "$class_id" },
      gpa: { $avg: '$scores.score' }
    }
  },
  {
    $group: {
      _id: "$_id.class_id",
      class_average: { $avg: "$gpa" }
    }
  },
  {
    $sort: {
      class_average: -1
    }
  },
  {
    $limit: 1
  }

])
