'use strict';

module.exports = (req, input) => {
  let errFlag = false;
  for (let i = 0 , length = input.length; i < length; i ++) {
    if (!(input[i].pattern.test(input[i].text)) || !input[i].text) {
      req.flash(input[i].flash, input[i].flashMessage);
      errFlag = true;
    }
  }
  return new Promise((resolve, reject) => {
    if (errFlag) {
      reject();
    } else {
      resolve();
    }
  });
}