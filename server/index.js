const express = require("express");
const app = express();
const cors = require("cors");
// const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const qrGenRouter = require("./routes/qrGenRoute");
const profAuthRouter = require("./routes/profAuthRoute");
const verifyAttendanceRouter = require("./routes/verifyAttendanceRoute");
const adminRouter = require("./routes/adminRoute");
const adminAuthRouter = require("./routes/adminAuthRoute");
const formationRouter = require("./routes/formationRouter");
const moduleRouter = require("./routes/moduleRouter");
const departementRouter = require("./routes/departmentRouter");
const professorRouter = require("./routes/professorsRouter");
const studentRouter = require("./routes/studentsRouter");
const classRouter = require("./routes/classRouter");
const { verifyToken } = require("./middleware/auth");

require("dotenv").config();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use(qrGenRouter);
app.use(profAuthRouter);
app.use(verifyAttendanceRouter);
app.use("/admin", adminRouter);
app.use("/admin", adminAuthRouter);
app.use("/formations", formationRouter);
app.use("/modules", moduleRouter);
app.use("/departments", departementRouter);
app.use("/students", studentRouter);
app.use("/professors", professorRouter);
app.use("/classes", classRouter);
app.use(profAuthRouter);
// Protected routes
app.use("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const PORT = 55954 || process.env.PORT;

// const DB = process.env.DB;

// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("connection successfully done");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Up and running at ${PORT}!`);
});
