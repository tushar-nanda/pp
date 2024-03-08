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
    let locations =[
        {
          "latitude":28.6139 , 
          "longitude":77.2090,
          "placeName":"New Delhi , Delhi"
        } ,
         {
          "latitude": 19.0760 , 
          "longitude":72.8777,
          "placeName":"Mumbai , Maharastra"
        },
      ]
    return (
        <div className="header-container d-flex justify-content-between">
        <div className="header">
           <Link  className='links m-3' to="/">Home</Link>
           <select onChange={(e)=>{
                localStorage.setItem('userLoc' , e.target.value)
           }}  value="" >
                { locations.map((item , index)=>{
                    return ( <option value={`${item.latitude} , ${item.longitude}`} key={index}>{item.placeName}</option> )
                }) }
           </select>
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