var passport = require('passport');
var local = require('./local');

module.exports = function() {
    
  // シリアライズ（login 時にセッションに保存）
  passport.serializeUser(function(user, done) {
    // id をセッションに保存
    done(null, user.id);
  });

  // デシリアライズ（セッションにシリアライズした情報を req.user に入れる）
  passport.deserializeUser(function(id, done) {
    // req.user に id 保存
    done(null, id);
  });

  passport.use(local);
};