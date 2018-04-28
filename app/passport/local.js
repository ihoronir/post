var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/database').user;

var encrypt = require('../utils/encrypt');

module.exports = new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password'
  }, function(username, password, done) {

    User.findOne({
      where: {
        name: username
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false, {message: 'ユーザーIDが間違っています。'});
      }

      console.log(encrypt(password, user.passwordSalt));
      console.log(user.password);
      if (!(encrypt(password, user.passwordSalt) === user.password)) {
        return done(null, false, {message: 'パスワードが間違っています。'});
      }
      
      return done(null, user);

    }).catch(function(err) {
      return done(err);
    });
});