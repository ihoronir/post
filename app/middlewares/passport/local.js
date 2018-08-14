'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../db/models').user;
const encrypt = require('../../../util/hash').encrypt;

module.exports = new LocalStrategy(
  {
    usernameField: 'screen_name',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, username, password, done) => {
    User.findOne({
      where: {
        screenName: username
      }
    })
      .then(user => {
        if (!user) {
          req.flash('notFoundUser', req.string.message.error.notFoundUser);
          done(null, false);
          return null; // Measure for Bluebird warning
        }

        if (encrypt(password, user.passwordSalt) !== user.passwordHash) {
          req.flash('notMatchedPassword', req.string.message.error.notMatchedPassword);
          done(null, false);
          return null; // Measure for Bluebird warning
        }

        done(null, user);
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
        done(err);
        return null; // Measure for Bluebird warning
      });
  }
);
