'use strict';

const path = require('path');

module.exports = (req, res, next) => {
  const infoUrl = path.join(req.originalUrl, 'info');
  res.redirect(infoUrl);
};
