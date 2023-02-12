
import './App.css';
import React, { useState } from "react";
import Notestate from './context/notestate';
// import Notes from './component/notes';
import Alert from './component/alert';
import Signup from './component/signup';
import Login from './component/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter

} from "react-router-dom";
import Navbar from './component/navbar';
import { Home } from './component/home';
import About from './component/about';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}
  return (
    <>
      <Notestate>
                   
        <Router>
          <Navbar />
           <Alert alert ={alert} />
     
          
        
          <div className="container">
          

            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              {/* <Route exact path="/about" element={<About />} /> */}
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              

            </Routes>
           
          </div>
              
        </Router>

      </Notestate>


    </>
  );
}

export default App;
