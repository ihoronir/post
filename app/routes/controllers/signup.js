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
var saltgen = require('../../utils/salt');

router.post('/', function(req, res, next) {

  // validation check
  var errFlag = false;
  if (!(/^[0-9A-Za-z]+$/.test(req.body.name)) || !req.body.name) {
    req.flash('validationErrName', '指定されている形式でユーザー ID を入力してください。');
    errFlag = true;
  }
  if (req.body.screen_name === '' || !req.body.screen_name) {
    req.flash('validationErrScreenName', 'ユーザー名を入力してください。');
    errFlag = true;
  }
  if (!(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(req.body.email)) || !req.body.email) {
    req.flash('validationErrEmail', 'メールアドレスを入力してください。');
    errFlag = true;
  }
  if (!(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(req.body.password)) || !req.body.password) {
    req.flash('validationErrPassword', '小文字、大文字、数字をそれぞれ含む8文字以上のパスワードを入力してください。');
    errFlag = true;
  }
  if (req.body.password !== req.body.password_confirmation || !req.body.password_confirmation) {
    req.flash('validationErrPasswordConfirmation', '同じパスワードを入力してください。');
  }
  // errRedirect
  if (errFlag) {
    return res.redirect('/signup');
  }

  var salt = saltgen();
  var password = encrypt(req.body.password, salt);
  User.build({
    name: req.body.name,
    screenName: req.body.screen_name,
    email: req.body.email,
    password: password, // パスワード
    passwordSalt: salt, // ソルト
    description: ''     // プロフィール
  }).save().then(function() {

    res.redirect('/login');

  }).catch(function(err) {

    if (err.name === 'SequelizeUniqueConstraintError') {
      req.flash('validationErrName', 'ユーザーID ' + req.body.name + ' はすでに使用されています。');
      res.redirect('/signup');
    } else {
      next(err);
    }
  });
});

module.exports = router;
