'use strict';

const loginFilter = require('../filters/login');

module.exports = [
  loginFilter,
  (req, res, next) => {
    res.render('upload', {
      validationErrTitle: req.flash('validationErrTitle')[0]
    });
  }
];
