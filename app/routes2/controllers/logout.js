'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const redirectURL = req.body.redirect_to || '/login';
  req.logout();
  res.redirect(redirectURL);
});

module.exports = router;
