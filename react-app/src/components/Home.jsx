import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {

    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    // useEffect(()=>{
    //     if(!localStorage.getItem('token'))
    //     {
    //         navigate('/login');
    //     }
    // } , [])
    useEffect(()=>{
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
            .then((res)=>{
                console.log(res)
                if(res.data.products)
                {
                    setproducts(res.data.products);
                }
            })
            .catch((err)=>{
                console.log(err);
                alert('server err');
            })
    } , [])
    
    return (
        <div>
        <Header />
            welcome to home
           {!!localStorage.getItem('token') &&  <Link to="/add-product">addproduct</Link> }
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 && 
                products.map((item , index)=>{

                    return (
                        <div className="card m-3">
                        <img width='200px' src={`http://localhost:4000/${item.pimage}`} alt="Product" />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 text-success">{item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;