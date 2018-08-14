'use strict';

const crypto = require('crypto');

module.exports = {
  encrypt: (text, _salt) => {
    const salt = _salt || '';
    for (let i = 0; i < 10; i++) {
      text = crypto
        .createHash('sha256')
        .update(text + salt)
        .digest('hex');
    }
    return text;
  },
  salt: () => {
    return crypto
      .createHash('sha256')
      .update(Date.now().toString())
      .digest('hex');
  }
};
