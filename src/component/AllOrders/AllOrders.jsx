import axios from 'axios'
import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';

export default function AllOrders() {
    const decoded = jwtDecode(localStorage.getItem('token'));

    async function getAllOrders() {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + decoded.id)
        console.log(data);
    }
    useEffect(()=>{
        getAllOrders()
    },[])
    
    return (
        <div>AllOrders</div>
    )
}
