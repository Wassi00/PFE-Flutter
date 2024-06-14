const express = require("express");
const Professor = require("../models/professeur");
const { verifyToken } = require("../middleware/auth");
const StudentAttendance = require("../models/studentAttendance");
const AttendanceSession = require("../models/attendanceSession");
const Student = require("../models/etudiant");

const router = express.Router();

// GET ALL PROFESSORS
router.get("/", async (req, res) => {
  try {
    const professors = await Professor.findAll();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch professors" });
  }
});

// Get all professors of a departement
router.get("/department/:departement", async (req, res) => {
  const { departement } = req.params;
  try {
    const Professors = await Professor.findAll({ where: { departement } });
    console.log(Professors);
    res.status(200).json(Professors);
  } catch (error) {
    console.log(error);
    res.status(500).json("error fetching profs of department: " + error);
  }
});

// Fetch a single professor by Cin
router.get("/:Cin", async (req, res) => {
  const { Cin } = req.params;

  try {
    const professor = await Professor.findByPk(Cin);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }
    res.json(professor);
  } catch (error) {
    console.error("Error fetching professor:", error);
    res.status(500).json({ error: "Error fetching professor" });
  }
});

// ADD PROFESSOR
router.post("/", async (req, res) => {
  const {
    Cin,
    nom,
    prenom,
    spécialité,
    departement,
    date_de_naissance,
    lieu_de_naissance,
    adresse_email_academique,
    diplome,
  } = req.body;

  try {
    const newProfessor = await Professor.create({
      Cin,
      nom,
      prenom,
      spécialité,
      departement,
      date_de_naissance,
      lieu_de_naissance,
      adresse_email_academique,
      diplome,
    });
    res.json(newProfessor);
  } catch (error) {
    console.error("Error adding professor:", error);
    res.status(500).json({ error: "Error adding professor" });
  }
});

// EDIT PROFESSOR
router.put("/:Cin", async (req, res) => {
  const { Cin } = req.params;
  const {
    nom,
    prenom,
    spécialité,
    departement,
    date_de_naissance,
    lieu_de_naissance,
    adresse_email_academique,
    diplome,
  } = req.body;

  try {
    const professor = await Professor.findByPk(Cin);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }

    await professor.update({
      nom,
      prenom,
      spécialité,
      departement,
      date_de_naissance,
      lieu_de_naissance,
      adresse_email_academique,
      diplome,
    });
    res.json(professor);
  } catch (error) {
    console.error("Error updating professor:", error);
    res.status(500).json({ error: "Error updating professor" });
  }
});

// Delete Professor
router.delete("/:Cin", async (req, res) => {
  const { Cin } = req.params;

  try {
    const professor = await Professor.findByPk(Cin);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }

    await professor.destroy();
    res.json({ message: "Professor deleted successfully" });
  } catch (error) {
    console.error("Error deleting professor:", error);
    res.status(500).json({ error: "Error deleting professor" });
  }
});

// Get absences related to the professor
router.get("/absences/:Cin", async (req, res) => {
  const { Cin } = req.params;
  try {
    const sessions = await AttendanceSession.findAll({
      where: { professorCin: Cin },
    });
    const AbStudents = [];
    const studentIds = [];

    for (let index = 0; index < sessions.length; index++) {
      const students = await StudentAttendance.findAll({
        where: {
          verified: false,
          sessionId: sessions[index].dataValues.sessionId,
        },
        attributes: ["studentId", "sessionId", "createdAt"],
        raw: true,
      });

      students.forEach((student) => {
        studentIds.push(student.studentId);
      });

      const moduleCode = await AttendanceSession.findOne({
        where: { sessionId: sessions[index].dataValues.sessionId },
        attributes: ["moduleCode"],
        raw: true,
      });
      if (students.length !== 0) AbStudents.push({ students, moduleCode });
    }
    const etudiants = [];
    for (let index = 0; index < studentIds.length; index++) {
      const etudiant = await Student.findByPk(studentIds[index]);
      etudiants.push(etudiant);
    }

    res.status(200).json({ absences: AbStudents, students: etudiants });
  } catch (error) {
    console.log(error);
    res.status(500).json("error: " + error);
  }
});

module.exports = router;
