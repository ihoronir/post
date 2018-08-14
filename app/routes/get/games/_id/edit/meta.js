'use strict';

const loginFilter = require('../../../../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  res.render('edit/meta', {
    game: req.game,
  });
}];
