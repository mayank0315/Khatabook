const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const isLoggedin = async function (req,res,next){
    const token = req.cookies.token
    if(!token){
        res.redirect('/')
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            req.user = decoded;
            next()
        }
        else{
            res.redirect("/")
        }
    } catch {
        res.redirect('/')
    }

}
module.exports = {
    isLoggedin 
}
