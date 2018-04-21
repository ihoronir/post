var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'Express',
    csrftoken: req.csrfToken(),
    authenticated: req.isAuthenticated()
  });
});

module.exports = router;
