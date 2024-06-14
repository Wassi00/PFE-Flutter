const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AttendanceSession = require("./attendanceSession");
const Student = require("./etudiant");

const StudentAttendance = sequelize.define(
  "StudentAttendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      references: {
        model: AttendanceSession,
        key: "sessionId",
      },
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      references: {
        model: Student,
        key: "cin",
      },
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "student_attendance",
  }
);

AttendanceSession.hasMany(StudentAttendance, { foreignKey: "sessionId" });
StudentAttendance.belongsTo(AttendanceSession, { foreignKey: "sessionId" });

Student.hasMany(StudentAttendance, { foreignKey: "studentId" });
StudentAttendance.belongsTo(Student, { foreignKey: "studentId" });

module.exports = StudentAttendance;
