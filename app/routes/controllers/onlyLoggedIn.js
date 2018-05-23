var express = require('express');
var url = require('url');
var router = express.Router();

router.use('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect(url.format({
      pathname: '/login', 
      query: { redirect_to: decodeURIComponent('/user/shioleap') }
    }));
  }
});

module.exports = router;