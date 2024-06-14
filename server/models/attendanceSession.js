const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Class = require("./class");
const Professeur = require("./professeur");
const Module = require("./module");

const AttendanceSession = sequelize.define(
  "AttendanceSession",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    classCode: {
      type: DataTypes.STRING,
      references: {
        model: Class,
        key: "code",
      },
      allowNull: false,
    },
    professorCin: {
      type: DataTypes.STRING,
      references: {
        model: Professeur,
        key: "Cin",
      },
      allowNull: false,
    },
    moduleCode: {
      type: DataTypes.STRING,
      references: {
        model: Module,
        key: "code",
      },
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "attendance_session",
  }
);

Class.hasMany(AttendanceSession, { foreignKey: "classCode" });
AttendanceSession.belongsTo(Class, { foreignKey: "classCode" });

Professeur.hasMany(AttendanceSession, { foreignKey: "professorCin" });
AttendanceSession.belongsTo(Professeur, { foreignKey: "professorCin" });

Module.hasMany(AttendanceSession, { foreignKey: "moduleCode" });
AttendanceSession.belongsTo(Module, { foreignKey: "moduleCode" });

module.exports = AttendanceSession;
