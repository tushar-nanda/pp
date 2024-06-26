import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
function MyProducts() {

    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);

    
    // const [rawproducts, setrawproducts] = useState([]);   //tushar
    const [search, setsearch] = useState("")
    // useEffect(()=>{
    //     if(!localStorage.getItem('token'))
    //     {
    //         navigate('/login');
    //     }
    // } , [])
    useEffect(()=>{
        const url = API_URL + '/my-products';
        let data = {userId : localStorage.getItem('userId')}
        axios.post(url , data)
            .then((res)=>{
                // console.log(res)
                if(res.data.products)
                {
                    setproducts(res.data.products);
                    // setrawproducts(res.data.products);
                }
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
    } , [refresh])
    const handlesearch = (value)=>{
        setsearch(value);
    }
    const handleClick = ()=>{
        let filteredPorducts= products.filter((item)=>{
            // console.log(item);
            if( item.pname.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item.category.toLowerCase().includes(search.toLocaleLowerCase()) )   
            {
                return item;
            }
        }) ;
        setcproducts(filteredPorducts);
    }
    const handleCategory = (v)=>{
        
        let filteredPorducts= products.filter((item)=>{
            // console.log(item);
            if( item.category.toLowerCase()== (v.toLocaleLowerCase()) )   
            {
                return item;
            }
        }) ;
        setcproducts(filteredPorducts);

    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        console.log('userId:', 'productId:', productId , userId);

        const url = API_URL + '/like-product';
        const data =  {userId , productId};
        alert('added to liked');
        axios.post(url , data)
            .then((res)=>{
                if(res.data.message)
                {
                    alert('added to liked');
                }
                
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
            
            
            
        }
        const handleDel = (pid)=>{
            if(!localStorage.getItem('userId'))
            {
                alert('please login first');
                return ;
            }
            const url = API_URL + '/delete-product';
            const data = {
                pid :pid,
                userId: localStorage.getItem('userId'),
            }
            
            axios.post(url , data)
            .then((res)=>{
                if(res.data.message)
              {  alert('Deleted');
              setrefresh(!refresh);
            }
        })
        .catch((err)=>{
            alert('server err');
        })
    }
    
    return (
        <div>
        <Header search={search} handlesearch={handlesearch} handleClick ={handleClick}/>
        <Categories handleCategory={handleCategory}/>
            {/* welcome to home
           {!!localStorage.getItem('token') &&  <Link to="/add-product"><button className="login-btn">addproduct </button></Link> } */}

           
           <div className="d-flex justify-content-center flex-wrap">
            {cproducts && cproducts.length>0 && 
                cproducts.map((item , index)=>{

                    return (
                        <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                            <p className="m-2">{item.pname} | {item.category}</p>
                        </div>

                        <img width='200px' src={API_URL+'/'+item.pimage} alt="Product" />
                            <h3 className="m-2 text-success">{item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    );
                })}
            </div>

                <h5>ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 && 
                products.map((item , index)=>{

                    return (
                        <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width='200px' src={API_URL + '/' + item.pimage} alt="Product" />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 text-success">{item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                            <p className="m-2 text-success">
                                <Link to={`/edit-product/${item._id}`}> EDIT PRODUCT</Link>
                            </p>

                            <button onClick={()=>handleDel(item._id)}>DELETE ADD</button>
                        </div>
                        
                    );
                })}
            </div>


           
        </div>
    );
}

export default MyProducts;