import { useQuery , useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Loading from '../Loading/Loading';
import { WishContext } from '../../Context/WishContext';
import { AddProductToCart } from '../../CartService';
import { Link } from 'react-router-dom';

export default function WishList() {
    let [products, setProducts] = useState(null);
    const queryClient = useQueryClient();
    let [animatingProductId, setAnimatingProductId] = useState(null);
    let {handleCookieChange}=useContext(WishContext)

    function getWishList() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
    }
    let {data , isLoading}=useQuery({
        queryKey:['WishList'],
        queryFn:getWishList,
    })
    

    async function removeProducts(id) {
        setAnimatingProductId(id);
        let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
        Cookies.set('wish', JSON.stringify(data.data));
        queryClient.invalidateQueries(['WishList']);
        handleCookieChange();
        setAnimatingProductId(null);
    }

    useEffect(() => {
        if (data?.data) {
            setProducts(data.data);
        }
    }, [data]);
    

    return (
        <>
            <div className='dark:bg-slate-900 min-h-screen overflow-hidden'>
            {isLoading && <div className='w-full h-screen dark:bg-slate-900 bg-white z-50'><Loading /></div>}
                {products?.count>0 ? <div className='container px-4 mx-auto grid sm:grid-cols-2 xl:grid-cols-4 pt-20 pb-10 gap-5'>
                {products?.data.map((wish,i) => {
                    return <div key={i} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <Link className='w-full' to={'/productDetails/' + wish._id}>
                        <div className={`${animatingProductId === wish._id ? 'animate-ping animate-once animate-duration-1000 animate-ease-in-out' : ''} w-full hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] border-2 h-64 relative z-0 bg-gray-300 bg-center bg-cover hover:z-20 hover:scale-[1.05] transition-all duration-500 rounded-lg shadow-md `} style={{ backgroundImage: `url(${wish.imageCover})` }}>
                        <button type='button' onClick={(e)=>{removeProducts(wish._id); e.preventDefault();}} className='absolute top-5 right-5 p-3'><i className="fa-solid fa-x text-2xl z-20 text-black hover:text-red-800"></i></button>
                        </div>
                        </Link>
                        <div className="w-56 relative z-10 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                            <h3 className="pt-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white line-clamp-1 ">{wish.title}</h3>

                            <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                <span className="font-bold text-gray-800 dark:text-gray-200">${wish.price}</span>
                                <button type='button' onClick={()=>{AddProductToCart(wish._id,localStorage.getItem('token')); removeProducts(wish._id);}} className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Add to cart</button>
                            </div>
                        </div>
                    </div>
                })}
                </div>:<h1 className='text-4xl mt-28 dark:text-white font-extrabold md:w-3/4 mx-auto'>You have no products in the wishList.</h1>}

            </div>
        </>
    )
}
