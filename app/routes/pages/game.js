'use strict';

const express = require('express');
const router = express.Router();

const Game = require('../../../db/models').game;

const createError = require('http-errors');

router.get('/:screen_name/games/:game_id', (req, res, next) => {
  Game.findById(req.params.game_id).then(game => {
    if (!game) {
      return next(createError(404));
    }
    res.send(game);
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
});


module.exports = router;
