var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');
var program = require('commander');
var reprimand = 'If you are looking at this then SHAME ON YOU';

program['option']('-d, --db [database]', 'Database containing weather data.  Default is \'blog\'', 'blog')['option']('-c, --collection [collection]', 'Collection containing weather data.  Default is \'posts\'', 'posts')['option']('-h, --host [host]', 'MongoDB host to connect to.  Default is \'localhost\'', 'localhost')['option']('-p, --port [port]', 'MongoDB port to connect to.  Default is \'27017\'', 27017)['parse'](process['argv']);

function getRsStatus(db, callback) {
    console.log('Checking rs.status() output....');
    db = db.db('admin');
    db.command({
        "replSetGetStatus": 1
    }, callback);
};

function getRsConfiguration(db, callback) {
    console.log('Checking contents of local.system.replset collection....');
    var _0xb3c2x9 = db.db('local');
    _0xb3c2x9.collection('system.replset').findOne(callback);
};

function replSetRunning(db, 3, callback) {
    getRsStatus(db, function(err, status) {
        if (err) {
            console.log('Can\'t query MongoDB replica set status.  Are you connecting to a running node?');
            console.log('Got error: ' + err.msg);
            return callback(false);
        };
        if (status['ok'] != 1) {
            console.log('Sorry, ok is not 1 for rs.status()');
            console.log('Here is what I get:');
            console.dir(status);
            return callback(false);
        };
        getRsConfiguration(db, function(err, status) {
            if (err) {
                console.log('Can\'t query MongoDB replica set configuration.  Are you connecting to a running node?');
                console.log('Got error: ' + err.msg);
                return callback(false);
            };
            if (status.members.length != 3) {
                console.log('Sorry, there need to be three members of the replica set.');
                console.log('here is the menbers array I see');
                console.dir(status.members);
                return callback(false);
            };
            console.log('Looks good. Replica set with three nodes running');
            return callback(true);
        });
    });
};

MongoClient.connect('mongodb://' + program['host'] + ':' + program['port'] + '/' + program['db'], function(err, db) {
    if (err) {
        console.log('can\'t connect to MongoDB using: mongodb://' + program['host'] + ':' + program['port'] + '/' + program['db'] + '.  Is it running?');
        throw err;
    };
    posts = db.collection('posts');
    console.log('Welcome to the HW 6.5 Checker. My job is to verify that you have a three node replica set properly set up.');
    replSetRunning(db, 3, function(err) {
        if (err) {
            console.log('Sorry, the three node replica set does not seem to be running as expected');
            return db.close();
        };
        console.log('hw6-5 Validated successfully!');

        function decrypt(data, password) {
            var algo = 'aes256';
            var decipher = crypto.createDecipher(algo, password);
            var plaintext = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
            return plaintext;
        };
        console.log('Your validation code is: ' + decrypt('4b81dc0537dbd9691a05b00ac52264b1292321566339e53bce40c9df08b0fe30', 'gjizmkF9CIJdKvQuw3MF'));
        db.close();
    });
});
