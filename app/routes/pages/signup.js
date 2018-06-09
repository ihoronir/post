const express = require('express');
const router = express.Router();

const render = require('../render');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    render('signup', req, res, next, {
      validationErrName                : req.flash('validationErrName'),
      validationErrScreenName          : req.flash('validationErrScreenName'),
      validationErrEmail               : req.flash('validationErrEmail'),
      validationErrPassword            : req.flash('validationErrPassword'),
      validationErrPasswordConfirmation: req.flash('validationErrPasswordConfirmation')
    })
  }
});

module.exports = router;
