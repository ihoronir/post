'use strict';

const express = require('express');
const createError = require('http-errors');
const loginFilter = require('../filters/login');
const editRouter = require('./edit');

const router = express.Router();

const Game = require('../../../db/models').game;


router.get('/:game_id', (req, res, next) => {
  Game.findById(req.params.game_id).then(game => {
    if (!game) {
      next(createError(404));
    } else {
      res.send(game);
    }
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
});

router.use('/:game_id/edit', loginFilter, (req, res, next) => {
  Game.findById(req.params.game_id).then(game => {
    if (!game) {
      next(createError(404));
    } else if (game.userId !== req.user.id) {
      next(createError(403));
    } else {
      req.game = game;
      next();
    }
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
}, editRouter);

module.exports = router;
