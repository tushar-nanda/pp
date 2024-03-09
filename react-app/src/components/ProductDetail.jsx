import { useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import API_URL from '../constants';
function ProductDetail() {
    const [product, setproduct] = useState('');
    const [user, setuser] = useState('')
    const p = useParams();
    console.log(p);
    useEffect(()=>{
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res)=>{
               console.log(res)
               if(res.data.product)
               setproduct(res.data.product)
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
    } , [])
    const handeleContact = (addedBy)=>{
        console.log('id',addedBy )

        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res)=>{
               console.log(res)
            //    if(res.data.user)
               setuser(res.data.user)
            })
            .catch((err)=>{
                // console.log(err);
                alert('server err');
            })
    }
  return (
    <>
            <Header />
            Products Details:
        <div >
            {product && 
                <div className='d-flex justify-content-between flex-wrap'>
                        <div>
                            <img width="400px" height='200px' src={API_URL + '/' + product.pimage} alt="" />
                           { product.pimage2 &&  <img width="400px" height='200px' src={API_URL + '/' + product.pimage2} alt="" />}
                            <h6>Products Description</h6>
                            {product.pdesc}
                        </div>
                        <div>
                        {product.pname}
                        <h3 className='m-2 price-text'>Rs. {product.price} /-</h3>
                        <p className='m-2'>{product.pname} | {product.category}</p>
                        <p className='m-2 text-success'>{product.desc}</p>

                        {product.addedBy && <button onClick={()=>handeleContact(product.addedBy)}>Show Contact Details</button>}
                        { user && user.username && <h4>{user.username}</h4>}
                        { user && user.email && <h4>{user.email}</h4>}
                        { user && user.mobile && <h4>{user.mobile}</h4>}
                        </div>
                </div>
            }
        </div>
    </>
  )
}

export default ProductDetail;