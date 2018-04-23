var LocalStrategy = require('passport-local').Strategy;

//var User = require('../../database/database').user;

//var encrypt = require('../../utils/encrypt');
//var saltgen = require('../../utils/salt');

module.exports = new LocalStrategy(function(username, password, done) {
  // 本来ここには認証処理
  return done(null, 'shioleap');
});