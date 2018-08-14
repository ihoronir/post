'use strict';

const fs = require('fs');
const path = require('path');
const csrf = require('csurf');
const express = require('express');

const walk = (p, fileCallback) => {
  const files = fs.readdirSync(p);

  files.forEach(f => {
    const fp = path.join(p, f);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp, fileCallback);
    } else {
      fileCallback(fp);
    }
  });
};

const fsRouter = (method, dir) => {
  const router = express.Router();
  walk(dir, filePath => {
    const url =
      '/' +
      path
        .relative(dir, filePath)
        .slice(0, -3)
        .replace(/_/g, ':')
        .replace(/index/g, '')
        .replace(/\/$/, '');

    const routes = require(filePath);
    if (routes instanceof Array) {
      router[method](url, ...routes);
    } else {
      router[method](url, routes);
    }
  });
  return router;
};

module.exports = app => {
  app.use(fsRouter('post', path.join(__dirname, './multipartPost/')));
  app.use(csrf());
  app.use(fsRouter('get', path.join(__dirname, './get/')));
  app.use(fsRouter('post', path.join(__dirname, './post/')));
};
