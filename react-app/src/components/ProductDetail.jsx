import { useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
function ProductDetail() {
    const [product, setproduct] = useState('');
    const p = useParams();
    console.log(p);
    useEffect(()=>{
        const url = 'http://localhost:4000/get-product/' + p.productId;
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
  return (
    <>
            <Header />
            Products Details:
        <div >
            {product && 
                <div className='d-flex justify-content-between flex-wrap'>
                        <div>
                            <img width="700px" height='300px' src={'http://localhost:4000/' + product.pimage} alt="" />
                            <h6>Products Description</h6>
                            {product.pdesc}
                        </div>
                        <div>
                        {product.pname}
                        <h3 className='m-2 price-text'>Rs. {product.price} /-</h3>
                        <p className='m-2'>{product.pname} | {product.category}</p>
                        <p className='m-2 text-success'>{product.desc}</p>
                        </div>
                </div>
            }
        </div>
    </>
  )
}

export default ProductDetail;