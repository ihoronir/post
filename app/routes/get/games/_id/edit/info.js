'use strict';

const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    let gameTags = [];
    for (let i = 0; i < req.game.tags.length; i++) {
      gameTags.push(req.game.tags[i].name);
    }
    res.render('edit/info', {
      successSaveChanges: req.flash('successSaveChanges')[0],
      validationErrTitle: req.flash('validationErrTitle')[0],
      validationErrTags: req.flash('validationErrTags')[0],
      validationErrDescription: req.flash('validationErrDescription')[0],
      validationErrThumbnailImage: req.flash('validationErrThumbnailImage')[0],
      game: req.game,
      gameTags: gameTags.join(', ')
    });
  }
];
