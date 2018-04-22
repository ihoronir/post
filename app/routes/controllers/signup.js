var express = require('express');

/*
 * パスワードハッシュ計算方法
 * 
 * 1. 現在時刻（ミリ秒）をハッシュにかける
 * 2. 1で生成したものをソルトにしてパスワードをハッシュにかける
 * 3. ソルトとハッシュを両方DBに保存しとく
 * 
 */

var router = express.Router();

var User = require('../../database/database').user;

var encrypt = require('../../utils/encrypt');

router.post('/signup', function(req, res) {
  var salt = encrypt(Date.now);
  var password = encrypt(req.body.password, salt);
  User.build({
    name: req.body.name,
    screenName: req.body.screen_name,
    email: req.body.email,
    password: password, // パスワード
    passwordSalt: salt  // ソルト
  }).save().catch(function(err) {
    console.log(err);
  });;
});

module.exports = router;
