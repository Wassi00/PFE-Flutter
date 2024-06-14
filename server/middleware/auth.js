// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, "attendance_app", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
