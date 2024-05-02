const express = require('express')
const absRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

absRouter.post("/abs", async (req,res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({msg: "user not found"})
        }

        return res.status(200).json({msg: username + "is present"});
    
    } catch (error) {
        res.status(400).json({error: e.message})
    }
})



module.exports = absRouter;