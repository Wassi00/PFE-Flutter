const express = require("express");
const Formation = require("../models/formation");

const router = express.Router();

// Route to get all formations
router.get("/", async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch formations" });
  }
});

// Route to get a specific formation by code
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  console.log(code);
  try {
    const formation = await Formation.findByPk(code);
    if (!formation) {
      return res.status(404).json({ error: "Formation not found" });
    }
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch formation" });
  }
});

router.post("/", async (req, res) => {
  const { code, intitule, departement } = req.body;

  const formation = await Formation.findByPk(code);
  if (formation) {
    res.status(500).json({ error: "formation already exists" });
  }

  try {
    const newFormation = await Formation.create({
      Code: code,
      intitulé: intitule,
      departement,
    });
    res.status(201).json(newFormation);
  } catch (error) {
    console.log("error is" + error);
    res.status(500).json({ error: "Failed to create formation" });
  }
});

// Route to update a formation by code
router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { intitule, departement } = req.body;

  try {
    const formation = await Formation.findByPk(code);
    if (!formation) {
      return res.status(404).json({ error: "Formation not found" });
    }

    formation.intitulé = intitule;
    formation.departement = departement;
    await formation.save();

    res.status(200).json({ message: "Formation updated successfully" });
  } catch (error) {
    console.log("error is : " + error);
    res.status(500).json({ error: "Failed to update formation" });
  }
});

//Delete Path
router.delete("/:code", async (req, res) => {
  const { code } = req.params;
  console.log(code);
  try {
    const formation = await Formation.findByPk(code);
    if (!formation) {
      return res.status(404).json({ error: "Formation not found" });
    }

    await formation.destroy();
    res.status(200).json({ message: "Formation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete formation" });
  }
});

module.exports = router;
