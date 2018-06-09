const crypto = require('crypto');
module.exports = function() {
  return crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
}