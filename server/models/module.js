const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Formation = require("./formation");
const Department = require("./department");

const Module = sequelize.define(
  "Module",
  {
    code: { type: DataTypes.STRING, primaryKey: true },
    intitule: { type: DataTypes.STRING, allowNull: false },
    departement: {
      type: DataTypes.STRING,
      references: { model: Department, key: "code" },
      allowNull: false,
    },
    semester: {
      type: DataTypes.ENUM("S1", "S2", "S3", "S4", "S5", "S6"),
      allowNull: false,
    },
    formationCode: {
      type: DataTypes.STRING,
      references: { model: Formation, key: "Code" },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "module",
  }
);

Formation.hasMany(Module, { foreignKey: "formationCode" });
Module.belongsTo(Formation, { foreignKey: "formationCode" });
Department.hasMany(Module, { foreignKey: "departement" });
Module.belongsTo(Department, { foreignKey: "departement" });

module.exports = Module;
