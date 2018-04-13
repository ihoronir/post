// モジュールの読み込み
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ルーターモジュールの読み込み
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// アプリケーション作成
var app = express();

// view engine setup
// テンプレートフォルダを指定
app.set('views', path.join(__dirname, 'views'));
// テンプレートエンジンを指定
app.set('view engine', 'jade');

/*
 * ミドルウェア
 */

// ログを表示
app.use(logger('dev'));
// ?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookieParser
app.use(cookieParser());

//static ファイル
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 404エラー
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// エラーハンドラ
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
