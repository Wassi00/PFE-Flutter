const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  qrCode: { type: String }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
