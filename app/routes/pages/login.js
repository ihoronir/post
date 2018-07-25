'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login', {
      authErrName: req.flash('authErrName')[0],
      authErrPassword: req.flash('authErrPassword')[0]
    });
  }
});

module.exports = router;
