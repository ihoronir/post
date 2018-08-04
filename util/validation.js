'use strict';

const validator = require('validator');
const config = require('config');

module.exports = {
  user: {
    isScreenName: val => {
      return config.pattern.user.screenName.regExp.test(val);
    },
    isName: val => {
      return val.length <= config.pattern.user.name.maxlength;
    },
    isEmail: val => {
      return validator.isEmail(val);
    },
    isPassword: val => {
      return config.pattern.user.password.regExp.test(val);
    },
    isDescription: val => {
      return val.length <= config.pattern.user.description.maxlength;
    },
    isuUrlOrEmpty: val => {
      return validator.isURL(val) && val.length <= config.pattern.user.url.maxlength;
    },
    isLocatioin: val => {
      return val.length <= config.pattern.user.locatioin.maxlength;
    }
  }
};
