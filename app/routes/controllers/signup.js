'use strict';

const express = require('express');
const router  = express.Router();

const util       = require('util');
const config     = require('config');
const User       = require('../../database/database').user;
const encrypt    = require('../../utils/hash').encrypt;
const saltgen    = require('../../utils/hash').salt;

router.post('/', (req, res, next) => {

  let errFlag = false;

  // ユーザー名
  if (!req.body.screen_name) {
    req.flash('validationErrScreenName', req.string.message.validationError.emptyScreenName);
    errFlag = true;
  } else if (!config.pattern.user.screenName.regExp.test(req.body.screen_name)) {
    req.flash('validationErrScreenName', req.string.message.validationError.isScreenName);
    errFlag = true;
  }
  // 名前
  if (!req.body.name) {
    req.flash('validationErrName', req.string.message.validationError.emptyName);
    errFlag = true;
  } else if (req.body.name.length > 50) {
    req.flash('validationErrName', req.string.message.validationError.isName);
    errFlag = true;
  }
  // メアド
  if (!req.body.email) {
    req.flash('validationErrEmail', req.string.message.validationError.emptyEmail);
    errFlag = true;
  } else if (!config.pattern.user.email.regExp.test(req.body.email)) {
    req.flash('validationErrEmail', req.string.message.validationError.isEmail);
    errFlag = true;
  }
  // パスワード
  if (!req.body.password) {
    req.flash('validationErrPassword', req.string.message.validationError.emptyPassword);
    errFlag = true;
  } else if (!config.pattern.user.password.regExp.test(req.body.password)) {
    req.flash('validationErrPassword', req.string.message.validationError.isPassword);
    errFlag = true;
  } else if (req.body.password !== req.body.password_confirm) {
    req.flash('validationErrPasswordConfirm', req.string.message.validationError.matchedPassword);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('/signup');
  } else {

    const salt = saltgen();
    const password = encrypt(req.body.password, salt);
    const emailHash = encrypt(req.body.email);

    User.build({
      screenName: req.body.screen_name,
      name: req.body.name,
      email: req.body.email,
      emailHash: emailHash,
      password: password,
      passwordSalt: salt,
    }).save().then(() => {

      res.redirect('/login');
      return null; // Measure for Bluebird warning

    }).catch((err) => {

      if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.fields.screen_name) {
          req.flash('validationErrScreenName', util.format(req.string.message.validationError.usedScreenName, req.body.screen_name));
        }
        if (err.fields.email_hash) {
          req.flash('validationErrEmail', util.format(req.string.message.validationError.usedEmail, req.body.email));
        }
        res.redirect('/signup');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning

    });

  }
});

module.exports = router;
