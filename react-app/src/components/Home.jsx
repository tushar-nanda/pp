import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
function Home() {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login');
        }
    } , [])
    
    return (
        <div>
        <Header />
            welcome to home
        </div>
    );
}

export default Home;