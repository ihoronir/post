const express = require('express');
const router = express.Router();

const passport = require('passport');

router.post('/', (req, res, next) => {
  const redirectURL = decodeURIComponent(req.body.redirect_to) || '/';
  passport.authenticate('local', {
    successRedirect: redirectURL,
    failureRedirect: '/login'
  })(req, res, next);
});

module.exports = router;
