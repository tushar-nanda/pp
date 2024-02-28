import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
function Header()
{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
           <Link to="/">Home</Link>
           <div className="header"><span className="mt-3">sell and Purchanse in you city</span>
           {!localStorage.getItem('token')?<Link to="/login">login</Link>:<button onClick={handleLogout}>logout</button>}
           <br />
           <Link to="/signup">signup</Link>
           
            </div>
        </div>
    );
}

export default Header;