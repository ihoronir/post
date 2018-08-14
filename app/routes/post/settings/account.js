'use strict';

const util      = require('util');
const User      = require('../../../../db/models').user;
const uservalid = require('../../../../util/validation').user;
const loginFilter = require('../../filters/login');

module.exports = [loginFilter, (req, res, next) => {

  let errFlag = false;

  // ユーザー名
  if (!req.body.screen_name) {
    req.flash('validationErrScreenName', req.string.message.validationError.user.emptyScreenName);
    errFlag = true;
  } else if (!uservalid.isScreenName(req.body.screen_name)) {
    req.flash('validationErrScreenName', req.string.message.validationError.user.isScreenName);
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
        req.flash('validationErrScreenName', util.format(req.string.message.validationError.user.usedScreenName, req.body.screen_name));
        res.redirect('/settings/account');
      } else {
        next(err);
      }
      return null; // Measure for Bluebird warning
    });
  }
  
}];
