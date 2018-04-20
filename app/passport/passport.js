var passport = require('passport');
var local = require('./local');

module.exports = function() {
    
  // シリアライズ済みのユーザー
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  // シリアライズされていないユーザー
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(local);
};