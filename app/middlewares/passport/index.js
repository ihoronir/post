'use strict';

const passport = require('passport');
const local = require('./local');

const User = require('../../../db/models').user;

// シリアライズ（login 時にセッションに保存）
passport.serializeUser((user, done) => {
  // id をセッションに保存
  done(null, user.id);
  return null;
});

// デシリアライズ（セッションにシリアライズした情報を req.user に入れる）
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      // req.user に ユーザーオブジェクト保存
      done(null, user);
      return null; // Measure for Bluebird warning
    })
    .catch(err => {
      // エラー
      done(err);
      return null; // Measure for Bluebird warning
    });
});

passport.use(local);

module.exports = app => {
  app.use(passport.initialize()); // passport initialize
  app.use(passport.session()); // passport session
};
