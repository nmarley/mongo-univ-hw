var crypto = require('crypto')

function decrypt(data, key) {
    var algo = 'aes256';
    var decipher = crypto.createDecipher(algo, key);
    var plain = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    return plain;
};

console.log('Your validation code is: ' + decrypt('7591130833c040b942800350627be214973bfc132599d73bafec137e049c5349', '747BeoTScGLdLSV4FdvT'));
