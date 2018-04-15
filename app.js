/*
 * app.js メインアプリケーションプログラム
 */


// ------------------------------ モジュールの読み込み ------------------------------

var createError   = require('http-errors');             // エラー作成
var path          = require('path');                    // パスユーティリティ

var express       = require('express');                 // express 本体
var cookieParser  = require('cookie-parser');           // express クッキー
var bodyParser    = require('body-parser');             // express body parser
var logger        = require('morgan');                  // express logger
var session       = require('express-session');         // express session

var passport      = require('passport');                // passport 本体



// ------------------------------ router モジュールを読み込み ------------------------------

var indexRouter = require('./routes/index'); // / (index)
var loginRouter = require('./routes/login'); // /login
//var usersRouter = require('./routes/users');



// ------------------------------ アプリケーション作成 ------------------------------

var app = express();

// テンプレートフォルダを指定
app.set('views', path.join(__dirname, 'views'));

// テンプレートエンジンを指定
app.set('view engine', 'jade');



// ------------------------------ ミドルウェア ------------------------------

app.use(logger('dev')); // ログを表示

app.use(express.json());                          // express.json
app.use(express.urlencoded({ extended: false })); // urlencoded
app.use(cookieParser());                          // cookieParser

app.use(express.static(path.join(__dirname, 'public'))); // 静的リソース

// express session
app.use(session({
  secret: 'sdahnviahavpinav',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  } 
}));

// passport 関連
require('./config/passport/passport')(); // passport の設定
app.use(passport.initialize());          // passport initialize
app.use(passport.session());             // passport session


// ルーティング

require('./config/routes/route')(app);

//app.use('/users', usersRouter);


// 404 エラーハンドラ

app.use(function(req, res, next) {
  next(createError(404));
});


// 404 以外のエラーハンドラ
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
