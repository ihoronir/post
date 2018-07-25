'use strict';

const express = require('express');
const router = express.Router();

const util = require('util');
const config = require('config');
const User = require('../../database/database').user;

router.post('/', (req, res) => {
  res.redirect('/');
});

router.post('/account', (req, res, next) => {

  let errFlag = false;

  // ユーザー名
  if (!req.body.screen_name) {
    req.flash('validationErrScreenName', req.string.message.validationError.emptyScreenName);
    errFlag = true;
  } else if (!config.pattern.user.screenName.regExp.test(req.body.screen_name)) {
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
      if (err.name === 'SequelizeUniqueConstraintError' || err.fields.screen_name) {
        req.flash('validationErrScreenName', util.format(req.string.message.validationError.usedScreenName, req.body.screen_name));
        res.redirect('/settings/account');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning
    });
  }
  
});

router.post('/settings', (req, res, next) => {

})

module.exports = router;
