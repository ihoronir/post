'use strict';

const Config = require('./config');

const languages = new Config();
languages.addFromPath('ja', './languages/ja');

const config = new Config();
config.addFromPath('mariadb' , './environment/devMariaDB')
      .addFromPath('secret'  , './environment/devSecrets')
      .addFromObject('languages', languages);

module.exports = config;
