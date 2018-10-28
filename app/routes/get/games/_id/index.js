'use strict';

const createError = require('http-errors');
const Game = require('../../../../../db/models').game;
const User = require('../../../../../db/models').user;
const Tag = require('../../../../../db/models').tag;

module.exports = [
  (req, res, next) => {
    Game.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          as: 'user'
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    })
      .then(game => {
        if (!game) {
          next(createError(404));
        } else {
          res.render('game', {
            game: game,
            creator: game.user
          });
        }
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
        next(err);
        return null; // Measure for Bluebird warning
      });
  }
];
