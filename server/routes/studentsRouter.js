const express = require("express");
const Etudiant = require("../models/etudiant");

const router = express.Router();

// Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Etudiant.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// GET STUDENTS BY FORMATION
router.get("/:formationCode", async (req, res) => {
  const { formationCode } = req.params;
  try {
    const students = await Etudiant.findAll({ where: { formationCode } });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Fetch a student by CIN
router.get("/Cin/:Cin", async (req, res) => {
  const { Cin } = req.params;

  try {
    const student = await Etudiant.findByPk(Cin);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Error fetching student" });
  }
});

// Add a new student
router.post("/", async (req, res) => {
  const {
    Cin,
    Cne,
    nom,
    prenom,
    dateDeNaissance,
    lieuDeNaissance,
    adresseEmailAcademique,
    formationCode,
  } = req.body;

  try {
    const newStudent = await Etudiant.create({
      Cin,
      Cne,
      nom,
      prenom,
      dateDeNaissance,
      lieuDeNaissance,
      adresseEmailAcademique,
      formationCode,
    });
    res.json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Error adding student" });
  }
});

// Update a student
router.put("/:Cin", async (req, res) => {
  const { Cin } = req.params;
  const {
    Cne,
    nom,
    prenom,
    dateDeNaissance,
    lieuDeNaissance,
    adresseEmailAcademique,
    formationCode,
  } = req.body;

  try {
    const student = await Etudiant.findByPk(Cin);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.update({
      Cne,
      nom,
      prenom,
      dateDeNaissance,
      lieuDeNaissance,
      adresseEmailAcademique,
      formationCode,
    });
    res.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// Delete a student
router.delete("/:Cin", async (req, res) => {
  const { Cin } = req.params;

  try {
    const student = await Etudiant.findByPk(Cin);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.destroy();
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

module.exports = router;
