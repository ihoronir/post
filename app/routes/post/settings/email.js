'use strict';

const util = require('util');
const crypto = require('crypto');
const User = require('../../../../db/models').user;
const uservalid = require('../../../../util/validation').user;
const loginFilter = require('../../filters/login');

module.exports = [
  loginFilter,
  (req, res, next) => {
    let errFlag = false;

    // メアド
    if (!req.body.email) {
      req.flash('validationErrEmail', req.string.message.validationError.user.emptyEmail);
      errFlag = true;
    } else if (!uservalid.isEmail(req.body.email)) {
      req.flash('validationErrEmail', req.string.message.validationError.user.isEmail);
      errFlag = true;
    }

    if (errFlag) {
      res.redirect('/settings/notifications');
    } else {
      next();
    }
  },
  (req, res, next) => {
    const emailHash = crypto
      .createHash('sha256')
      .update(req.body.email)
      .digest('hex');

    User.update(
      {
        email: req.body.email,
        emailHash: emailHash,
        publicEmail: !!req.body.public_email
      },
      {
        where: {
          id: req.user.id
        }
      }
    )
      .then(() => {
        req.flash('successSaveChanges', req.string.message.success.saveChanges);
        res.redirect('/settings/notifications');
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError' && err.fields.email_hash) {
          req.flash('validationErrEmail', util.format(req.string.message.validationError.user.usedEmail, req.body.email));
          res.redirect('/settings/notifications');
        } else {
          next(err);
        }
        return null; // Measure for Bluebird warning
      });
  }
];
