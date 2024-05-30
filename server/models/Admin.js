const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  Cin: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  poste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAcademique: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'admin',
});

module.exports = Admin;
