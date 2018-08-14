'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const infoUrl = path.join(req.originalUrl, 'info');
  res.redirect(infoUrl);
});

router.get('/info', (req, res, next) => {
  res.render('edit/info', {
    game: req.game,
  });
});

router.get('/app', (req, res, next) => {
  res.render('edit/app', {
    game: req.game,
  });
});

router.get('/meta', (req, res, next) => {
  res.render('edit/meta', {
    game: req.game,
  });
});

router.get('/api', (req, res, next) => {
  res.render('edit/api', {
    game: req.game,
  });
});

router.get('/license', (req, res, next) => {
  res.render('edit/license', {
    game: req.game,
  });
});

router.get('/public', (req, res, next) => {
  res.render('edit/public', {
    game: req.game,
  });
});


module.exports = router;
