import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleApi = () => {
    const url = "http://localhost:4000/signup";
    const data = { username, password };
    console.log({ username, password });
    axios.post(url, data)
      .then((res) => {
        console.log(res);
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
      <button onClick={handleApi}>signup</button>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
