'use strict';

const validator = require('validator');
const config = require('config');

module.exports = {
  user: {
    isScreenName(val) {
      return config.pattern.user.screenName.regExp.test(val);
    },
    isName(val) {
      return val.length <= config.pattern.user.name.maxlength;
    },
    isEmail(val) {
      return validator.isEmail(val);
    },
    isPassword(val) {
      return config.pattern.user.password.regExp.test(val);
    },
    isDescription(val) {
      return val.length <= config.pattern.user.description.maxlength;
    },
    isUrlOrEmpty(val) {
      if (!val) {
        return true;
      } else {
        return validator.isURL(val) && val.length <= config.pattern.user.url.maxlength;
      }
    },
    isLocatioin(val) {
      return val.length <= config.pattern.user.location.maxlength;
    }
  },
  game: {
    isTitle(val) {
      return val.length <= config.pattern.game.title.maxlength;
    },
    isDescription(val) {

    }
  }
};
