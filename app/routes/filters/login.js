'use strict';

const url = require('url');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect(
      url.format({
        pathname: '/login',
        query: { redirect_to: encodeURIComponent(req.originalUrl) }
      })
    );
  } else {
    next();
  }
};
