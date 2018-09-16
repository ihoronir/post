'use strict';

const MODE = process.NODE_ENV || 'development';
const ENABLED_SOURCEMAP = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: `./src/index.js`,
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/public/scripts`,
    // 出力ファイル名
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.sass/,
        use: [
          // style-loader
          'style-loader',
          // css-loader
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: ENABLED_SOURCEMAP
            }
          },
          // postcss-loader
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: ENABLED_SOURCEMAP,
              plugins: [require('autoprefixer')({ grid: true })]
            }
          },
          // sass-loader
          {
            loader: 'sass-loader',
            options: {
              sourceMap: ENABLED_SOURCEMAP
            }
          }
        ]
      }
    ]
  }
};
