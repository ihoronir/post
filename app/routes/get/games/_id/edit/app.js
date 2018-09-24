'use strict';

const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    res.render('edit/app', {
      validationErrAppZip: req.flash('validationErrAppZip')[0],
      game: req.game
    });
  }
];
