var passport = require('passport');
var local = require('./local');

var User = require('../database/database').user;

module.exports = function() {
    
  // シリアライズ（login 時にセッションに保存）
  passport.serializeUser(function(user, done) {
    // id をセッションに保存
    done(null, user.id);
  });

  // デシリアライズ（セッションにシリアライズした情報を req.user に入れる）
  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      // req.user に ユーザーオブジェクト保存
      done(null, user);
    }).catch(function(err) {
      // エラー
      done(err);
    });
  });

  passport.use(local);
};