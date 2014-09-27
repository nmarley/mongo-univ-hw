


### Final: Question 5

Suppose your have a collection fubar with the following indexes created:

```javascript
[
  {
    "v" : 1,
    "key" : {
      "_id" : 1
    },
    "ns" : "test.fubar",
    "name" : "_id_"
  },
  {
    "v" : 1,
    "key" : {
      "a" : 1,
      "b" : 1
    },
    "ns" : "test.fubar",
    "name" : "a_1_b_1"
  },
  {
    "v" : 1,
    "key" : {
      "a" : 1,
      "c" : 1
    },
    "ns" : "test.fubar",
    "name" : "a_1_c_1"
  },
  {
    "v" : 1,
    "key" : {
      "c" : 1
    },
    "ns" : "test.fubar",
    "name" : "c_1"
  },
  {
    "v" : 1,
    "key" : {
      "a" : 1,
      "b" : 1,
      "c" : -1
    },
    "ns" : "test.fubar",
    "name" : "a_1_b_1_c_-1"
  }
]
```

Now suppose you want to run the following query against the collection.

```javascript
db.fubar.find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1})
```

Which of the following indexes could be used by MongoDB to assist in answering the query? Check all that apply.

#### Answers:

1. a_1_b_1
1. c_1

# ==

### Final: Question 6

Suppose you have a collection of students of the following form:

```javascript
{
  "_id" : ObjectId("50c598f582094fb5f92efb96"),
  "first_name" : "John",
  "last_name" : "Doe",
  "date_of_admission" : ISODate("2010-02-21T05:00:00Z"),
  "residence_hall" : "Fairweather",
  "has_car" : true,
  "student_id" : "2348023902",
  "current_classes" : [
    "His343",
    "Math234",
    "Phy123",
    "Art232"
  ]
}
```

Now suppose that basic inserts into the collection, which only include the last name, first name and student_id, are too slow (we can't do enough of them per second from our program). What could potentially improve the speed of inserts. Check all that apply.

#### Answers:

(OK) Remove all indexes from the collection
(OK) Set w=0, j=0 on writes


# ==

### Final: Question 7

You have been tasked to cleanup a photosharing database. The database consists of two collections, albums, and images. Every image is supposed to be in an album, but there are orphan images that appear in no album. Here are some example documents (not from the collections you will be downloading).

```javascript
> db.albums.findOne()
{
  "_id" : 67
  "images" : [
    4745,
    7651,
    15247,
    17517,
    17853,
    20529,
    22640,
    27299,
    27997,
    32930,
    35591,
    48969,
    52901,
    57320,
    96342,
    99705
  ]
}

> db.images.findOne()
{ "_id" : 99705, "height" : 480, "width" : 640, "tags" : [ "dogs", "kittens", "work" ] }

```

From the above, you can conclude that the image with _id = 99705 is in album 67. It is not an orphan.

Your task is to write a program to remove every image from the images collection that appears in no album. Or put another way, if an image does not appear in at least one album, it's an orphan and should be removed from the images collection.

Download and unzip Final7.zip and use mongoimport to import the collections in albums.json and images.json.

When you are done removing the orphan images from the collection, there should be 89,737 documents in the images collection. To prove you did it correctly, what are the total number of images with the tag 'kittens" after the removal of orphans? As as a sanity check, there are 49,932 images that are tagged 'kittens' before you remove the images.

Hint: you might consider creating an index or two or your program will take a long time to run.

49,932
47,678
38,934
45,911
44,822

# ==

### Final: Question 8

