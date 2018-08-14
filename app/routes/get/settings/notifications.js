'use strict';

const loginFilter = require('../../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  res.render('settings/notifications', {
    successSaveChanges: req.flash('successSaveChanges')[0],
    validationErrEmail: req.flash('validationErrEmail')[0]
  });
}];
