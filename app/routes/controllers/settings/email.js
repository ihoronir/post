'use strict';

const express = require('express');
const router  = express.Router();

const util      = require('util');
const User      = require('../../../../db/models').user;
const encrypt   = require('../../../../util/hash').encrypt;
const uservalid = require('../../../../util/validation').user;

router.post('/', (req, res, next) => {

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
