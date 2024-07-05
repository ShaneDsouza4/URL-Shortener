const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    //const authirzationHeaderValue = req.headers['authorization'];
    const tokenCookie = req.cookies?.token;

    req.user = null;

    // if(!authirzationHeaderValue || !authirzationHeaderValue.startsWith('Bearer')){
    //     return next();
    // }
    if(!tokenCookie) return next();

    //Validatie
    //const token = authirzationHeaderValue.split('Bearer ')[1];
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();
}

//Array of roles
function restrictTo(roles){ 
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!(roles.includes(req.user.role))) res.end("Unauthorized");

        next();
    }
}


module.exports = {
    checkForAuthentication,
    restrictTo
}