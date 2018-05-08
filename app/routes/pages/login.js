var express = require('express');
var router = express.Router();

var render = require('../render');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    render('login', req, res, next, {
      authErrName: req.flash('authErrName'),
      authErrPassword: req.flash('authErrPassword')
    });
  }
});

module.exports = router;
