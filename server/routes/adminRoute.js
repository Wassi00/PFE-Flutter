const express = require("express");
const jwt = require("jsonwebtoken");
const Professeur = require("../models/Professeur");
const Formation = require("../models/formation");
const Module = require("../models/module");

const adminRouter = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.admin = decoded;
    next();
  });
};

// Protected route to get all formations
adminRouter.get("/formations", verifyToken, async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch formations" });
  }
});

// Protected route to get modules by formation code
adminRouter.get("/formations/:code/modules", verifyToken, async (req, res) => {
  const { code } = req.params;
  try {
    const modules = await Module.findAll({ where: { formationCode: code } });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

// Protected route to get all professors
adminRouter.get("/professors", verifyToken, async (req, res) => {
  try {
    const professors = await Professeur.findAll();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch professors" });
  }
});

// Protected route to assign professor to module
adminRouter.post("/assign", verifyToken, async (req, res) => {
  const { professorCin, moduleCode } = req.body;
  try {
    const assignment = await ProfessorModule.create({
      professorCin,
      moduleCode,
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign professor to module" });
  }
});

module.exports = adminRouter;
