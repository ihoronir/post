const express = require('express');
const router = express.Router();

const User = require('../../database/database').user;

const render = require('../render');

const createError = require('http-errors');

router.get('/:name', function(req, res, next) {
  User.findOne({
    where: {
      name: req.params.name
    }
  }).then(function(user) {
    if (!user) {
      return next(createError(404));
    }

    render('user', req, res, next, {
      profile: user
    });

    // BlueBird の警告対策
    // でもなんか気持ち悪い...
    return null;
  }).catch(function(err) {
    next(err);
  })
})

module.exports = router;
