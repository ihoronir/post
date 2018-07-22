'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup', {
      validationErrScreenName     : req.flash('validationErrScreenName'),
      validationErrName           : req.flash('validationErrName'),
      validationErrEmail          : req.flash('validationErrEmail'),
      validationErrPassword       : req.flash('validationErrPassword'),
      validationErrPasswordConfirm: req.flash('validationErrPasswordConfirm')
    })
  }
});

module.exports = router;
