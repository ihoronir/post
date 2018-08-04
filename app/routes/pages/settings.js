'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/settings/account');
});

router.get('/account', (req, res, next) => {
  res.render('settings/account', {
    successSaveChanges     : req.flash('successSaveChanges')[0],
    validationErrScreenName: req.flash('validationErrScreenName')[0]
  });
});

router.get('/password', (req, res, next) => {
  res.render('settings/password', {
    successSaveChanges          : req.flash('successSaveChanges')[0],
    notMatchedPassword          : req.flash('notMatchedPassword')[0],
    validationErrPassword       : req.flash('validationErrPassword')[0],
    validationErrPasswordConfirm: req.flash('validationErrPasswordConfirm')[0]
  });
});

router.get('/profile', (req, res, next) => {
  res.render('settings/profile', {
    successSaveChanges      : req.flash('successSaveChanges')[0],
    validationErrName       : req.flash('validationErrName')[0],
    validationErrDescription: req.flash('validationErrDescription')[0],
    validationErrUrl        : req.flash('validationErrUrl')[0],
    validationErrLocation   : req.flash('validationErrLocation')[0]
  });
});

router.get('/notifications', (req, res, next) => {
  res.render('settings/notifications', {
    successSaveChanges: req.flash('successSaveChanges')[0],
    validationErrEmail: req.flash('validationErrEmail')[0]
  });
});

module.exports = router;
