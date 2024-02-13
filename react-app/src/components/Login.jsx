import React from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleApi =()=>{
    const url = "http://localhost:4000/signup";
    const data={username , password};
    console.log({username , password});
    axios.post(url , data).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div>
    <Header />
    welcome to login page
    <br />
    UserName
    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} id="" />
    <br />
    password
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} id=""/>
    <br />
        <button onClick={handleApi}>Login</button>
    <Link to="/signup">signup</Link>
    </div>
  )
}

export default Login;