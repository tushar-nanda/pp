import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
function CategoryPage() {

    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [issearch, setissearch] = useState(false)
    // const [rawproducts, setrawproducts] = useState([]);   //tushar
    const [search, setsearch] = useState("")
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
    } , [])
    const handlesearch = (value)=>{
        setsearch(value);
    }
    
    const handleClick = () => {
        const url = 'http://localhost:4000/search?search=' + search;
         axios.get(url)
        .then((res) => {

            setcproducts(res.data.products);
            setissearch(true);
            
        })
        .catch((err) => {
            alert('server err');
        });

            // const data =  {userId , productId};
            // let filteredPorducts= products.filter((item)=>{
            // console.log(item);
            //     if( item.pname.toLowerCase().includes(search.toLocaleLowerCase()) ||
            //         item.pdesc.toLowerCase().includes(search.toLocaleLowerCase()) ||
            //         item.category.toLowerCase().includes(search.toLocaleLowerCase()) )   
            //     {
            //         return item;
            //     }
            // }) ;
            // setcproducts(filteredPorducts);
        }
    const handleCategory = (v)=>{
        
        let filteredPorducts= products.filter((item)=>{
            // console.log(item);
            if( item.category.toLowerCase()== (v.toLocaleLowerCase()) )   
            {
                
                return item;
            }
        }) ;

        setissearch(true);
        setcproducts(filteredPorducts);

    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        console.log('userId:', 'productId:', productId , userId);

        const url = 'http://localhost:4000/like-product';
        const data =  {userId , productId};

        axios.post(url , data)
            .then((res)=>{
                if(res.data.message)
                alert('liked');
                
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })



    }
    const handleProduct =(id)=>{
        navigate('/product/'+id);
    }
    
    return (
        <div>
        <Header search={search} handlesearch={handlesearch} handleClick ={handleClick}/>
        <Categories handleCategory={handleCategory}/>
            welcome to home
           {!!localStorage.getItem('token') &&  <Link to="/add-product"><button className="login-btn">addproduct </button></Link> }

           {issearch && cproducts && cproducts.length==0 && <h5>NO Search results Found</h5>}
           { issearch &&  cproducts && cproducts.length>0 && <h5>Search results
                <button className="clear-btn" onClick={()=>{setissearch(false)}}>clear search</button>
            </h5>}
           {issearch &&  <div className="d-flex justify-content-center flex-wrap">
            {cproducts && cproducts.length>0 && 
                cproducts.map((item , index)=>{

                    return (
                        <div  onClick={()=>handleProduct(item._id)} key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>

                        <img width='200px' src={`http://localhost:4000/${item.pimage}`} alt="Product" />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 text-success">{item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    );
                })}
            </div>}

            {!issearch && <div>
            <h5>ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 && 
                products.map((item , index)=>{

                    return (
                        <div onClick={()=>handleProduct(item._id)} key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width='300px' height='200px' src={`http://localhost:4000/${item.pimage}`} alt="Product" />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    );
                })}
            </div>
            </div>}

           
        </div>
    );
}

export default CategoryPage;