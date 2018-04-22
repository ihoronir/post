var crypto = require('crypto');

module.exports = function(text, salt) {

  text = (text || Date.now()).toString();
  salt = (salt || Date.now()).toString(); 

  for (var i = 0; i < 10; i ++) {
    text = crypto.createHash('sha256').update(text + salt).digest('hex');
  }

  return text;

}