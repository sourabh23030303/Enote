import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notecontext'
const AddNotes = (props) => {
    const context = useContext(noteContext)
    const { Addnote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault()
Addnote(note.title,note.description, note.tag)
setnote({ title: "", description: "", tag: "" })
props.showAlert(" note added successfully ","success")
    }
    
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    
    return (
        <>
            <div className='container text-center'>
                    <h1 style={{color:"white"}}>Add a Note</h1>
                <form className="container my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="d-block form-label text-white">Title</label>
                        <input  type="text"style={{width:"300px",display:"inline-block",justifyContent:"center" }} onChange={onchange} className="border form-control " value={note.title}  id="title" name="title" minLength={2} required />
                    </div>
                    <div className="  mb-3">
                        <label htmlFor="description" className="  form-label text-white ">Description</label>
                        <textarea type="textarea text-white "style={{height:"100px",width:"80%"}} onChange={onchange} className="border form-control container " value={note.description} id="description" name="description" minLength={2} required></textarea> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label text-white">Tag: </label>
                        <input type="text"  onChange={onchange}style={{width:"300px",display:"inline-block",justifyContent:"center" }} className="border form-control "  value={note.tag} id="tag" name="tag" />
                    </div>
                  



                    <div className="col-12">
                        <button disabled={note.title.length<2 || note.description.length<2} type="submit" onClick={handleclick} className="btn btn-primary">add note</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddNotes