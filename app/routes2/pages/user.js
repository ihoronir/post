'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../../db/models').user;

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

/*
router.get('/:screen_name/items', (req, res, next) => {
  res.json(req.params);
  console.log('route2');
});


router.get('/:screen_name/items/:item', (req, res, next) => {
  res.json(req.params);
  console.log('route3');
});*/


module.exports = router;
