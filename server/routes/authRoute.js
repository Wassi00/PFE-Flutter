const express = require('express')
const authRouter = express.Router();
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req,res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({msg: "user not found"})
        }

        // const isMatch = await bcryptjs.compare(password, user.password);
        const isMatch = (password == user.password);

        if(!isMatch){
            return res.status(400).json({msg: "password incorrect!"})
        }

        const token = jwt.sign({id: user._id}, "passwordKey");

        return res.json({token, ...user._doc})
    
    } catch (error) {
        res.status(500).json({error: e.message})
    }
})



module.exports = authRouter;