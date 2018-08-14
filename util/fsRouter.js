'use strict';
const express = require('express');

module.exports = () => {
  const router = express.Router();
  router.get('/', (req, res, next) => {
    res.send('Hello');
  });
  return router;
};
