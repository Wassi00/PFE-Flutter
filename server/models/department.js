const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "Department",
  {
    code: { type: DataTypes.STRING(10), primaryKey: true },
    intitule: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "department",
  }
);

module.exports = Department;
