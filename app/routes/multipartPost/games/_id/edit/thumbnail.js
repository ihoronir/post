'use strict';

const config = require('config');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Game = require('../../../../../../db/models').game;
const thumbnailResizer = require('../../../../../../util/resizeImage').thumbnail;
const loginFilter = require('../../../../filters/login');
const editFilter = require('../../../../filters/edit');

const destDirectory = config.directory.uploads
  ? path.join(config.directory.uploads, './thumbnail/')
  : path.join(__dirname, '../../../../../../uploads/thumbnail/');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, destDirectory);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(err, err ? undefined : raw.toString('hex') + ext);
    });
  }
});

const thumbnailUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1e7 // 10MB までに制限
  },
  fileFilter: (req, file, cb) => {
    //console.log(fs.readFileSync());
    // 画像（png, jpg）のみ受け付ける
    // これだけではゆるい？（どっちにしろ画像じゃなかったら gm でエラーが出る）
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('File is not image'));
    }
  }
}).single('thumbnail_image');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    thumbnailUpload(req, res, err => {
      if (err) {
        if (err.message === 'File too large' || err.message === 'File is not image') {
          req.flash('validationErrThumbnailImage', req.string.message.validationError.game.isThumbnailImage);
          res.redirect('./info');
        } else {
          next(err);
        }
      } else if (!req.file) {
        req.flash('validationErrThumbnailImage', req.string.message.validationError.game.emptyThumbnailImage);
        res.redirect('./info');
      } else {
        thumbnailResizer(req.file.path)
          .then(() => {
            // リサイズ成功時
            const beforeThumbnailImage = req.game.thumbnailImage;
            Game.update(
              {
                thumbnailImage: req.file.filename
              },
              {
                where: {
                  id: req.params.id
                }
              }
            )
              .then(() => {
                req.flash('successSaveChanges', req.string.message.success.saveChanges);
                res.redirect('./info');
                // 元画像削除
                if (beforeThumbnailImage !== '') {
                  fs.unlink(path.join(destDirectory, beforeThumbnailImage), (/* err */) => {
                    /* ログを残す */
                  });
                }
                return null; // Measure for Bluebird warning
              })
              .catch(err => {
                next(err);
                // 新画像削除
                fs.unlink(req.file.path, (/* err */) => {
                  /* ログを残す */
                });
                return null; // Measure for Bluebird warning
              });
          })
          .catch(err => {
            // リサイズ失敗時
            next(err);
            // 新画像削除
            fs.unlink(req.file.path, (/* err */) => {
              /* ログを残す */
            });
          });
      }
    });
  }
];
