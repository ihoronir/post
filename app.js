/*
 * モジュールの読み込み
 */
// エラーつくるやつ
var createError = require('http-errors');
// express
var express = require('express');
// パスユーティリティ
var path = require('path');
// クッキー使えるようにするやつ
var cookieParser = require('cookie-parser');
// body parser
var bodyParser = require('body-parser');
// ログ残すやつ
var logger = require('morgan');
// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// session
var session = require('express-session');

/**
 * 認証
 */
passport.use(new LocalStrategy(function(username, password, done){
  return done(null, 'shioleap');
}));

// 認証ずみ出なかったら login へリダイレクト
function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {  // 認証済
    return next();
  }
  else {  // 認証されていない
    res.redirect('/login');  // ログイン画面に遷移
  }
}

// シリアライズ
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*
 * ルーターモジュールの読み込み
 */
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
//var usersRouter = require('./routes/users');


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

// いるやつ
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookieParser クッキーを使えるようにする
app.use(cookieParser());

// passport
app.use(passport.initialize());

//static ファイル
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング
app.use('/', indexRouter);
app.use('/login', loginRouter);
//app.use('/users', usersRouter);
app.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/');
})


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
