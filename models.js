const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'auth_lab_db',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = {
  sequelize,
  User,
};