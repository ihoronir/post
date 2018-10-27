'use strict';

// import 文を使ってstyle.cssファイルを読み込む。
import './stylesheets/style.sass';

// import 文を使って sub.js ファイルを読み込む。
import { hello } from './scripts/sub';

import { a } from './scripts/components/form';

const Turbolinks = require('turbolinks');
Turbolinks.start();

// sub.jsに定義されたJavaScriptを実行する。
hello();

window.onload = () => {
  console.log(a);
  a();
};
