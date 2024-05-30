const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Professeur = require('./professeur');
const Module = require('./module');

const ProfessorModule = sequelize.define('ProfessorModule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professorCin: {
    type: DataTypes.STRING,
    references: {
      model: Professeur,
      key: 'Cin',
    },
    allowNull: false,
  },
  moduleCode: {
    type: DataTypes.STRING,
    references: {
      model: Module,
      key: 'code',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'professor_module',
});

Professeur.belongsToMany(Module, { through: ProfessorModule, foreignKey: 'professorCin' });
Module.belongsToMany(Professeur, { through: ProfessorModule, foreignKey: 'moduleCode' });

module.exports = ProfessorModule;
