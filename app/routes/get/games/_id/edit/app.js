'use strict';

const loginFilter = require('../../../../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  res.render('edit/app', {
    game: req.game,
  });
}];
