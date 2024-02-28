import React from 'react'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleApi = () => {
    const url = "http://localhost:4000/login";
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
            navigate('/');
            
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      welcome to signup page
      <br />
      UserName
      <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
      <br />
      password
      <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <br />
      <button onClick={handleApi}>login</button>
      <Link to="/signup">signup</Link>
    </div>
  );
}

export default Login;