'use strict';

const crypto = require('crypto');
const Game = require('../../../db/models').game;
const gamevalid = require('../../../util/validation').game;
const loginFilter = require('../filters/login');

module.exports = [
  loginFilter,
  (req, res, next) => {
    let errFlag = false;
    if (!req.body.title) {
      req.flash('validationErrTitle', req.string.message.validationError.emptyTitle);
      errFlag = true;
    } else if (!gamevalid.isTitle(req.body.title)) {
      req.flash('validationErrTitle', req.string.message.validationError.isTitle);
      errFlag = true;
    }

    if (errFlag) {
      res.redirect('/upload');
    } else {
      next();
    }
  },
  (req, res, next) => {
    Game.create({
      id: crypto.pseudoRandomBytes(16).toString('hex'),
      userId: req.user.id,
      title: req.body.title
    })
      .then(result => {
        res.redirect('/games/' + result.id + '/edit');
      })
      .catch(err => {
        next(err);
      });
  }
];
