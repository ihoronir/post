'use strict'

const config = require('config');

module.exports = (req, res, next) => {
  req.lang = req.acceptsLanguages('en', 'ja');
  req.string = config.languages[req.lang];
  next();
}
