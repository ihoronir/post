var Sequelize = require('sequelize');

module.exports = function() {

  // TODO ユーザ、パスワードなどの環境変数化
  // TODO Node-config を使う
  var sequelize = new Sequelize('データベース名', 'ゆーざー', 'ぱすわーど', {
    dialect:'mysql'
  });

}