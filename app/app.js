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
var csrf          = require('csurf');                   // express csrf 対策

var passport      = require('passport');                // passport 本体


// ------------------------------ 設定ファイル ------------------------------

// 開発用
process.env.NODE_ENV = 'development';

var config = require('config');

// ------------------------------ アプリケーション作成 ------------------------------

var app = express();

// テンプレートフォルダを指定
app.set('views', path.join(__dirname, '../views'));

// テンプレートエンジンを指定
app.set('view engine', 'jade');

// X-Powered-By ヘッダを無効に
app.disable('x-powered-by');


// ------------------------------ データベース接続 ------------------------------

// require('./database/database')(config);

var User = require('./database/database').user;

var sequelize = require('./database/database').sequelize;

sequelize.sync({force: true})/*.then(function(err) {
  User.build({
    name: 'shioleapdayo',
    screenName: 'shioleap_view',
    email: 'shiotsuka.iroha@gmail.com',
    password: 'password'
  }).save().then(function(err) {
    User.findAll().then(function(users) {
      console.log(users[0].name);
    });
  });
}).catch(function(err) {
  console.log('An error occurred while creating the table:', err);
});*/



// ------------------------------ ミドルウェア ------------------------------

app.use(logger('dev')); // ログを表示

app.use(bodyParser.json());                          // json
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded
app.use(cookieParser(config.secret.cookie));         // cookieParser

app.use(express.static(path.join(__dirname, '../public'))); // 静的リソース

// express session
app.use(session({
  secret: config.secret.session,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

// csrf 対策
app.use(csrf());

// passport 関連
require('./passport/passport')(); // passport の設定
app.use(passport.initialize());   // passport initialize
app.use(passport.session());      // passport session

// ルーティング （コントローラーに分離するかも）
require('./routes/route')(app);

// エラーハンドラ
require('./middlewares/notFoundHandler')(app); // 404
require('./middlewares/errorHandler')(app);    // 404 以外

module.exports = app;
