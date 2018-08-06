'use strict';

const path         = require('path');
const express      = require('express');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const logger       = require('morgan');
const flash        = require('connect-flash');
const csrf         = require('csurf');


// ------------------------------ 設定ファイル ------------------------------

// 開発用
process.env.NODE_ENV = 'development';

const config = require('config');



// ------------------------------ データベース接続 ------------------------------

const sequelize = require('../db/models').sequelize;

sequelize.sync({force: false});



// ------------------------------ アプリケーション作成 ------------------------------

const app = express();

// テンプレートフォルダを指定
app.set('views', path.join(__dirname, '../views'));

// strict ルーティング 調査中
app.set('strict routing', true);

// X-Powered-By ヘッダを無効に
app.set('x-powered-by', false);

// render 設定 & 拡張
require('./expand/render')(app);



// ------------------------------ ミドルウェア ------------------------------

app.use(logger('dev')); // ログを表示

app.use(express.static(path.join(__dirname, '../public'))); // 静的リソース

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(config.secret.cookie));

// session
require('./middlewares/session')(app);

// flash
app.use(flash());

// lang
app.use(require('./middlewares/language'));

// passport 関連
require('./middlewares/passport')(app);

// multipart
require('./routes/multipart')(app);

// csrf
app.use(csrf());

// ルーティング
require('./routes')(app);

// エラーハンドラ
require('./middlewares/notFoundHandler')(app); // 404
require('./middlewares/errorHandler')(app);    // 404 以外

module.exports = app;
