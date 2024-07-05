const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next){
    //const userUID = req.cookies?.uid;

    //If token passed in Headers
    const userUID = req.headers['authorization']

    if(!userUID) return res.redirect("/login");
    const token = userUID.split('Bearer ')[1]; //Will become an array

    const user = getUser(token);
    if(!user) return res.redirect("/login");

    req.user = user;

    next();
}

async function checkAuth(req, res, next){
    //const userUID = req.cookies?.uid;
    const userUID = req.headers['authorization']

    const token = userUID?.split('Bearer ')[1];
    const user = getUser(token);
    req.user = user;
    
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}