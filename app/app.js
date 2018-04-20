/*
 * app.js アプリケーションプログラム
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



// ------------------------------ アプリケーション作成 ------------------------------

var app = express();

// テンプレートフォルダを指定
app.set('views', path.join(__dirname, '../views'));

// テンプレートエンジンを指定
app.set('view engine', 'jade');



// ------------------------------ ミドルウェア ------------------------------

app.use(logger('dev')); // ログを表示

app.use(bodyParser.json());                          // json
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded
app.use(cookieParser());                             // cookieParser

app.use(express.static(path.join(__dirname, '../public'))); // 静的リソース

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
require('./passport/passport')(); // passport の設定
app.use(passport.initialize());          // passport initialize
app.use(passport.session());             // passport session

// ルーティング （コントローラーに分離するかも）
require('./routes/route')(app);

// エラーハンドラ
require('./middlewares/notFoundHandler')(app); // 404
require('./middlewares/errorHandler')(app);    // 404 以外

module.exports = app;
