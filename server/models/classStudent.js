const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Class = require("./class");
const Etudiant = require("./etudiant");

const ClassStudent = sequelize.define(
  "ClassStudent",
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
    studentCin: {
      type: DataTypes.STRING,
      references: {
        model: Etudiant,
        key: "Cin",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "class_student",
  }
);

Class.belongsToMany(Etudiant, {
  through: ClassStudent,
  foreignKey: "classCode",
});
Etudiant.belongsToMany(Class, {
  through: ClassStudent,
  foreignKey: "studentCin",
});

module.exports = ClassStudent;
