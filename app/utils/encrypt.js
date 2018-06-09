const crypto = require('crypto');

module.exports = function(text, salt) {

  for (let i = 0; i < 10; i ++) {
    text = crypto.createHash('sha256').update(text + salt).digest('hex');
  }

  return text;

}