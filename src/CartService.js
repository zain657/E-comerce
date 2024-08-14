import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

function darkOrLight(){
    if(localStorage.getItem('dark-mode')=='true'){
        return "dark"
    }
    return "light"
    
}

export async function AddProductToCart(productId,userToken) {
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            "productId": productId,
        },
        {headers:{
            token:userToken,
        }}
    )
    
    
    toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkOrLight(),
        transition: Bounce,
        });
    
}

