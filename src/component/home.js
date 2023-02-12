import React from 'react'
// import AddNotes from './addnotes'
import Notes from './notes'




export const Home = (props) => {
 const {showAlert}=props
  return (
    <>
<Notes showAlert={showAlert} />

</>
  )
}

