'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../database/database').user;

const createError = require('http-errors');

router.get('/:name', (req, res, next) => {
  User.findOne({
    where: {
      name: req.params.name
    }
  }).then((user) => {
    if (!user) {
      return next(createError(404));
    }

    res.render('user', {
      profile: user
    });
  }).catch((err) => {
    next(err);
  })
})

module.exports = router;
