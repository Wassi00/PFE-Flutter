const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Formation = require('./formation');

const Etudiant = sequelize.define('Etudiant', {
  Cin: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Cne: {
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
  tableName: 'etudiant',
});

Formation.hasMany(Etudiant, { foreignKey: 'formationCode' });
Etudiant.belongsTo(Formation, { foreignKey: 'formationCode' });

module.exports = Etudiant;
