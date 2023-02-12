// this is the state which is visible for all component
import React, { useState } from "react";
import noteContext from "./notecontext";
// import { useState } from "react";
// phele context api le lo react se fir usko import krdo state mai fir niche vala syntax return k bad vo context .provide mai value de do fir jab bhi in notecontext mai kisi bhi chijj ko rape karenge to uske bich mai automatically saree children aa jayenge is se sare compoonent or componenet k ander ye sare state available ho jayenge
// jis bhi component mai vo state use krna chahte hai usme jake usecontext krdo from react


const Notestate = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []

  const [notes, setnotes] = useState(notesinitial)

  //Get all notes
  const getNotes = async () => {
    // api call -copy form net (search fetch from headers)

    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }


  //Add note
  const Addnote = async (title, description, tag) => {
    // api call -copy form net (search fetch from headers)

    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    })
    // const json =  response.json()

    console.log("adding a new note")
    
    const note = await response.json()
  
    setnotes(notes.concat(note))
  }




  // DELETE NOTE 


  const Deletenote = async (id) => {
    //API CALL FOR DELETE
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json = response.json()
    console.log(json)

    console.log("delteing notes with id" + id)
    const newnote = notes.filter((note) => { return note._id !== id })
    setnotes(newnote)
  }



  // EDIT NOTE
  const Editnote = async (id, title, description, tag) => {
    // api call -copy form net (search fetch from headers)

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    
    });
    const json = await response.json()

    let newNote = JSON.parse(JSON.stringify(notes))
    // logic to editing note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        
        break;
      }
    }
    console.log(id,notes)
setnotes(newNote)

  }


  return (
    <noteContext.Provider value={{ notes, setnotes, Editnote, Deletenote, Addnote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default Notestate 
