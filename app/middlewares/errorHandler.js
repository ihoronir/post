'use strict';

module.exports = app => {
  // 404 以外のエラーハンドラ
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // エラーハンドラは独自の view を originalRender を使って出すのがよさそう

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
