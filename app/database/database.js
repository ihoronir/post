var Sequelize = require('sequelize');

module.exports = function(config) {

  var sequelize = new Sequelize(
    config.mariadb.database,   // データベース
    config.mariadb.user,       // ユーザー
    config.mariadb.password,   // パスワード
    { dialect: 'mysql',        // mysql
      operatorsAliases: false} // operatorAliase は今の所使わない
  );

};