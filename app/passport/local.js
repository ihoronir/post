var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(function(username, password, done) {
  // 本来ここには認証処理
  return done(null, 'shioleap');
});