import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const Navigate = useNavigate()
  const [credentional, setcredentional] = useState({name:"",cpassword:"", email:"",password:""})

  const handlesubmit= async(e)=>{
    e.preventDefault();
   const {name,email,password} = credentional
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
         
        },
        body: JSON.stringify({ name,email,password})
        })

       const json = await response.json()
       console.log(json)
       if (json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken)
        Navigate("/")
        props.showAlert("successfully created your account","success")
       }
     else{
      props.showAlert("email is already exist or confirm your password again","danger")
     }
      }

  
  const onchange = (e) => {
    setcredentional({ ...credentional, [e.target.name]: e.target.value })
}



  return (
    <>
    {/* <h1>This is sign up</h1> */}
    <div className='container' style={{width:"50%"}}>
  <form onSubmit={handlesubmit}>
  <div className="mb-3" >
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onchange}  aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="Email" name='email' onChange={onchange}  aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control"name='password' onChange={onchange} minLength={5} required id="Password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cPassword" className="form-label">confirm Password</label>
    <input type="password" className="form-control" id="cPassword" name='cpassword' minLength={5} required onChange={onchange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>



    </div>
    </>

  )
}

export default Signup