'use strict';

const config = require('config');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const User = require('../../../../db/models').user;
const avaterResizer = require('../../../../util/resizeImage').avater;
const router  = express.Router();

const destDirectory = config.directory.uploads ? path.join(config.directory.uploads, './avater/') : path.join(__dirname, '../../../../uploads/avater/');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destDirectory);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString('hex') + ext);
    });
  }
});

const avaterUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1e+7 // 10MB までに制限
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
}).single('avater_image');

router.post('/', (req, res, next) => {
  avaterUpload(req, res, err => {

    if (err) {
      if (err.message === 'File too large' || err.message === 'File is not image') {
        req.flash('validationErrAvaterImage', req.string.message.validationError.isAvaterImage);
        res.redirect('/settings/profile');
      } else {
        next(err);
      }

    } else if (!req.file) {

      req.flash('validationErrAvaterImage', req.string.message.validationError.emptyAvaterImage);
      res.redirect('/settings/profile');

    } else {

      avaterResizer(req.file.path).then(() => {
        // リサイズ成功時
        let beforeAvaterImage = req.user.avaterImage;
        User.update({
          avaterImage: req.file.filename
        }, {
          where: {
            id: req.user.id
          }
        }).then(() => {
          req.flash('successSaveChanges', req.string.message.success.saveChanges);
          res.redirect('/settings/profile');
          // 元画像削除
          if (beforeAvaterImage !== '') {
            fs.unlink(path.join(destDirectory, beforeAvaterImage), (/* err */) => {/* ログを残す */});
          }
          return null; // Measure for Bluebird warning
        }).catch(err => {
          next(err);
          // 新画像削除
          fs.unlink(req.file.path,  (/* err */) => {/* ログを残す */});
          return null; // Measure for Bluebird warning
        });
        
      }).catch(err => {
        // リサイズ失敗時
        next(err);
        // 新画像削除
        fs.unlink(req.file.path,  (/* err */) => {/* ログを残す */});
      });
    }
  });
});

module.exports = router;
