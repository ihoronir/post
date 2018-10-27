'use strict';

// このフィルタは /games/:id/edit/:page へのアクセスを制御するもの

const createError = require('http-errors');
const Game = require('../../../db/models').game;

module.exports = (req, res, next) => {
  Game.findByPk(req.params.id)
    .then(game => {
      if (!game) {
        next(createError(404));
      } else if (game.userId !== req.user.id) {
        next(createError(403));
      } else {
        req.game = game;
        next();
      }
      return null; // Measure for Bluebird warning
    })
    .catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });
};
