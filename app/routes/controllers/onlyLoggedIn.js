'use strict';

const express = require('express');
const url = require('url');
const router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect(url.format({
      pathname: '/login', 
      query: { redirect_to: decodeURIComponent(req.originalUrl) }
    }));
  }
  next();
});

module.exports = router;