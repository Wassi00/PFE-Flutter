const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const ClassProfessor = require("../models/classProfessor");
const Class = require("../models/class");
const Module = require("../models/module");
const AttendanceSession = require("../models/attendanceSession");
const StudentAttendance = require("../models/studentAttendance");
const Student = require("../models/etudiant");
const classStudent = require("../models/classStudent");
const { verifyToken } = require("../middleware/auth");

router.post("/generate-qr", verifyToken, async (req, res) => {
  const { classId, moduleId } = req.body;
  const professorCin = req.user.id;

  try {
    const sessionId = Date.now().toString();

    const classCode = classId;

    const attendanceSession = await AttendanceSession.create({
      classCode,
      moduleCode: moduleId,
      professorCin,
      sessionId,
    });

    // Getting ids of the students of this class
    const studentIds = await classStudent.findAll({
      where: { classCode },
      attributes: ["studentCin"],
    });

    // Fetch all students in the class
    const students = [];

    for (let i = 0; i < studentIds.length; i++) {
      const student = await Student.findByPk(studentIds[i].studentCin);
      students.push(student);
    }

    // Create StudentAttendance records with verified: false
    const attendanceRecords = students.map((student) => ({
      sessionId: attendanceSession.sessionId,
      studentId: student.Cin,
      verified: false,
    }));
    await StudentAttendance.bulkCreate(attendanceRecords);

    const qrData = JSON.stringify({
      sessionId: attendanceSession.sessionId,
    });
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Get assigned classes
router.get("/qr/assignedClasses", verifyToken, async (req, res) => {
  const professorCin = req.user.id; // Assuming the CIN is in the JWT token payload
  try {
    const classesP = await ClassProfessor.findAll({
      where: { professorCin },
    });

    const classes = [];

    for (let i = 0; i < classesP.length; i++) {
      const classe = await Class.findByPk(classesP[i].classCode);
      classes.push(classe);
    }

    res.json(classes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Get assigned modules
router.get("/qr/assigned-modules/:classCode", verifyToken, async (req, res) => {
  const { classCode } = req.params;
  const professorCin = req.user.id;
  try {
    const modulesP = await ClassProfessor.findAll({
      where: { classCode, professorCin },
    });

    const modules = [];

    for (let i = 0; i < modulesP.length; i++) {
      const module = await Module.findByPk(modulesP[i].moduleCode);
      modules.push(module);
    }

    res.json(modules);
  } catch (error) {
    console.log("error is: " + error);
    res.status(500).json({ error: "Failed to fetch assigned modules" });
  }
});

module.exports = router;
