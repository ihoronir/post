'use strict';

const config = require('config');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Game = require('../../../../../../../db/models').game;
const loginFilter = require('../../../../../filters/login');
const editFilter = require('../../../../../filters/edit');
const extract = require('unzip').Extract;
const rmdir = require('rmdir');

const ZipDestDirectory = config.directory.uploads
  ? path.join(config.directory.uploads, './app-zip/')
  : path.join(__dirname, '../../../../../../../uploads/app-zip/');

const AppDestDirectory = config.directory.uploads
  ? path.join(config.directory.uploads, './app/')
  : path.join(__dirname, '../../../../../../../uploads/app/');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, ZipDestDirectory);
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(err, err ? undefined : raw.toString('hex') + '.zip');
    });
  }
});

const appUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1e7 // 10MB までに制限
  },
  fileFilter: (req, file, cb) => {
    // zip のみ受け付ける
    // これだけではゆるい？（どっちにしろ画像じゃなかったら zip-extract でエラーが出る）
    const mimetype = file.mimetype === 'application/zip';
    const extname = path.extname(file.originalname).toLowerCase() === '.zip';

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('File is not zip'));
    }
  }
}).single('app_zip');

module.exports = [
  loginFilter,
  editFilter,
  (req, res, next) => {
    appUpload(req, res, err => {
      if (err) {
        if (err.message === 'File too large' || err.message === 'File is not zip') {
          req.flash('validationErrAppZip', req.string.message.validationError.game.isAppZip);
          res.redirect('../app');
        } else {
          next(err);
        }
      } else if (!req.file) {
        req.flash('validationErrAppZip', req.string.message.validationError.game.emptyAppZip);
        res.redirect('../app');
      } else {
        next();
      }
    });
  },
  (req, res, next) => {
    // ZIP 解凍
    fs.createReadStream(req.file.path)
      .pipe(
        extract({
          path: path.join(AppDestDirectory, req.file.filename.slice(0, -4))
        })
      )
      .on('close', next)
      .on('error', err => {
        next(err);
        // 新ファイル削除
        fs.unlink(req.file.path, (/* err */) => {
          /* ログを残す */
        });
      });
  },
  (req, res, next) => {
    // 解凍成功した時
    const beforeSource = req.game.source;
    Game.update(
      {
        source: req.file.filename.slice(0, -4)
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        req.flash('successSaveChanges', req.string.message.success.saveChanges);
        res.redirect('../app');
        // 元ファイル削除
        if (beforeSource !== '') {
          fs.unlink(path.join(ZipDestDirectory, beforeSource + '.zip'), (/* err */) => {
            /* ログを残す */
          });
          rmdir(path.join(AppDestDirectory, beforeSource), (/* err */) => {
            /* ログを残す */
          });
        }
        return null; // Measure for Bluebird warning
      })
      .catch(err => {
        next(err);
        // 新ファイル削除
        fs.unlink(req.file.path, (/* err */) => {
          /* ログを残す */
        });
        return null; // Measure for Bluebird warning
      });
  }
];
