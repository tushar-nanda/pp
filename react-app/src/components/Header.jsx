import "./Header.css"
import './Home.css'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Header(props)
{
  const [loc, setLoc] = useState(null)
  const navigate = useNavigate();
    const [showOver, setshowOver] = useState(false)
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    let locations =[
        {
        
          "latitude":10.7663824 , 
          "longitude":78.8233878,
         
          // "latitude":28.6139 ,   // ye asli wla hai
          // "longitude":77.2090,
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
           <select value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }} >
                    {
                        locations.map((item, index) => {
                            return (
                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName}
                                </option>
                            )
                        })
                    }
                </select>
           <input type="text" className="search" value={props && props.search}
            onChange={(e)=>props.handlesearch && props.handlesearch(e.target.value)}
           />
           <button className="search-btn" onClick={()=>props.handleClick && props.handleClick()}><FaSearch /></button>
            {!!localStorage.getItem('token') &&  <Link to="/add-product"><button className="selling-btn">Want to sell Something </button></Link> }
           <br />
           {/* <Link to="/signup">signup</Link> */}
           
            </div>

          <div>
         
        

           
           
           <div onClick={()=>{ 
              setshowOver(!showOver)
            }} style={
                  { 
                    
                    display:'flex' ,
                    justifyContent:'center' , 
                    alignItems:'center', 
                    background:'red' , 
                    width:'40px' , height:'40px' ,
                    borderRadius: '50%' ,
                    cursor:'pointer',
                    background:'#002f34',
                    color:'white',
                    fontSize:'14px'
                  }
              }>N</div>
           {showOver && <div style={{
            minHeight:'100px',
              width :'200px',
              background:'#eee',
              position: 'absolute',
              top:'0',
              right:'0',
              marginTop:'50px',
              marginRight:'50px',
              color:'red',
              fontSize:'14px',
              zIndex:'1',
              background:'#002f34',
              borderRadius:'7px'
             
           }}>
                <div>
                 
                 {!!localStorage.getItem('token') &&  <Link ><button className="logout-btn userId" >userID : {localStorage.getItem('userName')} </button></Link> }
                 </div>
                 <div>

                 {!!localStorage.getItem('token') &&  <Link to="/liked-products"><button className="logout-btn">Favourites </button></Link> }
                 </div>

                 <div>  {!!localStorage.getItem('token') &&  <Link to="/my-products"><button className="logout-btn">My Produts </button></Link> }</div>

                 <div>  {!!localStorage.getItem('token') &&  <Link to="/add-product"><button className="logout-btn">addproduct </button></Link> }</div>

                 <div>{!localStorage.getItem('token')?<Link to="/login">login</Link>:<button className="logout-btn" onClick={handleLogout}>logout</button>}</div>
           </div>}
          </div>  
            
        </div>
    );
}

export default Header;