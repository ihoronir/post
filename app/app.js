'use strict';

/*
 * app.js アプリケーションプログラム
 */


// ------------------------------ モジュールの読み込み ------------------------------

const path          = require('path');                    // パスユーティリティ

const express       = require('express');                 // express 本体
const cookieParser  = require('cookie-parser');           // express クッキー
const bodyParser    = require('body-parser');             // express body parser
const logger        = require('morgan');                  // express logger
const csrf          = require('csurf');                   // express csrf 対策
const flash         = require('connect-flash');           // express flash



// ------------------------------ 設定ファイル ------------------------------

// 開発用
process.env.NODE_ENV = 'development';

const config = require('config');



// ------------------------------ データベース接続 ------------------------------

const sequelize = require('./database/database').sequelize;

sequelize.sync({force: true});

//- TODO validate チェック & sequelize に validate をまかせる
const User = require('./database/database').user;
User.build({
  screenName: 'sssss',
  name: 'req.body.name',
  email: 'shioleap@body.email',
  emailHash: 'emailHash',
  password: 'password',
  passwordSalt: 'salt'
}).save().then(() => {
  console.log('success');

}).catch((err) => {
  console.log(err);

});



// ------------------------------ アプリケーション作成 ------------------------------

const app = express();

// テンプレートフォルダを指定
app.set('views', path.join(__dirname, '../views'));

// strict ルーティング 調査中
app.set('strict routing', true);

// X-Powered-By ヘッダを無効に
app.set('x-powered-by', false);

// render 設定 & 拡張
require('./render/render')(app);


// ------------------------------ ミドルウェア ------------------------------

app.use(logger('dev')); // ログを表示

app.use(express.static(path.join(__dirname, '../public'))); // 静的リソース

app.use(bodyParser.urlencoded({ extended: false })); // urlencoded
app.use(bodyParser.json());                          // json
app.use(cookieParser(config.secret.cookie));         // cookieParser

// session
require('./middlewares/session')(app);

// csrf 対策
app.use(csrf());

// flash
app.use(flash());

// lang
app.use(require('./middlewares/language'));

// passport 関連
require('./passport/passport')(app);

// ルーティング
require('./routes/route')(app);

// エラーハンドラ
require('./middlewares/notFoundHandler')(app); // 404
require('./middlewares/errorHandler')(app);    // 404 以外

module.exports = app;
