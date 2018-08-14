'use strict';

const gm = require('gm');

module.exports = {
  avater(path) {
    return new Promise((resolve, reject) => {
      gm(path)
        .resize(400, 400, '!')
        .quality(70)
        .noProfile()
        .write(path, function(err) {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  },
  thumbnail(path) {
    return new Promise((resolve, reject) => {
      gm(path)
        .resize(400, 400, '!')
        .quality(70)
        .noProfile()
        .write(path, function(err) {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  }
};
