const express = require('express');
const jwt = require('jsonwebtoken');
const Class = require('../models/class');
const classesRouter = express.Router();

classesRouter.get('/classes', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const classes = await Class.find({ professorId: decoded.userId });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

module.exports = classesRouter;
