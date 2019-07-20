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

const Tweet = sequelize.define('tweet', {
  tweet: Sequelize.STRING,
  title: Sequelize.STRING,
});

User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Tweet,
};