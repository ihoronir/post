'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup', {
      validationErrScreenName     : req.flash('validationErrScreenName')[0],
      validationErrName           : req.flash('validationErrName')[0],
      validationErrEmail          : req.flash('validationErrEmail')[0],
      validationErrPassword       : req.flash('validationErrPassword')[0],
      validationErrPasswordConfirm: req.flash('validationErrPasswordConfirm'[0])
    })
  }
});

module.exports = router;
