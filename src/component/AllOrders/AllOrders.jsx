import axios from 'axios'
import React from 'react'

export default function AllOrders() {

    async function getAllOrders() {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17')
    }

    
    return (
        <div>AllOrders</div>
    )
}
