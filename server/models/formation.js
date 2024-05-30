const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Formation = sequelize.define('Formation', {
  Code: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  intitule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'formation',
});

module.exports = Formation;
