import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Login = (props) => {

    const Navigate = useNavigate()
    const [credentional, setcredentional] = useState({email:"",password:""})
  

  const handlesubmit= async(e)=>{
e.preventDefault();

const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
     
    },
    body: JSON.stringify({ email:credentional.email,password:credentional.password})
    })
   const json = await response.json()
   console.log(json)
   if (json.success){
    //save the auth token and redirect
    localStorage.setItem('token',json.authtoken)
    Navigate("/")
    props.showAlert("successfully login","success")
   }
 else{
  props.showAlert("password or email is wrong","danger")
 }
  }
  const onchange = (e) => {
    setcredentional({ ...credentional, [e.target.name]: e.target.value })
}

  return (
        <>
    <div className='container'>
    <h1>Please login to get your notes</h1>
    <form   onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email"value={credentional.email} onChange={onchange} className="form-control" name = "email" id="email" aria-describedby="emailHelp"/>

    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"value={credentional.password}onChange={onchange} className="form-control" name="password" id="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    
    </div>
    </>
  )
}

export default Login