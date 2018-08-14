'use strict';

const User = require('../../../../../db/models').user;
const createError = require('http-errors');

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      screenName: req.params.screenName
    }
  })
    .then(user => {
      if (!user) {
        return next(createError(404));
      }

      res.render('user', {
        profile: user
      });
      return null; // Measure for Bluebird warning
    })
    .catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });
};
