
const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator')


//route 1 :get all the notes using :Get method
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })//kind of foreign key
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("internal error accured ")
    }
})

//route 2:adding  new notes using :Post method

router.post('/addnote', fetchuser, [
    body('title', 'enter the valide title').isLength({ min: 2 }),
    body('description', 'dicription should be at least 5 characters').isLength({ min: 5 })

], async (req, res) => {
    try {
        
  
    const { title, description, tag } = req.body//destructuring
    // same as auth validation (copy)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    

    //error nahi ate hai to 
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
const savednotes= await note.save()
    res.json(savednotes)
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal error accured ")
}
})


//route 3:updatting notes using :Put method 
router.put('/updatenote/:id', fetchuser, async (req, res) => {

const {title ,description,tag} = req.body
//create a newnote object 
const newNote ={}
if (title){
    newNote.title= title
}
if (description){
    newNote.description= description
}
if (tag){
    newNote.tag= tag
}
//find the note to be updated and update it
let note = await Notes.findById(req.params.id) 
if (!note){res.status(404).send("not found")}

if(note.user.toString() !== req.user.id){
    return res.status(404).send("not allowwed")
}
note =  await Notes.findByIdAndUpdate(req.params.id , {$set:newNote},{new:true})
res.json({note})

})

//route 4:deleting notes using :delete method 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
const {title,description,tag}=req.body
try {
    

//find the note to be deleted and delete it
let note = await Notes.findById(req.params.id) 
if (!note){res.status(404).send("not found")}

if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowwed")
}
note =  await Notes.findByIdAndDelete(req.params.id)
res.json({"success":"note has been deleted"})
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal error accured ")
}
})
//ager api hit krani hai to export bhi karana padega
module.exports = router