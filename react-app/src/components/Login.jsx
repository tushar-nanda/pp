import React from 'react'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import API_URL from '../constants';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleApi = () => {
    const url = API_URL + "/login";
    const data = { username, password };
    console.log({ username, password });
    axios.post(url, data)
      .then((res) => {
        console.log(res.data.message);
        if(res.data.message)
        {
          alert(res.data.message);
          if(res.data.token)
          {
            localStorage.setItem('token' ,res.data.token);
            localStorage.setItem('userId' ,res.data.userId);
            localStorage.setItem('userName' ,res.data.username);
            navigate('/');
            
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>    
    <div>
      <Header />
        {/* <div className='p-3 m-3'>
            <h2>welcome to Login page </h2>
            <br />
            UserName
            <input className="form-control" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <br />
            password
            <input className="form-control" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <button className="btn btn-primary m-3"onClick={handleApi}>login</button>
            <Link to="/signup" className='btn btn-success'>Jump to signup</Link>
        </div> */}

        <div className="login-page">
          <div className='adjust'>
            <h1 style={{textAlign:"center"}}>Login</h1>
            <div className="form">
                {/* <form className='login-form'> */}
                    <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='username' />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}placeholder='password'  />
                    <button onClick={handleApi}>Login</button>
                    <p className='message'>Not Registerd? <Link to="/signup" >Create a account</Link></p>
                {/* </form> */} 
            </div>
            </div>
        </div>
    </div>

   

    </>

  );
}

export default Login;