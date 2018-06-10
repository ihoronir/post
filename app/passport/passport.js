const passport = require('passport');
const local = require('./local');

const User = require('../database/database').user;

module.exports = () => {
    
  // シリアライズ（login 時にセッションに保存）
  passport.serializeUser((user, done) => {
    // id をセッションに保存
    done(null, user.id);
  });

  // デシリアライズ（セッションにシリアライズした情報を req.user に入れる）
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id: id
      }
    }).then(user => {
      // req.user に ユーザーオブジェクト保存
      done(null, user);
    }).catch(err => {
      // エラー
      done(err);
    });
  });

  passport.use(local);
};