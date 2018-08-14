'use strict';

const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [loginFilter, editFilter, (req, res, next) => {
  res.render('edit/info', {
    successSaveChanges      : req.flash('successSaveChanges')[0],
    validationErrTitle      : req.flash('validationErrTitle')[0],
    validationErrDescription: req.flash('validationErrDescription')[0],
    validationErrThumbnailImage: req.flash('validationErrThumbnailImage')[0],
    game: req.game
  });
}];
