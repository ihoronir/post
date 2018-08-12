'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

const User = require('../../../db/models').user;
const Game = require('../../../db/models').game;

const createError = require('http-errors');

router.get('/:screen_name/games/:game_id/edit/:page', (req, res, next) => {

  Promise.all([
    User.findOne({
      where: {
        screenName: req.params.screen_name
      }
    }),
    Game.findById(req.params.game_id)
  ]).then(values => {
    const user = values[0];
    const game = values[1];

    if (!game) {
      next(createError(404));
    } else if (game.userId !== req.user.id) {
      next(createError(403));
    } else if (user.screen_name !== req.user.screen_name) {
      next(createError(404));
    } else {
      next();
    }
    return null; // Measure for Bluebird warning
  }).catch(err => {
    next(err);
    return null; // Measure for Bluebird warning
  });
});

router.get('/:screen_name/games/:game_id/edit', (req, res, next) => {
  const infoUrl = path.join(req.originalUrl, 'info');
  res.redirect(infoUrl);
});

router.get('/:screen_name/games/:game_id/edit/info', (req, res, next) => {
  res.render('edit/info');
});


module.exports = router;
