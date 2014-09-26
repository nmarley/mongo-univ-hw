var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');
var program = require('commander');

program['option']('-d, --db [database]', 'Database containing weather data.  Default is \'enron\'', 'enron')['option']('-c, --collection [collection]', 'Collection containing weather data.  Default is \'messages\'', 'messages')['option']('-h, --host [host]', 'MongoDB host to connect to.  Default is \'localhost\'', 'localhost')['option']('-p, --port [port]', 'MongoDB port to connect to.  Default is \'27017\'', 27017).parse(process.argv);

MongoClient.connect('mongodb://' + program['host'] + ':' + program['port'] + '/' + program['db'], function(err, db) {
    if (err) {
        console.log('can\'t connect to MongoDB using: mongodb://' + program['host'] + ':' + program['port'] + '/' + program['db'] + '.  Is it running?');
        throw err;
    };
    var coll = db.collection(program['collection']);

    function validate(cb) {
        var email = 'mrpotatohead@mongodb.com';
        var mesg_id = '<8147308.1075851042335.JavaMail.evans@thyme>';
        coll.find({
            "headers.To": email
        }).count(function(err, count) {
            if (err) {
                console.log('Failed to query MongoDB.  Is it running?');
                throw err;
            };
            if (count < 1) {
                console.log('Sorry, but I could not find ' + email + ' in the headers.To lists');
                return cb(false);
            };
            if (count > 1) {
                console.log('Sorry, but I found ' + email + ' in multiple documents. You should probably re-import the dataset.');
                return cb(false);
            };
            coll.findOne({
                "headers.To": email
            }, function(err, doc) {
                if (err) {
                    console.log('Failed to query MongoDB.  Is it running?');
                    throw err;
                };
                if (!doc || doc === null || typeof doc === 'undefined') {
                    console.log('I thought there was a doc, and then there was none. Are you modifing the dataset while I am running?');
                    return cb(false);
                };
                if (typeof doc['headers'] === 'undefined' || typeof doc['headers']['Message-ID'] === 'undefined') {
                    console.log('Document structure is not correct.  Cannot find "headers.Message-ID" field.');
                    console.log('You should probably re-import the dataset.');
                    console['dir'](doc);
                    return cb(false);
                };
                if (doc['headers']['Message-ID'] != mesg_id) {
                    console.log('Found a document with ' + email + ' but the Message-ID is not correct.');
                    console.log('Message-ID is ', doc['headers']['Message-ID']);
                    return cb(false);
                };
                return cb(true);
            });
        });
    };

    console.log('Welcome to the Final Exam Q3 Checker. My job is to make sure you correctly updated the document');

    validate(function(valid) {
        if (!valid) {
            console.log('Failed Validation: The document was not updated correctly');
            return db.close();
        };
        console.log('Final Exam Q3 Validated successfully!');

        function decrypt(data, key) {
            var algo = 'aes256';
            var decipher = crypto.createDecipher(algo, key);
            var plain = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
            return plain;
        };
        console.log('Your validation code is: ' + decrypt('7591130833c040b942800350627be214973bfc132599d73bafec137e049c5349', '747BeoTScGLdLSV4FdvT'));
        db.close();
    });
});
