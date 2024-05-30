const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Formation = require('./formation');

const Module = sequelize.define('Module', {
  code: {
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
  formationCode: {
    type: DataTypes.STRING,
    references: {
      model: Formation,
      key: 'Code',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'module',
});

Formation.hasMany(Module, { foreignKey: 'formationCode' });
Module.belongsTo(Formation, { foreignKey: 'formationCode' });

module.exports = Module;
