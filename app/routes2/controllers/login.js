'use strict';

const express = require('express');
const url = require('url');
const router = express.Router();

const passport = require('passport');

router.post('/', (req, res, next) => {
  const redirectURL = req.body.redirect_to !== 'undefined' ? req.body.redirect_to : '/';
  passport.authenticate('local', {
    successRedirect: redirectURL,
    failureRedirect: url.format({
      pathname: '/login', 
      query: { redirect_to: req.body.redirect_to }
    })
  })(req, res, next);
});

module.exports = router;
