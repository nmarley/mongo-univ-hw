


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
This one --> 44,822

# ==

### Final: Question 8

Suppose you have a three node replica set. Node 1 is the primary. Node 2 is a secondary, Node 3 is a secondary running with a delay of two hours. All writes to the database are issued with w=majority and j=1 (by which we mean that the getLastError call has those values set).

A write operation (could be insert or update) is initiated from your application using the Node.js driver at time=0. At time=5 seconds, the primary, Node 1, goes down for an hour and node 2 is elected primary. Note that your write operation has not yet returned at the time of the failure. Note also that although you have not received a response from the write, it has been processed and written by Node 1 before the failure. Node 3, since it has a slave delay option set, is lagging.

Will there be a rollback of data on Node 1 when Node 1 comes back up? Choose the best answer.

Yes, always
No, never
Maybe, it depends on whether Node 3 has processed the write
(OK) Maybe, it depends on whether Node 2 has processed the write

# ==

### Final: Question 9

Imagine an electronic medical record database designed to hold the medical records of every individual in the United States. Because each person has more than 16MB of medical history and records, it's not feasible to have a single document for every patient. Instead, there is a patient collection that contains basic information on each person and maps the person to a patient_id, and a record collection that contains one document for each test or procedure. One patient may have dozens or even hundreds of documents in the record collection.

We need to decide on a shard key to shard the record collection. What's the best shard key for the record collection, provided that we are willing to run inefficient scatter-gather operations to do infrequent research and run studies on various diseases and cohorts? That is, think mostly about the operational aspects of such a system. And by operational, we mean, think about what the most common operations that this systems needs to perform day in and day out.

# ==

### Final: Question 10


# ==
