'use strict';

const express = require('express');
const router  = express.Router();

const util      = require('util');
const User      = require('../../../db/models').user;
const encrypt   = require('../../../util/hash').encrypt;
const saltgen   = require('../../../util/hash').salt;
const uservalid = require('../../../util/validation').user;

router.post('/', (req, res) => {
  res.redirect('/');
});

router.post('/account', (req, res, next) => {

  let errFlag = false;

  // ユーザー名
  if (!req.body.screen_name) {
    req.flash('validationErrScreenName', req.string.message.validationError.emptyScreenName);
    errFlag = true;
  } else if (!uservalid.isScreenName(req.body.screen_name)) {
    req.flash('validationErrScreenName', req.string.message.validationError.isScreenName);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('/settings/account');
  } else {
    User.update({
      screenName: req.body.screen_name
    }, {
      where: {
        id: req.user.id
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect('/settings/account');
      return null; // Measure for Bluebird warning
    }).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError' && err.fields.screen_name) {
        req.flash('validationErrScreenName', util.format(req.string.message.validationError.usedScreenName, req.body.screen_name));
        res.redirect('/settings/account');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning
    });
  }
  
});

router.post('/password', (req, res, next) => {

  let errFlag = false;

  // 現在のパスワードチェック
  if (encrypt(req.body.current_password, req.user.passwordSalt) !== req.user.passwordHash) {
    req.flash('notMatchedPassword', req.string.message.error.notMatchedPassword);
  }
  // パスワード
  if (!req.body.new_password) {
    req.flash('validationErrPassword', req.string.message.validationError.emptyPassword);
    errFlag = true;
  } else if (!uservalid.isPassword(req.body.new_password)) {
    req.flash('validationErrPassword', req.string.message.validationError.isPassword);
    errFlag = true;
  } else if (req.body.new_password !== req.body.new_password_confirm) {
    req.flash('validationErrPasswordConfirm', req.string.message.validationError.matchedPassword);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('/settings/password');
  } else {

    const passwordSalt = saltgen();
    const passwordHash = encrypt(req.body.password, passwordSalt);

    User.update({
      passwordHash: passwordHash,
      passwordSalt: passwordSalt
    }, {
      where: {
        id: req.user.id
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect('/settings/password');
      return null; // Measure for Bluebird warning
    }).catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });

  }
});

router.post('/profile', (req, res, next) => {

  let errFlag = false;

  // 名前
  if (!req.body.name) {
    req.flash('validationErrName', req.string.message.validationError.emptyName);
    errFlag = true;
  } else if (!uservalid.isName(req.body.name)) {
    req.flash('validationErrName', req.string.message.validationError.isName);
    errFlag = true;
  }
  // 説明
  if (!uservalid.isDescription(req.body.name)) {
    req.flash('validationErrDescription', req.string.message.validationError.isDescription);
    errFlag = true;
  }
  // サイト / ブログ
  if (!uservalid.isUrlOrEmpty(req.body.url)) {
    req.flash('validationErrUrl', req.string.message.validationError.isUrl);
    errFlag = true;
  }
  // 場所
  if (!uservalid.isLocatioin(req.body.location)) {
    req.flash('validationErrLocation', req.string.message.validationError.isLocatioin);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('/settings/profile');
  } else {
    User.update({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      location: req.body.location
    }, {
      where: {
        id: req.user.id
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect('/settings/profile');
      return null; // Measure for Bluebird warning
    }).catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });

  }
});

router.post('/email', (req, res, next) => {

  let errFlag = false;

  // メアド
  if (!req.body.email) {
    req.flash('validationErrEmail', req.string.message.validationError.emptyEmail);
    errFlag = true;
  } else if (!uservalid.isEmail(req.body.email)) {
    req.flash('validationErrEmail', req.string.message.validationError.isEmail);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('/settings/notifications');
  } else {

    const emailHash = encrypt(req.body.email);

    User.update({
      email: req.body.email,
      emailHash: emailHash,
      publicEmail: !!req.body.public_email
    }, {
      where: {
        id: req.user.id
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect('/settings/notifications');
      return null; // Measure for Bluebird warning
    }).catch(err => {

      if (err.name === 'SequelizeUniqueConstraintError' && err.fields.email_hash) {
        req.flash('validationErrEmail', util.format(req.string.message.validationError.usedEmail, req.body.email));
        res.redirect('/settings/notifications');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning
    });

  }
});

module.exports = router;
