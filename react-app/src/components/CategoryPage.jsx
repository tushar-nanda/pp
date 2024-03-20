import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function CategoryPage() {

    const navigate = useNavigate();
    const param = useParams();
        console.log(param);
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [issearch, setissearch] = useState(false)
    const [likedproducts, setlikedproducts] = useState([]);
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
        const url = API_URL + '/get-products?catName=' + param.catName ;
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

            const url2 = API_URL + '/liked-products';
            let data = {userId: localStorage.getItem('userId')}
            axios.post(url2,data)
            .then((res)=>{
                // console.log(res)
                if(res.data.products)
                {
                    setlikedproducts(res.data.products);
                    // setrawproducts(res.data.products);
                }
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
    } , [param , refresh])
    const handlesearch = (value)=>{
        setsearch(value);
    }
    
    const handleClick = () => {
        const url = API_URL + '/search?search=' + search + '&loc='+ localStorage.getItem('userLoc');

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

    const handleLike = (productId , e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        console.log('userId:', 'productId:', productId , userId);

        const url = API_URL + '/like-product';
        const data =  {userId , productId};
        alert('added to liked products')
        axios.post(url , data)
            .then((res)=>{
                if(res.data.message)
                {
                    setrefresh(!refresh);
                    alert('liked');
                }

                
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
    }

    const handleDisLike = (productId ,e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if(!userId)
        {
            alert('please login first.')
            return;
        }
        console.log('userId:', 'productId:', productId , userId);
        alert('removed from liked')
        const url = API_URL + '/dislike-product';
        const data =  {userId , productId};

        axios.post(url , data)
            .then((res)=>{
                if(res.data.message)
                { 
                    alert('liked');
                    setrefresh(!refresh);
                    
                }
                
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

           {issearch && cproducts && cproducts.length==0 && <h5>NO Search results Found 
            <button className="clear-btn" onClick={()=>{setissearch(false)}}>clear search</button></h5>}
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

                        <img width='200px' src={API_URL+'/'+item.pimage} alt="Product" />
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
                        <div  className="icon-con">
                        {
                            likedproducts.find((likedItem)=>likedItem._id == item._id)?
                            <FaHeart  onClick={(e) => handleDisLike(item._id,e)}  className="red-icons" />:
                            <FaHeart  onClick={(e) => handleLike(item._id,e)} className="icons" />

                        }
                        </div>
                        <img width='300px' height='200px' src={API_URL+'/' + item.pimage} alt="Product" />
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