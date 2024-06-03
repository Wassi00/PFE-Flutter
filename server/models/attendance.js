const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Class = require("./class");
const Module = require("./module");
const Etudiant = require("./etudiant");

const Attendance = sequelize.define(
  "Attendance",
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
    moduleCode: {
      type: DataTypes.STRING,
      references: {
        model: Module,
        key: "code",
      },
      allowNull: false,
    },
    studentCin: {
      type: DataTypes.STRING,
      references: {
        model: Etudiant,
        key: "Cin",
      },
      allowNull: false,
    },
    attendanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["present", "absent"]],
      },
    },
  },
  {
    timestamps: true,
    tableName: "attendance",
  }
);

Class.belongsToMany(Etudiant, {
  through: Attendance,
  foreignKey: "classCode",
});
Etudiant.belongsToMany(Class, {
  through: Attendance,
  foreignKey: "studentCin",
});

module.exports = Attendance;
