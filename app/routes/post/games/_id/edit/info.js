'use strict';

const Game      = require('../../../../../../db/models').game;
const gamevalid = require('../../../../../../util/validation').game;
const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [loginFilter, editFilter, (req, res, next) => {

  let errFlag = false;

  // タイトル
  if (!req.body.title) {
    req.flash('validationErrTitle', req.string.message.validationError.game.emptyTitle);
    errFlag = true;
  } else if (!gamevalid.isTitle(req.body.title)) {
    req.flash('validationErrTitle', req.string.message.validationError.game.isTitle);
    errFlag = true;
  }
  // 説明文
  if (!req.body.description) {
    req.flash('validationErrDescription', req.string.message.validationError.game.emptyDescription);
    errFlag = true;
  } else if (!gamevalid.isDescription(req.body.description)) {
    req.flash('validationErrDescription', req.string.message.validationError.game.isDescription);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect('./info');
  } else {
    Game.update({
      title: req.body.title,
      description: req.body.description
    }, {
      where: {
        id: req.params.id,
      }
    }).then(() => {
      req.flash('successSaveChanges', req.string.message.success.saveChanges);
      res.redirect(req.originalUrl);
      return null; // Measure for Bluebird warning
    }).catch(err => {
      next(err); 
      return null; // Measure for Bluebird warning
    });
  }
  
    
}];
