const createError = require('http-errors');

module.exports = function(app) {
  // 404 エラーハンドラ
  app.use((req, res, next) => {
    next(createError(404));
  });
};