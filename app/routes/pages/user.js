var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user', {
    title: 'Express',
    authenticated: req.isAuthenticated()
  });
});

router.get('/:name', function(req, res, next) {
  res.send(req.params.name);
})

module.exports = router;
