'use strict';

const User = require('../../../../../db/models').user;
const Game = require('../../../../../db/models').game;
const createError = require('http-errors');

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      screenName: req.params.screenName
    },
    include: {
      model: Game,
      as: 'games'
    }
  })
    .then(user => {
      if (!user) {
        next(createError(404));
      } else {
        res.render('user', {
          profile: user
        });
      }
      return null; // Measure for Bluebird warning
    })
    .catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });
};
