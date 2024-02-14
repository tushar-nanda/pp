import "./Header.css"
import { Link } from "react-router-dom";
function Header()
{
    return (
        <div>
           <Link to="/">Home</Link>
           <div className="header"><span className="mt-3">sell and Purchanse in you city</span>
           <Link to="/login">login</Link>
           <br />
           <Link to="/signup">signup</Link>
           
            </div>
        </div>
    );
}

export default Header;