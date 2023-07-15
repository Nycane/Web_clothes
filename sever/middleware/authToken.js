const jwt = require("jsonwebtoken")
class AuthToken{
    verifyToken(req,res,next){
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            res.status(401).json({message:"Token invalid"})
        }else{
            try {
                const decode = jwt.verify(token,process.env.JWT_SERECT);
                req.user=decode
                next()
            console.log(decode)
            } catch (error) {
                res.status(401).json({message:"Token expired"})
            }
            
        }
    }
}


module.exports = new AuthToken()