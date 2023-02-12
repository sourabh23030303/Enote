const jwt = require('jsonwebtoken')


const JWT_SECRET = "Sourabh2303$"
fetchuser = (req,res,next)=>{
    //get the usr from the jwt token and add id to req object
const token = req.header('auth-token')//header se token layenge
if (!token){
    res.status(401).send({error:"please authenticate with valide token"})
}

try {
    const data = jwt.verify(token,JWT_SECRET)
req.user=data.user
next()
} catch (error) {
    res.status(401).send({error:"please authenticate with valide token"})

}

}



module.exports = fetchuser