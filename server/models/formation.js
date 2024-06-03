const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./department");

const Formation = sequelize.define(
  "Formation",
  {
    Code: { type: DataTypes.STRING, primaryKey: true },
    intitulé: { type: DataTypes.STRING, allowNull: false },
    departement: {
      type: DataTypes.STRING,
      references: { model: Department, key: "code" },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "formation",
  }
);

Department.hasMany(Formation, { foreignKey: "departement" });
Formation.belongsTo(Department, { foreignKey: "departement" });

module.exports = Formation;
