'use strict';

const express = require('express');
const router = express.Router();

const render = require('../render');

router.get('/', (req, res, next) => {
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
