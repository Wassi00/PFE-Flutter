const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const Attendance = require("../models/attendance");
const Etudiant = require("../models/etudiant");

router.post("/record-attendance", verifyToken, async (req, res) => {
  const { qrData, studentCin } = req.body;

  try {
    const { classId, professorCin, timestamp } = JSON.parse(qrData);

    // Validate student presence
    const student = await Etudiant.findOne({ where: { Cin: studentCin } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Record attendance
    const attendance = await Attendance.create({
      classCode: classId,
      moduleCode: professorCin,
      studentCin,
      attendanceDate: new Date(timestamp),
      status: "present",
    });

    res.json({ message: "Attendance recorded", attendance });
  } catch (error) {
    res.status(500).json({ error: "Failed to record attendance" });
  }
});

module.exports = router;
