'use strict';

const jsyaml = require('js-yaml');
const fs     = require('fs');
const path   = require('path');

class Config {
  constructor() {}
  addFromPath(name, file) {
    let text = fs.readFileSync(path.join(__dirname, file + '.yaml'));
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
