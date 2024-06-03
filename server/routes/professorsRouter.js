const express = require("express");
const Professor = require("../models/professeur");
const { verifyToken } = require("../middleware/auth");
const ClassProfessor = require("../models/classProfessor");
const Class = require("../models/class");
const Module = require("../models/module");

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

// Get assigned classes
router.get("/assigned-classes", verifyToken, async (req, res) => {
  const professorCin = req.user.cin; // Assuming the CIN is in the JWT token payload
  try {
    const classes = await ClassProfessor.findAll({
      where: { professorCin },
      include: [{ model: Class }],
    });
    res.json(classes.map((cp) => cp.Class));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assigned classes" });
  }
});

// Get assigned modules
router.get("/assigned-modules/:classCode", verifyToken, async (req, res) => {
  const { classCode } = req.params;
  const professorCin = req.user.cin;
  try {
    const modules = await ClassProfessor.findAll({
      where: { classCode, professorCin },
      include: [{ model: Module }],
    });
    res.json(modules.map((cp) => cp.Module));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assigned modules" });
  }
});

module.exports = router;
