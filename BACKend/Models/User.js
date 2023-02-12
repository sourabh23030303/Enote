const mongoose = require ('mongoose');
const {Schema}=mongoose;
const userschema = new Schema({
name:{
    type:String,
    required:true    
},
email:{
    type:String,
    required:true,
    unique:true
   
},
password:{
    type:String,
    required:true  

   
},
date:{
    type:String,
   default:Date.now
}

})
// creating model from schema 
const user= mongoose.model('worker',userschema) 
// user.createIndexes()
module.exports = user