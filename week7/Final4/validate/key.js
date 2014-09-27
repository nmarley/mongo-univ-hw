var crypto = require('crypto')

function decrypt(data, password) {
  var algo = 'aes256';
  var decipher = crypto.createDecipher(algo, password);
  var plain = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
  return plain;
};
console.log('Your validation code is: ' + decrypt('7dea3e3a2911f7f3762acad883affadb98308a0969cd1d612c4cdd3deb58f5c7', 'goxzFbt05cBI0r9oKGTY'));
