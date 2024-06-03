const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Formation = require("./formation");

const Class = sequelize.define(
  "Class",
  {
    code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formationCode: {
      type: DataTypes.STRING,
      references: {
        model: Formation,
        key: "Code",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "class",
  }
);

Formation.hasMany(Class, { foreignKey: "formationCode" });
Class.belongsTo(Formation, { foreignKey: "formationCode" });

module.exports = Class;
