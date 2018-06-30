'use strict';

const crypto = require('crypto');
module.exports = () => {
  return crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
}