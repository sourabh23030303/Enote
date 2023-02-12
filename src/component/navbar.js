import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const Navigate = useNavigate()
    const handlelogout=()=>{
        localStorage.removeItem('token')
        Navigate("/login")
    }
    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
       }, [location])
       
    return (
        <>
<div style={{border:"2px solid white"}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand " style={{color: "#2663c4"}} to="/">Enote</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className=" shadow nav-item" >
                                <Link className={ `nav-link ${location.pathname ==="/"? "active":""}`}  to="/">Home</Link>
                            </li>

                            {/* <li className="nav-item">
                                <Link className={ `nav-link ${location.pathname ==="/about"? "active":""}`} to="/about">about</Link>
                                
                            </li> */}
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                           
                        <Link className="btn btn-primary mx-2" href="#" to="/login" role="button">login </Link>
                        <Link className="btn btn-primary mx-2" href="#" to="/signup" role="button">sign up</Link>
           
                        </form>: <button onClick={handlelogout} className="btn btn-primary">logout</button> }
                    </div>
                </div>
            </nav>


                                </div>
        </>
    )
}

export default Navbar