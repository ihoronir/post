'use strict';

const jsyaml = require('js-yaml');
const fs     = require('fs');

class Config {
  constructor() {}
  addFromPath(name, path) {
    let text = fs.readFileSync(path + '.yaml');
    let obj = jsyaml.load(text);
    this[name] = obj;
    return this;
  }
  addFromObject(name, obj) {
    this[name] = obj;
    return this;
  }
}

module.exports = Config;