'use strict';

const loginFilter = require('../../filters/login');

module.exports = [loginFilter, (req, res, next) => {
  res.render('settings/password', {
    successSaveChanges          : req.flash('successSaveChanges')[0],
    notMatchedPassword          : req.flash('notMatchedPassword')[0],
    validationErrPassword       : req.flash('validationErrPassword')[0],
    validationErrPasswordConfirm: req.flash('validationErrPasswordConfirm')[0]
  });
}];
