const express = require("express");
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute')
require('dotenv').config();

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());
app.use(authRouter);

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