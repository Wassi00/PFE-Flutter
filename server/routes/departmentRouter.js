const express = require("express");
const Department = require("../models/department");
const router = express.Router();

// GET all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Error fetching departments" });
  }
});

// POST a new department
router.post("/", async (req, res) => {
  const { code, intitule } = req.body;
  try {
    const department = await Department.create({ code, intitule });
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Error creating department" });
  }
});

// PUT (update) a department
router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { intitule } = req.body;
  try {
    const department = await Department.findOne({ where: { code } });
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    department.intitule = intitule;
    await department.save();
    res.json(department);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Error updating department" });
  }
});

// DELETE a department
router.delete("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const department = await Department.findOne({ where: { code } });
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    await department.destroy();
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Error deleting department" });
  }
});

module.exports = router;
