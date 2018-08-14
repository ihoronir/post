'use strict';

const User      = require('../../../../db/models').user;
const encrypt   = require('../../../../util/hash').encrypt;
const saltgen   = require('../../../../util/hash').salt;
const uservalid = require('../../../../util/validation').user;
const loginFilter = require('../../filters/login');

module.exports = [loginFilter, (req, res, next) => {

  let errFlag = false;

  // 現在のパスワードチェック
  if (encrypt(req.body.current_password, req.user.passwordSalt) !== req.user.passwordHash) {
    req.flash('notMatchedPassword', req.string.message.error.notMatchedPassword);
    errFlag = true;
  }
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

    const passwordSalt = saltgen();
    const passwordHash = encrypt(req.body.new_password, passwordSalt);

    User.update({
      passwordHash: passwordHash,
      passwordSalt: passwordSalt
    }, {
      where: {
        id: req.user.id
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect('/settings/password');
      return null; // Measure for Bluebird warning
    }).catch(err => {
      next(err);
      return null; // Measure for Bluebird warning
    });

  }
    
}];
