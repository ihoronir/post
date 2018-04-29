var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
  res.render('user', {
    title: 'Express',
    authenticated: req.isAuthenticated()
  });
});

module.exports = router;
