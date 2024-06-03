const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./department");

const Professeur = sequelize.define(
  "Professeur",
  {
    Cin: { type: DataTypes.STRING, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    spécialité: { type: DataTypes.STRING, allowNull: false },
    departement: {
      type: DataTypes.STRING(10),
      references: { model: Department, key: "code" },
      allowNull: false,
    },
    date_de_naissance: { type: DataTypes.DATE, allowNull: false },
    lieu_de_naissance: { type: DataTypes.STRING, allowNull: false },
    adresse_email_academique: { type: DataTypes.STRING, allowNull: false },
    diplome: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
    tableName: "professeur",
  }
);

Department.hasMany(Professeur, { foreignKey: "departement" });
Professeur.belongsTo(Department, { foreignKey: "departement" });

module.exports = Professeur;
