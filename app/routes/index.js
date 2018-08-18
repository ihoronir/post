'use strict';

const path = require('path');
const csrf = require('csurf');
const fsRouter = require('fs-routing');

module.exports = app => {
  app.use(fsRouter('post', path.join(__dirname, './multipartPost/')));
  app.use(csrf());
  app.use(fsRouter('get', path.join(__dirname, './get/')));
  app.use(fsRouter('post', path.join(__dirname, './post/')));
};
