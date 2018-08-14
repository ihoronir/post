'use strict';

const createError = require('http-errors');
const Game = require('../../../../../db/models').game;

module.exports = (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => {
      if (!game) {
        next(createError(404));
      } else {
        res.send(game);
      }
      return null; // Measure for Bluebird warning
    })
    .catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });
};
