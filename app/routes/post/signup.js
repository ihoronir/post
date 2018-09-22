'use strict';

const util = require('util');
const User = require('../../../db/models').user;
const encrypt = require('../../../util/hash').encrypt;
const saltgen = require('../../../util/hash').salt;
const uservalid = require('../../../util/validation').user;

module.exports = [
  (req, res, next) => {
    let errFlag = false;

    // ユーザー名
    if (!req.body.screen_name) {
      req.flash('validationErrScreenName', req.string.message.validationError.emptyScreenName);
      errFlag = true;
    } else if (!uservalid.isScreenName(req.body.screen_name)) {
      req.flash('validationErrScreenName', req.string.message.validationError.isScreenName);
      errFlag = true;
    }
    // 名前
    if (!req.body.name) {
      req.flash('validationErrName', req.string.message.validationError.emptyName);
      errFlag = true;
    } else if (!uservalid.isName(req.body.name)) {
      req.flash('validationErrName', req.string.message.validationError.isName);
      errFlag = true;
    }
    // メアド
    if (!req.body.email) {
      req.flash('validationErrEmail', req.string.message.validationError.emptyEmail);
      errFlag = true;
    } else if (!uservalid.isEmail(req.body.email)) {
      req.flash('validationErrEmail', req.string.message.validationError.isEmail);
      errFlag = true;
    }
    // パスワード
    if (!req.body.password) {
      req.flash('validationErrPassword', req.string.message.validationError.emptyPassword);
      errFlag = true;
    } else if (!uservalid.isPassword(req.body.password)) {
      req.flash('validationErrPassword', req.string.message.validationError.isPassword);
      errFlag = true;
    } else if (req.body.password !== req.body.password_confirm) {
      req.flash('validationErrPasswordConfirm', req.string.message.validationError.matchedPassword);
      errFlag = true;
    }

    if (errFlag) {
      res.redirect('/signup');
    } else {
      next();
    }
  },
  (req, res, next) => {
    const passwordSalt = saltgen();
    const passwordHash = encrypt(req.body.password, passwordSalt);
    const emailHash = encrypt(req.body.email);

    User.create({
      screenName: req.body.screen_name,
      name: req.body.name,
      email: req.body.email,
      emailHash: emailHash,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt
    })
      .then(() => {
        res.redirect('/login');
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
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
];
