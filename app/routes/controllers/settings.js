'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../database/database').user;

router.post('/', (req, res) => {
  res.redirect('/');
});

router.post('/account', (req, res) => {
  User.update({
    screenName: req.body.screen_name
  }, {
    where: {
      id: req.user.id
    }
  }).then(result => {
  });
  res.redirect('/settings/account');
});

module.exports = router;
