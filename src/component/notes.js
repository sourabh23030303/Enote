import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import noteContext from '../context/notecontext'
import Noteitem from './noteitem'
import AddNotes from './addnotes'
const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getNotes, Editnote } = context
  let Navigate = useNavigate()

  useEffect(() => {

    if (localStorage.getItem('token')) {
      getNotes()

    } else {
      Navigate("/login")

    }

    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }

  const handleclick = (e) => {
    e.preventDefault()
    Editnote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    console.log("updaating note", note)
    props.showAlert(" note updated successfully ", "success")


  }

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <div className='container'>
        <AddNotes showAlert={props.showAlert} />
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>



              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" onChange={onchange} className="form-control " id="etitle" name="etitle" value={note.etitle} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <textarea type="text" onChange={onchange} className="form-control" id="edescription" name="edescription" value={note.edescription}></textarea>

                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">tag</label>
                    <input type="text" onChange={onchange} className="form-control" id="etag" name="etag" value={note.etag} />
                  </div>
                </form>



              </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary text-white" onClick={handleclick}>update notes</button>
              </div>
            </div>
          </div>
        </div>
        <div className=' row my-3'>
          <h1 className=' text-white'>Your Notes</h1>
          {notes.length === 0 && 'no notes to display'}
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          })}
        </div>
      </div>
    </>

  )
}

export default Notes