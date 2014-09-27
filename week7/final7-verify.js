

db.albums.aggregate({$unwind:"$images"},{$group:{_id:null,sum:{$sum:"$images"},count:{$sum:1}}})



