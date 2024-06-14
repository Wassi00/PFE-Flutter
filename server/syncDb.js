const sequelize = require("./config/database");
const attendanceSession = require("./models/attendanceSession");
const studentAttendance = require("./models/studentAttendance");
const admin = require("./models/admin");
const attendance = require("./models/attendance");
const Class = require("./models/class");
const classProfessor = require("./models/classProfessor");
const classStudent = require("./models/classStudent");
const department = require("./models/department");
const etudiant = require("./models/etudiant");
const formation = require("./models/formation");
const professeur = require("./models/professeur");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});
