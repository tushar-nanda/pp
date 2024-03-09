import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import API_URL from '../constants';

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
        // navigate('/login');  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className='p-3 m-3'>
      <h2>welcome to signup page</h2>
      <br />
      UserName
      <input className="form-control" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
      <br />
      Email
      <input className="form-control" type="text" value={email} onChange={(e) => { setemail(e.target.value) }} />
      <br />
      Mobile Number
      <input className="form-control" type="text" value={mobile} onChange={(e) => { setmobile(e.target.value) }} />
      <br />
      password
      <input className="form-control" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <br />
      <button className='btn btn-primary ml-3' onClick={handleApi}>signup</button>
      <Link className='btn btn-success m-4' to="/login">Go to Login Page</Link>
      </div>
    </div>
  );
}

export default Signup;
