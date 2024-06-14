const express = require("express");
const router = express.Router();
const AttendanceSession = require("../models/attendanceSession");
const Module = require("../models/module");
const Class = require("../models/class");
const StudentAttendance = require("../models/studentAttendance");
const Professeur = require("../models/professeur");
const Etudiant = require("../models/etudiant");
const { verifyToken } = require("../middleware/auth");
const { where } = require("sequelize");
const { Op } = require("sequelize");

router.post("/verify-attendance", async (req, res) => {
  const { sessionId, studentId } = req.body;

  try {
    const studentAttendance = await StudentAttendance.findOne({
      where: { sessionId, studentId },
    });

    if (!studentAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    studentAttendance.verified = true;
    await studentAttendance.save();

    res.json({ message: "Attendance verified successfully" });
  } catch (error) {
    console.error("Error verifying attendance:", error);
    res.status(500).json({ error: "Failed to verify attendance" });
  }
});

router.get("/attendance-log", verifyToken, async (req, res) => {
  const studentId = req.user.cin;

  try {
    const attendanceRecords = await StudentAttendance.findAll({
      where: { studentId, verified: true },
      include: [
        {
          model: AttendanceSession,
          include: [
            { model: Class, attributes: ["name"] },
            { model: Module, attributes: ["intitule"] },
            { model: Professeur, attributes: ["nom", "prenom"] },
          ],
        },
      ],
    });

    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance log:", error);
    res.status(500).json({ error: "Failed to fetch attendance log" });
  }
});

router.get("/absences/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    const absences = await StudentAttendance.findAll({
      where: {
        studentId,
        verified: false,
        createdAt: { [Op.lt]: thirtyMinutesAgo }, // Filter sessions created more than 30 minutes ago
      },
      include: [
        {
          model: AttendanceSession,
          include: [
            { model: Class, attributes: ["name"] },
            { model: Module, attributes: ["intitule"] },
            { model: Professeur, attributes: ["nom", "prenom"] },
          ],
        },
      ],
    });

    const absenceRecords = [];
    for (let i = 0; i < absences.length; i++) {
      const absenceRecord = await AttendanceSession.findOne({
        where: { sessionId: absences[i].sessionId },
      });
      const Professor = await Professeur.findByPk(absenceRecord.professorCin);
      absenceRecord.dataValues.Professeur =
        Professor.dataValues.nom + " " + Professor.dataValues.prenom;
      absenceRecords.push(absenceRecord);
    }

    res.json(absenceRecords);
  } catch (error) {
    console.error("Error fetching absences:", error);
    res.status(500).json({ error: "Failed to fetch absences" });
  }
});

// Getting the sessions for a student
router.post("/attendance-sessions", async (req, res) => {
  const { cin } = req.body;

  try {
    const studentAttendances = await StudentAttendance.findAll({
      where: { studentId: cin, verified: false },
      attributes: ["sessionId"], // Only select sessionId
      raw: true, // Return raw data without model instances
    });

    // Extract sessionIds
    const sessionIds = studentAttendances.map((sa) => sa.sessionId);

    // Calculate the date 30 minutes ago
    const thirtyMinutesAgo = new Date(new Date() - 30 * 60 * 1000);

    // Fetch the attendance sessions
    const attendanceSessions = await AttendanceSession.findAll({
      where: {
        sessionId: sessionIds,
        createdAt: {
          [Op.gt]: thirtyMinutesAgo, // Only sessions created within the last 30 minutes
        },
      },
    });

    res.json({ attendanceSessions });
  } catch (error) {
    console.error("Error fetching attendance sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
