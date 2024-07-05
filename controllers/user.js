const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res){
    console.log(req.body);
    const { name, email, password } = req.body;
    await User.create({
        name, 
        email,
        password
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    console.log(user)

    if(!user){
        return res.render("login", {
            error:"Invalid Username or password."
        });
    }

    
    const token = setUser(user);
    res.cookie('uid', token)
    return res.redirect("/");
   
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}