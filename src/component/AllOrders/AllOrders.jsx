import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AllOrders() {
    let navigate=useNavigate();
    useEffect(()=>{
        navigate('/E-comerce/cart')
    },[])
    
    return (
        <div>AllOrders</div>
    )
}
