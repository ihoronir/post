'use strict';

const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const Game = require('../../../db/models').game;
const gamevalid = require('../../../util/validation').game;

router.post('/', (req, res, next) => {

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
    Game.create({
      id: crypto.pseudoRandomBytes(16).toString('hex'),
      userId: req.user.id,
      title: req.body.title
    }).then(result => {
      res.redirect('/' + req.user.screen_name + '/items/' + result.id);
    }).catch(err => {
      next(err);
    });
  }
});

module.exports = router;
