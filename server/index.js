const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const authRouter = require('./routes/authRoute');
const qrGenRouter = require('./routes/qrGenRoute');
const profAuthRouter = require('./routes/profAuthRoute');
// const classesRouter = require('./routes/classesRoute');
// const verifyAttendanceRouter = require('./routes/verifyAttendanceRoute');
const adminRouter = require('./routes/adminRoute');
const adminAuthRouter = require ('./routes/adminAuthRoute');

require('dotenv').config();

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use(cors());

// app.use(authRouter);
app.use(qrGenRouter);
app.use(profAuthRouter);
// app.use(classesRouter);
// app.use(verifyAttendanceRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminAuthRouter);

const PORT = 55954 || process.env.PORT

const DB = process.env.DB;

mongoose.connect(DB).then(() => {
    console.log("connection successfully done");
}).catch((e) => {
    console.log(e);
})


// app.get("/user", (req, res) => {
//     console.log("get route");

//     if(user.username != "" && user.password != "")
//     res.status(200).send({
//         "status_code": 200,
//         "user": user
//     }) 
//     else console.log("fields empty");
// })


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Up and running at ${PORT}!`);
})