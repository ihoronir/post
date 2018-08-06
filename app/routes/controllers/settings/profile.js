'use strict';

const express = require('express');
const router  = express.Router();

const User      = require('../../../../db/models').user;
const uservalid = require('../../../../util/validation').user;

router.post('/', (req, res, next) => {

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

module.exports = router;
