import React, { useContext, useEffect, useState } from 'react'
import RatingStar from '../RatingStar/RatingStar'
import { Link } from 'react-router-dom'
import { AddProductToCart } from '../../CartService'
import { AuthContext } from '../../Context/AuthContext'
import { WishContext } from '../../Context/WishContext'


export default function Cards({ product }) {
    let { userToken } = useContext(AuthContext);
    let { isInWishList, AddProductToWish , isLoading } = useContext(WishContext);



    return (
        <>
            <div className="w-full group max-w-sm bg-white border mx-auto shadow-lg  hover:border-2 border-gray-200 rounded-lg hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] dark:bg-gray-800 dark:border-gray-700">
                <Link to={'/productDetails/' + product._id}>
                    <img className="p-3 rounded-t-lg " src={product.imageCover} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={'/productDetails/' + product._id}>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1 hover:underline">{product.title}</h5>
                        <p className='line-clamp-2 text-slate-500 hover:underline'>{product.description}</p>
                    </Link>
                    <RatingStar rating={product.ratingsAverage} />
                    <div className="flex items-center justify-between overflow-hidden">
                        <span className="text-3xl font-bold translate-x-[-150%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out text-gray-900 dark:text-white">${product.price}</span>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => { AddProductToWish(product._id, userToken) }} className="mr-3 hidden sm:block"><i className={`fa-solid fa-heart text-3xl ${isInWishList(product._id) ? 'text-red-500' : 'text-slate-400'}`}></i> {isLoading == product._id && <i className='fas fa-spin fa-spinner dark:text-white'></i>}</button>
                            <button type='button' onClick={() => { AddProductToCart(product._id, userToken) }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 "><i className="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
