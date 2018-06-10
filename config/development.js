const path   = require('path');
const Config = require('./config');
const config = new Config();


config.addFromPath('mariadb', path.join(__dirname, './environment/devMariadb'))
      .addFromPath('secret' , path.join(__dirname, './environment/devSecret'));


module.exports = config;