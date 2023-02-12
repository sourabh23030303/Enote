const mongoose = require ('mongoose')
const {Schema}=mongoose;

const noteschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'worker'
    },
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
  
},
tag:{
    type:String,
   default:"General"

},
date:{
    type:String,
    default:Date.now
}
})
// creating model from schema 
module.exports = mongoose.model('note', noteschema)