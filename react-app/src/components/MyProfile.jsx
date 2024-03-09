import React, { useEffect ,useState } from 'react'
import Header from './Header'

import axios from 'axios';
function MyProfile() {
    const [user, setuser] = useState({})
    useEffect(()=>{

        const url = "http://localhost:4000/my-profile/" + localStorage.getItem('userId');
        axios.get(url)
        .then((res)=>{
                console.log(res.data);
                if(res.data.user)
                    setuser(res.data.user);
        })
        .catch((err)=>{
            alert('server error');  
        })
    } , []);



  return (
    <div>
    <Header />
    <div className="m-3 p-3">
    <h3 className='text-center mt-2'>User Profile</h3>
    
    <table className='table table-light table-bordered'>
        <thead>
        <tr>
            <th>USER NAME</th>
            <th>EMAIL</th>
            <th>MOBILE NUMBER</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
        </tr>
        </tbody>
    </table>
    </div>
    </div>
  )
}

export default MyProfile