'use strict';

const Config = require('./config');

const languages = new Config();
languages.addFromPath('ja', './languages/ja');

const pattern = new Config();
pattern.addFromPath('user', './pattern/user');

const config = new Config();
config.addFromPath('mariadb', './environment/devMariaDB')
      .addFromPath('redis'  , './environment/devRedis')
      .addFromPath('secret' , './environment/devSecrets')
      .addFromObject('pattern'  , pattern)
      .addFromObject('languages', languages);

module.exports = config;
