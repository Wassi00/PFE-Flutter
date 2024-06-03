const express = require("express");
const Module = require("../models/module");

const router = express.Router();

// Get all modules for a formation
router.get("/:formationCode", async (req, res) => {
  const { formationCode } = req.params;
  try {
    const modules = await Module.findAll({ where: { formationCode } });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

//Get one module
router.get("/module/:moduleCode", async (req, res) => {
  const { moduleCode } = req.params;
  console.log(moduleCode);
  try {
    const module = await Module.findByPk(moduleCode);
    console.log(module);
    res.status(200).json(module);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Failed to fetch module" });
  }
});

// Add a new module to a formation
router.post("/:formationCode", async (req, res) => {
  const { formationCode } = req.params;
  const { code, intitule, departement, semester } = req.body;
  try {
    const moduleCount = await Module.count({
      where: { formationCode, semester },
    });
    if (moduleCount >= 6) {
      return res
        .status(400)
        .json({ error: "Cannot add more than 6 modules per semester" });
    }
    console.log(formationCode);
    const newModule = await Module.create({
      code: code,
      formationCode,
      intitule,
      departement,
      semester,
    });
    res.status(201).json(newModule);
  } catch (error) {
    console.log("error is: " + error);
    res.status(500).json({ error: "Failed to add module" });
  }
});

// Update a module
router.put("/:formationCode/:code", async (req, res) => {
  const { formationCode, code } = req.params;
  const { intitule, departement, semester } = req.body;
  try {
    const module = await Module.findOne({ where: { formationCode, code } });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    module.intitule = intitule;
    module.departement = departement;
    module.semester = semester;
    await module.save();
    res.status(200).json(module);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update module" });
  }
});

// Delete a module
router.delete("/:formationCode/:code", async (req, res) => {
  const { formationCode, code } = req.params;
  try {
    const module = await Module.findOne({ where: { formationCode, code } });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    await module.destroy();
    res.status(200).json({ message: "Module deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete module" });
  }
});

module.exports = router;
