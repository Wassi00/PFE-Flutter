const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Etudiant = require("../models/etudiant");
const Formation = require("../models/formation");

const JWT_SECRET = "attendance_app"; // Replace with your actual secret key

// Student Login Route
router.post("/login", async (req, res) => {
  const { cin, adresseEmailAcademique } = req.body;
  console.log(cin, adresseEmailAcademique);
  try {
    // Find student by CIN and academic email
    const student = await Etudiant.findOne({
      where: { Cin: cin, adresseEmailAcademique },
    });

    if (!student) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const formation = await Formation.findByPk(student.formationCode);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student.Cin,
        email: student.adresseEmailAcademique,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
