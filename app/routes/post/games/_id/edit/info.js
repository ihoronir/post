'use strict';

const sequelize = require('../../../../../../db/models').sequelize;
const Game = require('../../../../../../db/models').game;
const Tag = require('../../../../../../db/models').tag;
const gamevalid = require('../../../../../../util/validation').game;
const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    let errFlag = false;

    // タイトル
    if (!req.body.title) {
      req.flash('validationErrTitle', req.string.message.validationError.game.emptyTitle);
      errFlag = true;
    } else if (!gamevalid.isTitle(req.body.title)) {
      req.flash('validationErrTitle', req.string.message.validationError.game.isTitle);
      errFlag = true;
    }

    // タグ
    {
      const tags = req.body.tags.split(',');
      const len = tags.length;
      if (len > 10) {
        req.flash('validationErrTags', req.string.message.validationError.game.isTags);
        errFlag = true;
      } else {
        for (let i = 0, l = tags.length; i < l; i++) {
          tags[i] = tags[i].trim();
        }
        req.tagsArr = tags.filter(tag => !!tag);
      }
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
      next();
    }
  },
  (req, res, next) => {
    // タグのゴミが残ってしまう。要検討
    sequelize
      .transaction(tx => {
        const promises1 = [];
        const promises2 = [];
        for (let i = 0; i < req.tagsArr.length; i++) {
          promises2.push(
            Tag.findOrCreate({
              where: {
                name: req.tagsArr[i]
              },
              transaction: tx
            })
          );
        }
        promises1.push(
          Promise.all(promises2).then(tags => {
            const tagsList = [];
            for (let i = 0; i < tags.length; i++) {
              tagsList.push(tags[i][0]);
            }
            return req.game.setTags(tagsList, { transaction: tx });
          })
        );
        promises1.push(
          Game.update(
            {
              title: req.body.title,
              description: req.body.description
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
        );
        return Promise.all(promises1);
      })
      .then(() => {
        req.flash('successSaveChanges', req.string.message.success.saveChanges);
        res.redirect(req.originalUrl);
      })
      .catch(err => {
        next(err);
      });
  }
];
