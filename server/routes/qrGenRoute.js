const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const { verifyToken } = require("../middleware/auth");

router.post("/generate-qr", verifyToken, async (req, res) => {
  const { classId } = req.body;
  const professorCin = req.user.cin;

  try {
    // Generate QR code data (e.g., containing classId, professorCin, timestamp)
    const qrData = JSON.stringify({
      classId,
      professorCin,
      timestamp: new Date().toISOString(),
    });
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

module.exports = router;
