var express = require('express');
var router = express.Router();

var render = require('../render');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    render('signup', req, res, {
      validationErrName                : req.flash('validationErrName'),
      validationErrScreenName          : req.flash('validationErrScreenName'),
      validationErrEmail               : req.flash('validationErrEmail'),
      validationErrPassword            : req.flash('validationErrPassword'),
      validationErrPasswordConfirmation: req.flash('validationErrPasswordConfirmation')
    })
  }
});

module.exports = router;
