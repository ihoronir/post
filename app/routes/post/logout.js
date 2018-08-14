'use strict';

const loginFilter = require('../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  const redirectURL = req.body.redirect_to || '/login';
  req.logout();
  res.redirect(redirectURL);
}];
