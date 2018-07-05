'use strict';

const express = require('express');
const router  = express.Router();

const User       = require('../../database/database').user;
const validation = require('../../utils/validation');
const encrypt    = require('../../utils/encrypt');
const saltgen    = require('../../utils/salt');

router.post('/', (req, res, next) => {

  validation(req, [
    {
      text: req.body.name,
      pattern: /^[0-9A-Za-z]+$/,
      flash: 'validationErrName',
      flashMessage: '指定されている形式でユーザー ID を入力してください。'
    }, {
      text: req.body.screen_name,
      pattern: /.*/,
      flash: 'validationErrScreenName',
      flashMessage: 'ユーザー名を入力してください。'
    }, {
      text: req.body.email,
      pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
      flash: 'validationErrEmail',
      flashMessage: 'メールアドレスを入力してください。'
    }, {
      text: req.body.password,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/,
      flash: 'validationErrPassword',
      flashMessage: '小文字、大文字、数字をそれぞれ含む8文字以上のパスワードを入力してください。'
    }, {
      text: req.body.password_confirmation,
      pattern: new RegExp(req.body.password),
      flash: 'validationErrPasswordConfirmation',
      flashMessage: '同じパスワードを入力してください。'
    }
  ]).then(() => {
    const salt = saltgen();
    const password = encrypt(req.body.password, salt);
    User.build({
      name: req.body.name,
      screenName: req.body.screen_name,
      email: req.body.email,
      password: password, // パスワード
      passwordSalt: salt, // ソルト
      description: ''     // プロフィール
    }).save().then(() => {

      res.redirect('/login');

    }).catch((err) => {

      if (err.name === 'SequelizeUniqueConstraintError') {
        req.flash('validationErrName', 'ユーザーID ' + req.body.name + ' はすでに使用されています。');
        res.redirect('/signup');
      } else {
        next(err);
      }
    });
  }).catch(() => {
    return res.redirect('/signup');
  });
});

module.exports = router;
