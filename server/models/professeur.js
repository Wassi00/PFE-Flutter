const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professeur = sequelize.define('Professeur', {
  Cin: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateDeNaissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lieuDeNaissance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresseEmailAcademique: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  diplome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'professeur',
});

module.exports = Professeur;
