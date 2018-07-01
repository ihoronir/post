'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup', {
      validationErrName                : req.flash('validationErrName'),
      validationErrScreenName          : req.flash('validationErrScreenName'),
      validationErrEmail               : req.flash('validationErrEmail'),
      validationErrPassword            : req.flash('validationErrPassword'),
      validationErrPasswordConfirmation: req.flash('validationErrPasswordConfirmation')
    })
  }
});

module.exports = router;
