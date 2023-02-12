
const express = require('express')
const User = require('../Models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Sourabh2303$"
var fetchuser = require('../middleware/fetchuser')
// ab svhema umport karenge jis se user ka json ka data formate mil jaye
//aray after post / is for validation 
// post kis pe krna hai ?createuser pe
// create a user using post   ,, no login required
//route 1
router.post('/createuser', [
    body('name', 'enter the valide name').isLength({ min: 3 }),
    body('email', 'enter the valide email').isEmail(),
    body('password', 'enter the valide password').isLength({ min: 3 })
], async (req, res) => {
    let success =false;
    // just coppy from express validator website
    // if there are errors ,return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }


    // check wethere the email  is already exist 
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log("user ")
        if (user) {
            return res.status(400).json({ success,error: "sorry user with this email already exist" })
        }
        // pass word hashing 
        const salt = await bcrypt.genSalt(10)//salt generate karega
        secpass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }
        // userr login krne pe auth token mil jayega jis se us ko easyly verify kr payebnge
        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken)

        success=true
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error accured")
    }

    // .then(user => res.json(user))
    //     .catch(err => {console.log(err)
    //  res.json({ error: 'please entere valide email' })})


    // console.log(req.body)//console  mai data dikhga json ka

    // const user = User(req.body)//user se data late hue
    // res.send(req.body)//respomse section mai dikhega
    // user.save()//data sstore hoga save ho hayega data base mai

})
//route 2
//authebcation of user for login 
router.post('/login', [

    body('email', 'enter the valide email').isEmail(),
    body('password', 'enter the valide password').exists()
], async (req, res) => {
    let success =false;
    // if threr are error then return bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;//email and password le liye gye hai req.body se
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "sorry password or email is incoreect " })
        }
        const passwordcompare = await bcrypt.compare(password, user.password)//frome 37 line
        if (!passwordcompare) {
            success=false
            return res.status(400).json({success, error: "sorry password or email is incoreect " })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        // console.log(authtoken)
        success=true
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal error accured ")
    }

})


//route 3 post('/getuser') verifying the token of user 
router.post('/getuser',fetchuser,
    async (req, res) => {
        try {
            userId = req.user.id
            const user = await User.findById(userId).select("-password")
res.send(user)


        } catch (error) {
            console.error(error.message)
            res.status(500).send("internal error accured ")
        }
    })
//ager api hit krani hai to export bhi karana padega router ko

module.exports = router