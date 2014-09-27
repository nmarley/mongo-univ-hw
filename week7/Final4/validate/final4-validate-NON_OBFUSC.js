var request = require('request');
var bcrypt = require('bcrypt-nodejs');
var program = require('commander');
var crypto = require('crypto');

program['option']('-h, --host [host]', 'Webserver host.  Default is \'localhost\'', 'localhost')['option']('-p, --port [port]', 'Webserver url.  Default is \'3000\'', 3000)['parse'](process['argv']);

function fetchBlogHomePage(callback) {
  var url = 'http://' + program['host'] + ':' + program['port'] + '/';
  console.log('Trying to fetch blog homepage for url ' + url);
  request.get(url, function(err, resp, body) {
    if (err) {
      return callback(Error('Failed to connect to blog at \'' + program['host'] + ':' + program['port'] + '\': ' + err.toString()));
    };
    var matches = body.match('<a href="(/post/[^"]+)"w*?>');
    if (matches === null) {
      console.log('Hmm, can\'t seem to find a post. Is the blog populated with posts?');
      console.log('When we tried to read the blog index at ' + url + ' here is what we got:');
      console.log(body);
      return callback(Error('Failed to validate blog likes'));
    };
    return callback(null, matches[1]);
  });
};

function fetchLikes(permalink, callback) {
  var url = 'http://' + program['host'] + ':' + program['port'] + permalink;
  console.log('Trying to grab the number of likes for url ' + url);
  request.get(url, function(err, resp, body) {
    if (err) {
      return callback(Error('Failed to connect to blog at \'' + program['host'] + ':' + program['port'] + '\': ' + err.toString()));
    };
    var matches = body.match('Likes: s*([0-9]+)s*');
    if (matches === null) {
      console.log('Can\'t fetch the like value for the first comment. Perhaps the blog entry has no comments?');
      console.log('When we tried to read the blog permalink at ' + url + ' here is what we got');
      console.log(body);
      return callback(Error('Failed to validate blog likes'));
    };
    return callback(null, matches[1]);
  });
};

function clickOnLike(permalink, callback) {
  console.log('Trying to increment the number of likes for post: ' + permalink);
  var url = 'http://' + program['host'] + ':' + program['port'] + '/like';
  var matches = permalink['match']('[^/]+/([^/]+)');
  if (matches === null) {
      console.log('Internal Error: Invalid permalink: ' + permalink);
      return callback(Error('Failed to validate blog likes'));
  };
  request['post'](url, function(err, resp, body) {
      if (err) {
          return callback(Error('Failed to connect to blog at \'' + program['host'] + ':' + program['port'] + '\': ' + err.toString()));
      };
      return callback(null);
  })['form']({
      "permalink": matches[1],
      "comment_ordinal": 0
  });
};

fetchBlogHomePage(function(err, permalink) {
  if (err) {
    console.log('Blog did not validate due to error fetching blog homepage!');
    return;
  };
  fetchLikes(permalink, function(err, count) {
    if (err) {
      console.log('Blog did not validate due to error locating likes!');
      return;
    };
    clickOnLike(permalink, function(err) {
      if (err) {
        console.log('Blog did not validate due to error clicking on like!');
        return;
      };
      fetchLikes(permalink, function(err, new_count) {
        if (err) {
          console.log('Blog did not validate due to error locating likes!');
          return;
        } else {
          if ((+count + 1) != new_count) {
            console.log('Blog did not validate: likes not incremented correctly.');
            console.log('Old value: ' + count);
            console.log('New value: ' + new_count);
            return;
          } else {
            console.log('Successfully clicked like');
            console.log('Blog validated successfully!');

            function decrypt(data, password) {
              var algo = 'aes256';
              var decipher = crypto.createDecipher(algo, password);
              var plain = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
              return plain;
            };
            console.log('Your validation code is: ' + decrypt('7dea3e3a2911f7f3762acad883affadb98308a0969cd1d612c4cdd3deb58f5c7', 'goxzFbt05cBI0r9oKGTY'));
          };
        };
      });
    });
  });
});
