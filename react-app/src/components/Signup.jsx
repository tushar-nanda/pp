import React from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
    <Header />
    welcome to Signup page
    <br />
    UserName
    <input type="text" name="" id="" />
    <br />
    password
    <input type="password" />
    <br />
        <button>Login</button>
    <Link to="/login">Login</Link>
    </div>
  )
}

export default Signup;