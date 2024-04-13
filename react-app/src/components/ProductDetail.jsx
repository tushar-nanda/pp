import { useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import API_URL from '../constants';
import io from 'socket.io-client';
let socket;
function ProductDetail() {
    const [product, setproduct] = useState('');
    const [user, setuser] = useState('')
    const p = useParams();
    console.log(p);
    const [msg, setmsg] = useState("")
    const [msgs , setmsgs] = useState([])

    useEffect(()=>{
        socket = io(API_URL);
        
        socket.on('connect',()=>{
            console.log('conn');
        })

        socket.on('getMsg' ,(data)=>{
            console.log(data,"data");

            if(product && product._id)
            {
            // const _data = data.filter((item , index )=>{
            //     return item.productId == product._id;
            // })
            setmsgs(data);
            }
        })
    } , [])
    
    const handleSend = ()=>{
        const data = {username:localStorage.getItem('userName') , msg , productId : product._id}
        socket.emit('sendMsg' , data)
        setmsg('');
    }
    
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
                            {product.pname}
                        <h3 className='m-2 price-text'>Rs. {product.price} /-</h3>
                        <p className='m-2'>{product.pname} | {product.category}</p>
                        <p className='m-2 text-success'>{product.desc}</p>

                        {product.addedBy && <button onClick={()=>handeleContact(product.addedBy)}>Show Contact Details</button>}
                        { user && user.username && <h4>{user.username}</h4>}
                        { user && user.email && <h4>{user.email}</h4>}
                        { user && user.mobile && <h4>{user.mobile}</h4>}
                        </div>
                        <div style={{marginRight:'100px' , width:'50vh'}}>
                            CHATS
                            {
                                msgs && msgs.length > 0 && 
                                msgs.map((item , index)=>{
                                    if(item.username == localStorage.getItem('userName'))
                                    {
                                        return (
                                            <p key={item._id} style={{marginLeft:'100px' ,background :'#61dafb' ,width:'320px',height:'30px',  borderRadius:'5px'}}>{item.username} : {item.msg }</p>
                                        )
                                    }
                                    if(item.username != localStorage.getItem('userName'))
                                    {
                                        return (
                                            <p key={item._id} style={{marginRight:'100px' , background :'#00ff62',width:'320px',height:'30px' , borderRadius:'5px'}}>{item.username} : {item.msg }</p>
                                        )
                                    }
                                })
                            }
                            <input value={msg} onChange={(e)=>{setmsg(e.target.value)}}  className='form-control' type="text" />
                            <button onClick={handleSend} className='btn btn-primary'>SEND</button>
                        </div>
                </div>
            }
        </div>
    </>
  )
}

export default ProductDetail;