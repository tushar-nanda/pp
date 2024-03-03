import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
function Home() {

    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
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
                console.log(res)
                if(res.data.products)
                {
                    setproducts(res.data.products);
                    // setrawproducts(res.data.products);
                }
            })
            .catch((err)=>{
                console.log(err);
                alert('server err');
            })
    } , [])
    const handlesearch = (value)=>{
        setsearch(value);
    }
    const handleClick = ()=>{
        console.log('products' , products);
        // setproducts(rawproducts);
        let filteredPorducts= products.filter((item)=>{
            console.log(item);
            if( item.pname.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item.category.toLowerCase().includes(search.toLocaleLowerCase()) )   
            {
                return item;
            }
        }) ;
        setproducts(filteredPorducts);
    }
    return (
        <div>
        <Header search={search} handlesearch={handlesearch} handleClick ={handleClick}/>
            welcome to home
           {!!localStorage.getItem('token') &&  <Link to="/add-product">addproduct</Link> }
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 && 
                products.map((item , index)=>{

                    return (
                        <div key={item._id} className="card m-3">
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