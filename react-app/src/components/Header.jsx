import "./Header.css"
import './Home.css'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function Header(props)
{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className="header-container d-flex justify-content-between">
        <div className="header">
           <Link  className='links' to="/">Home</Link>
           <input type="text" className="search" value={props && props.search}
            onChange={(e)=>props.handlesearch && props.handlesearch(e.target.value)}
           />
           <button className="search-btn" onClick={()=>props.handleClick && props.handleClick()}><FaSearch /></button>
           
           <br />
           {/* <Link to="/signup">signup</Link> */}
           
            </div>

          <div>
          {!!localStorage.getItem('token') &&  <Link to="/liked-products"><button className="logout-btn">Liked Products</button></Link> }
          {!!localStorage.getItem('token') &&  <Link to="/add-product"><button className="logout-btn">addproduct </button></Link> }

           {!localStorage.getItem('token')?<Link to="/login">login</Link>:<button className="logout-btn" onClick={handleLogout}>logout</button>}
          </div>  
            
        </div>
    );
}

export default Header;