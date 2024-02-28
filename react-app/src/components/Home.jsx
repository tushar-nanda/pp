import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/add-product">addproduct</Link>
        </div>
    );
}

export default Home;