const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "u794719409_attendance_db",
  "u794719409_attendanceuser",
  "6I=grelj",
  {
    host: "srv1174.hstgr.io",
    dialect: "mysql",
  }
);

module.exports = sequelize;
