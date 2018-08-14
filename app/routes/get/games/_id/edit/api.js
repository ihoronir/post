'use strict';

const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    res.render('edit/api', {
      game: req.game
    });
  }
];
