const express = require('express');
const router = express.Router();

const render = require('../render');

router.get('/', function(req, res, next) {
  render('settings/index', req, res, next);
});

router.get('/account', function(req, res, next) {
  render('settings/account', req, res, next);
})

router.get('/password', function(req, res, next) {
  render('settings/password', req, res, next);
})

router.get('/profile', function(req, res, next) {
  render('settings/profile', req, res, next);
})

router.get('/notifications', function(req, res, next) {
  render('settings/notifications', req, res, next);
})

module.exports = router;
