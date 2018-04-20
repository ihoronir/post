module.exports = function(sequelize) {

  sequelize.define('users', {
    id: {
      type: Sequelize.STRING.BINARY,
      primaryKey: true
    }
  });
  
};