'use strict';

const LocalStrategy = require('passport-local').Strategy;

const User = require('../database/database').user;

const encrypt = require('../utils/hash').encrypt;

module.exports = new LocalStrategy({
    usernameField: 'screen_name', 
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {

    User.findOne({
      where: {
        screenName: username
      }
    }).then(user => {

      if (!user) {
        req.flash('authErrName', 'ユーザーIDが間違っています。');
        done(null, false);
        return null; // Measure for Bluebird warning
      }

      if (!(encrypt(password, user.passwordSalt) === user.password)) {
        req.flash('authErrPassword', 'パスワードが間違っています。');
        done(null, false);
        return null; // Measure for Bluebird warning
      }
      
      done(null, user);
      return null; // Measure for Bluebird warning

    }).catch(err => {
      done(err);
      return null; // Measure for Bluebird warning
    });
});
