const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login", async (req, res) => {
  const { emailAcademique, cin } = req.body;
  try {
    const admin = await Admin.findOne({ where: { emailAcademique, Cin: cin } });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { cin: admin.Cin, emailAcademique: admin.emailAcademique },
      "attendance_app",
      { expiresIn: "1h" }
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = adminAuthRouter;
