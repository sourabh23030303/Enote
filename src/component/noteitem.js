import React from 'react'
import noteContext from '../context/notecontext';
import { useContext } from 'react';
import { useRef } from 'react'
import { useState } from 'react';
const Noteitem = (props) => {
    const { note,updateNote } = props
    const context = useContext(noteContext)
    const { Deletenote } = context
    const ref = useRef(null)
    const refclose = useRef(null)
    const [setnote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    
//   const handleclick = (e) => {
//     // e.preventDefault()
//     ref.current.click()
   
//     console.log("card is clicked")
    
//   }

  
    return (
        <>
       

       {/* <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button> */}
            <div className='col-md-3' >
                <div className=" card  card my-4"  >
                    <div className="card-body" >
                        <h5 className="card-title">  {note.title}</h5>
                        <p className="card-text">   {note.description}  </p>
            
                        <i className="fa-solid fa-trash" onClick={() => {
                            Deletenote(note._id);
                           
                        }} ></i>
                        <i className="fa fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}>/open</i>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Noteitem