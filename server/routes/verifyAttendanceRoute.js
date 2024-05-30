const express = require('express');
const verifyAttendanceRouter = express.Router();
const User = require("../models/user");
const Attendance = require("../models/attendance");
const Session = require("../models/session");

// Route to verify attendance
verifyAttendanceRouter.post('/verify-attendance', async (req, res) => {
    const { userId, qrCodeData } = req.body;
  
    if (!userId || !qrCodeData) {
      return res.status(400).json({ error: 'User ID and QR code data are required' });
    }
  
    try {
      // Verify the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Verify the session exists using the QR code
      const session = await Session.findOne({ qrCode: qrCodeData });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      // Check if the user has already attended the session
      const attendance = await Attendance.findOne({ sessionId: session._id, userId: user._id });
      if (attendance) {
        return res.status(409).json({ error: 'Attendance already recorded' });
      }
  
      // Record the attendance
      await Attendance.create({ sessionId: session._id, userId: user._id });
  
      // Respond with success
      res.status(200).json({ message: 'Attendance recorded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to verify attendance' });
    }
  });
  
module.exports = verifyAttendanceRouter;