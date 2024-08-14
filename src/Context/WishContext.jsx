import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import Cookies from 'js-cookie';

export const WishContext = createContext();

export default function WishContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [wishList, setWishList] = useState(() => {
        const savedWishList = Cookies.get('wish');
        return savedWishList ? JSON.parse(savedWishList) : [];
    });

    function darkOrLight(){
        if(localStorage.getItem('dark-mode')=='true'){
            return "dark"
        }
        return "light"
        
    }


    async function AddProductToWish(productId, userToken) {
            setIsLoading(productId);
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                { headers: { token: userToken } }
            );

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

    
    setWishList(data.data);
    Cookies.set('wish', JSON.stringify(data.data));
    setIsLoading(false);

    }
    function isInWishList(id){
        for(let i=0;i<wishList.length;i++){
            if(id==wishList[i]){
                return true;
            }
        }
    }

    const handleCookieChange = () => {
        const updatedWishList = Cookies.get('wish');
        if (updatedWishList) {
            setWishList(JSON.parse(updatedWishList));
        }
    };

    return (
        <WishContext.Provider value={{ isInWishList, AddProductToWish, handleCookieChange , isLoading }}>
            {children}
        </WishContext.Provider>
    );
}
