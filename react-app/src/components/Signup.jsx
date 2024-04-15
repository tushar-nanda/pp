import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import API_URL from '../constants';
import './login.css'
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("")
  const navigate = useNavigate();
  const handleApi = () => {
    const url = API_URL + "/signup";
    const data = { username, password ,mobile , email};
    console.log({ username, password ,mobile , email});
    axios.post(url, data)
      .then((res) => {
        console.log(res);
        alert('successfully registered');
        navigate('/login');  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>   
     <div>
      <Header />
      <div className="login-page">
          <div className='adjust'>
            <h1 style={{textAlign:"center"}}>SignUp</h1>
            <div className="form">
               
                    <input type="text"value={username} onChange={(e) => { setUsername(e.target.value) }}placeholder='username' />
                    
                    <input className="form-control" type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="abc@gmail.com" />
                    
                    <input className="form-control" type="mobile" value={mobile} onChange={(e) => { setmobile(e.target.value) } } placeholder="Enter 10-digit mobile number" />
                    
                    <input className="form-control" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' />

                    <button  onClick={handleApi}>Register</button>
                    <p className='message'>Already Registered? <Link to="/login">Go to Login Page</Link></p>
                
            </div>
            </div>
        </div>




    </div>

   
    </>

  );
}

export default Signup;
