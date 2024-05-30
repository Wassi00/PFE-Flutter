const express = require('express');
const jwt = require('jsonwebtoken');
const Professeur = require('../models/professeur');

const profAuthRouter = express.Router();

// Login route
profAuthRouter.post('/loginProf', async (req, res) => {
  const { email, cin } = req.body;

  try {
    const professor = await Professeur.findOne({ where: { adresseEmailAcademique: email, Cin: cin } });

    if (!professor) {
      return res.status(401).json({ error: 'Invalid email or CIN' });
    }

    const token = jwt.sign({ id: professor.Cin }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = profAuthRouter;
