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
  res.render('settings/password');
});

router.get('/profile', (req, res, next) => {
  res.render('settings/profile');
});

router.get('/notifications', (req, res, next) => {
  res.render('settings/notifications');
});

module.exports = router;
