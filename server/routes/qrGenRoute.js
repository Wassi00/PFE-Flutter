const express = require('express');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const qrGenRouter = express.Router();
const Session = require('../models/session');
const Module = require('../models/module');

// Route to generate QR code for a session
qrGenRouter.post('/generate-qr', async (req, res) => {
  const { moduleId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');

    // Optionally, verify the module exists and the user has access to it
    const moduleExists = await Module.findByPk(moduleId);
    if (!moduleExists) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Create a new session
    const newSession = await Session.create({ moduleId, date: new Date() });

    // Generate QR code for the session
    const qrCodeDataURL = await QRCode.toDataURL(newSession.id.toString());

    // Update session with QR code
    newSession.qrCode = qrCodeDataURL;
    await newSession.save();

    res.status(200).json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error('Error generating QR code:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid authorization token' });
    }
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = qrGenRouter;
