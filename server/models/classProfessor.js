const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Class = require("./class");
const Professeur = require("./professeur");
const Module = require("./module");

const ClassProfessor = sequelize.define(
  "ClassProfessor",
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
  },
  {
    timestamps: false,
    tableName: "class_professor",
  }
);

Class.belongsToMany(Professeur, {
  through: ClassProfessor,
  foreignKey: "classCode",
});
Professeur.belongsToMany(Class, {
  through: ClassProfessor,
  foreignKey: "professorCin",
});

module.exports = ClassProfessor;
