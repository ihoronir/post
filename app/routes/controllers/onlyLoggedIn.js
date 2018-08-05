'use strict';

const express = require('express');
const url = require('url');
const router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect(url.format({
      pathname: '/login', 
      query: { redirect_to: encodeURIComponent(req.originalUrl) }
    }));
  } else {
    next();
  }
});

module.exports = router;
