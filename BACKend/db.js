const mongoose = require ('mongoose')
const mongoURI ="mongodb://localhost:27017/Enote?readPreference=primary&directConnection=true&tls=false"

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("mongose is connected")
    })
}


module.exports = connectToMongo 