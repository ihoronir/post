'use strict';

const express = require('express');
const router  = express.Router();

const config     = require('config');
const User       = require('../../database/database').user;
const validation = require('../../utils/validation');
const encrypt    = require('../../utils/hash').encrypt;
const saltgen    = require('../../utils/hash').salt;

router.post('/', (req, res, next) => {

  validation(req, [
    {
      text: req.body.screen_name,
      pattern: config.pattern.user.screenName.regExp,
      flash: 'validationErrName',
      flashMessage: '指定されている形式でユーザー名を入力してください。'
    }, {
      text: req.body.name,
      pattern: config.pattern.user.name.regExp,
      flash: 'validationErrScreenName',
      flashMessage: '名前を入力してください。'
    }, {
      text: req.body.email,
      pattern: config.pattern.user.email.regExp,
      flash: 'validationErrEmail',
      flashMessage: 'メールアドレスを入力してください。'
    }, {
      text: req.body.password,
      pattern: config.pattern.user.password.regExp,
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
    }).save().then(() => {

      res.redirect('/login');
      return null; // Measure for Bluebird warning

    }).catch((err) => {

      if (err.name === 'SequelizeUniqueConstraintError') {
        req.flash('validationErrName', 'ユーザーID ' + req.body.name + ' はすでに使用されています。');
        res.redirect('/signup');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning

    });
  }).catch(() => {
    return res.redirect('/signup');
  });
});

module.exports = router;
