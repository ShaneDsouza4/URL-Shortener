const jwt = require("jsonwebtoken");
const secret = "shane"

function setUser(user){
    //sessionIDToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token){
    //return sessionIDToUserMap.get(id);
    if(!token) return null;
    
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}