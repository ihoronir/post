'use strict';

const createError = require('http-errors');
const Game = require('../../../../../db/models').game;
const User = require('../../../../../db/models').user;

module.exports = [
  (req, res, next) => {
    Game.findById(req.params.id)
      .then(game => {
        if (!game) {
          next(createError(404));
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
  },
  (req, res, next) => {
    User.findById(req.game.userId)
      .then(user => {
        res.render('game', {
          game: req.game,
          creator: user
        });
      })
      .catch(err => {
        next(err);
      });
  }
];
