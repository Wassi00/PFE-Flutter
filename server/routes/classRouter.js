const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const ClassProfessor = require("../models/classProfessor");
const ClassStudent = require("../models/classStudent");
const Professor = require("../models/professeur");

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SPECIFIC CLASS
router.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const classe = await Class.findByPk(code);
    res.json(classe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all classes of a specific formation
router.get("/formation/:formationCode", async (req, res) => {
  const { formationCode } = req.params;
  try {
    const classes = await Class.findAll({ where: { formationCode } });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// Create a new class
router.post("/", async (req, res) => {
  const { code, name, formationCode, professors, students } = req.body;

  try {
    const newClass = await Class.create({ code, name, formationCode });

    // Add professors
    if (professors && professors.length) {
      for (let prof of professors) {
        await ClassProfessor.create({
          classCode: newClass.code,
          professorCin: prof.professorCin,
          moduleCode: prof.moduleCode,
        });
      }
    }

    // Add students
    if (students && students.length) {
      for (let studentCin of students) {
        await ClassStudent.create({
          classCode: newClass.code,
          studentCin,
        });
      }
    }

    res.status(201).json(newClass);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a class
router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    await ClassProfessor.destroy({ where: { classCode: code } });
    await ClassStudent.destroy({ where: { classCode: code } });
    await Class.destroy({ where: { code } });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a class
router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { name, formationCode, professors, students } = req.body;

  try {
    const updatedClass = await Class.update(
      { name, formationCode },
      { where: { code } }
    );

    // Update professors
    await ClassProfessor.destroy({ where: { classCode: code } });
    console.log(professors);
    if (professors && professors.length) {
      for (let prof of professors) {
        await ClassProfessor.create({
          classCode: code,
          professorCin: prof.professorCin,
          moduleCode: prof.moduleCode,
        });
      }
    }

    // Update students
    await ClassStudent.destroy({ where: { classCode: code } });
    console.log(students);
    if (students && students.length) {
      for (let studentCin of students) {
        await ClassStudent.create({
          classCode: code,
          studentCin,
        });
      }
    }

    res.json(updatedClass);
  } catch (err) {
    console.log("error is : " + err);
    res.status(500).json({ error: err.message });
  }
});

// GET PROFESSOR ASIGNED TO A CLASS
router.get("/professors/:code", async (req, res) => {
  try {
    const classProfessors = await ClassProfessor.findAll({
      where: { classCode: req.params.code },
    });
    console.log(classProfessors);
    res.json(classProfessors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class professors" });
  }
});

// Fetch assigned students for a class
router.get("/students/:classCode", async (req, res) => {
  try {
    const classStudents = await ClassStudent.findAll({
      where: { classCode: req.params.classCode },
    });
    console.log(classStudents);
    res.json(classStudents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class students" });
  }
});

module.exports = router;
