const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('attendance_db', 'root', 'root2024', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
