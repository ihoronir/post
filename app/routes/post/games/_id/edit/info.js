'use strict';

const Game      = require('../../../../../../db/models').game;
const gamevalid = require('../../../../../../util/validation').game;

module.exports = (req, res, next) => {

  let errFlag = false;

  // タイトル
  if (!req.body.title) {
    req.flash('validationErrTitle', req.string.message.validationError.emptyTitle);
    errFlag = true;
  } else if (!gamevalid.isTitle(req.body.title)) {
    req.flash('validationErrTitle', req.string.message.validationError.isTitle);
    errFlag = true;
  }
  // 説明文
  if (!req.body.description) {
    req.flash('validationErrDescription', req.string.message.validationError.emptyDescription);
    errFlag = true;
  } else if (!gamevalid.isDescription(req.body.description)) {
    req.flash('validationErrDescription', req.string.message.validationError.isDescription);
    errFlag = true;
  }

  if (errFlag) {
    res.redirect(req.originalUrl);
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
  
    
};
