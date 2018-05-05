var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/database').user;

var encrypt = require('../utils/encrypt');

module.exports = new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {

    User.findOne({
      where: {
        name: username
      }
    }).then(function(user) {

      if (!user) {
        req.flash('authErrName', 'ユーザーIDが間違っています。');
        return done(null, false/*, {authErrName: 'ユーザーIDが間違っています。'}*/);
      }

      if (!(encrypt(password, user.passwordSalt) === user.password)) {
        req.flash('authErrPassword', 'パスワードが間違っています。')
        return done(null, false/*, {message: 'パスワードが間違っています。'}*/);
      }
      
      return done(null, user);

    }).catch(function(err) {
      return done(err);
    });
});