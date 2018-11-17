'use strict';

const bcrypt = require('bcrypt');
const User = require('../../../../db/models').user;
const uservalid = require('../../../../util/validation').user;
const loginFilter = require('../../filters/login');

module.exports = [
  loginFilter,
  (req, res, next) => {
    bcrypt.compare(req.body.current_password, req.user.passwordHash, (err, same) => {
      if (err) {
        next(err);
      } else if (same) {
        next();
      } else {
        req.flash('notMatchedPassword', req.string.message.error.notMatchedPassword);
        res.redirect('/settings/password');
      }
    });
  },
  (req, res, next) => {
    let errFlag = false;

    // パスワード
    if (!req.body.new_password) {
      req.flash('validationErrPassword', req.string.message.validationError.user.emptyPassword);
      errFlag = true;
    } else if (!uservalid.isPassword(req.body.new_password)) {
      req.flash('validationErrPassword', req.string.message.validationError.user.isPassword);
      errFlag = true;
    } else if (req.body.new_password !== req.body.new_password_confirm) {
      req.flash('validationErrPasswordConfirm', req.string.message.validationError.user.matchedPassword);
      errFlag = true;
    }

    if (errFlag) {
      res.redirect('/settings/password');
    } else {
      next();
    }
  },
  (req, res, next) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
      } else {
        bcrypt.hash(req.body.new_password, salt, (err, hash) => {
          if (err) {
            next(err);
          } else {
            req.passwordHash = hash;
            next();
          }
        });
      }
    });
  },
  (req, res, next) => {
    User.update(
      {
        passwordHash: req.passwordHash
      },
      {
        where: {
          id: req.user.id
        }
      }
    )
      .then(() => {
        req.flash('successSaveChanges', req.string.message.success.saveChanges);
        res.redirect('/settings/password');
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
        next(err);
        return null; // Measure for Bluebird warning
      });
  }
];
