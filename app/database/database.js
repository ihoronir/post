var Sequelize = require('sequelize');
var config = require('config');

var sequelize = new Sequelize(
  config.mariadb.database,    // データベース
  config.mariadb.user,        // ユーザー
  config.mariadb.password,    // パスワード
  { dialect: 'mysql',         // mysql
    operatorsAliases: false,  // operatorAliase は今の所使わない
    //logging: false,
  }
);

module.exports = {
  sequelize: sequelize,
  user: require('./models/user')(sequelize),
  games: require('./models/game')(sequelize)
};

/*
var User = require('./models/user')(sequelize);

sequelize.sync({force: true}).then(function(err) {
  User.build({
    id: 1,
    name: 'shioleap',
    screenName: 'shioleap_view',
    email: 'shiotsuka.iroha@gmail.com',
    password: 'password'
  }).save().then(function(err) {
    User.findAll().then(function(users) {
      console.log(users[0].name);
    });
  });
}).catch(function(err) {
  console.log('An error occurred while creating the table:', err);
});
*/