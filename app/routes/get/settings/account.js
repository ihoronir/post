'use strict';

const loginFilter = require('../../filters/login');

module.exports = [
  loginFilter,
  (req, res, next) => {
    res.render('settings/account', {
      successSaveChanges: req.flash('successSaveChanges')[0],
      validationErrScreenName: req.flash('validationErrScreenName')[0]
    });
  }
];
