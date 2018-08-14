'use strict';

const loginFilter = require('../../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  res.render('settings/profile', {
    successSaveChanges      : req.flash('successSaveChanges')[0],
    validationErrName       : req.flash('validationErrName')[0],
    validationErrDescription: req.flash('validationErrDescription')[0],
    validationErrUrl        : req.flash('validationErrUrl')[0],
    validationErrLocation   : req.flash('validationErrLocation')[0],
    validationErrAvaterImage: req.flash('validationErrAvaterImage')[0]
  });
}];
