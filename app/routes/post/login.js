'use strict';

const passport = require('passport');
const url = require('url');

module.exports = (req, res, next) => {
  const redirectURL = req.body.redirect_to !== 'undefined' ? req.body.redirect_to : '/';
  passport.authenticate('local', {
    successRedirect: redirectURL,
    failureRedirect: url.format({
      pathname: '/login', 
      query: { redirect_to: req.body.redirect_to }
    })
  })(req, res, next);
};
