'use strict';

const express = require('express');
const createError = require('http-errors');
const loginFilter = require('../filters/login');

const infoRouter = require('./edit/info');

const router = express.Router();

const Game = require('../../../db/models').game;


router.use('/:game_id/edit', loginFilter, (req, res, next) => {
  console.log('controll');
  Game.findById(req.params.game_id).then(game => {
    if (!game) {
      next(createError(404));
    } else if (game.userId !== req.user.id) {
      next(createError(403));
    } else {
      req.gameId = req.params.game_id;
      next();
    }
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
}, infoRouter);

module.exports = router;
