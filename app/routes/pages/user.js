'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../database/database').user;

const createError = require('http-errors');

router.get('/:screen_name', (req, res, next) => {
  User.findOne({
    where: {
      screenName: req.params.screen_name
    }
  }).then(user => {
    if (!user) {
      return next(createError(404));
    }

    res.render('user', {
      profile: user
    });
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
});

module.exports = router;
