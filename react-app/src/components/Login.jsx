import React from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
    <Header />
    welcome to login page
    <br />
    UserName
    <input type="text" name="" id="" />
    <br />
    password
    <input type="password" />
    <br />
        <button>Login</button>
    <Link to="/signup">signup</Link>
    </div>
  )
}

export default Login;