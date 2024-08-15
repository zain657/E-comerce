import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function CartCard({ product, removeProductFromCart, products, setProducts, animatingProductId }) {
    let [isloadingForCount, setIsloadingForCount] = useState(false);
    let [count, setCount] = useState(product.count);

    async function updateProductCount(id, count) {
        if (count < 1) {
            removeProductFromCart(id);
        }
        setIsloadingForCount(true);
        if(count>=1){
            let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + id,
                {
                    count,
                }
                , {
                    headers: {
                        token: localStorage.getItem('token'),
                    }
                })
            setProducts(data);
        }
        setIsloadingForCount(false);
    }

    useEffect(() => {
        setCount(product.count);
    }, [products])

    return (
        <>
            <div className={`bg-white dark:bg-slate-800 relative ${animatingProductId === product?.product._id ? 'animate-ping animate-once animate-duration-1000 animate-ease-in-out' : ''} dark:border-slate-600 rounded-lg shadow-md p-6 mb-4`}>
                <button className='absolute right-4 top-3 p-1 px-2' onClick={() => { removeProductFromCart(product?.product._id) }} type='button'><i className="fa-solid fa-x  hover:text-red-500"></i></button>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left font-semibold">Product</th>
                            <th className="text-left font-semibold">Price</th>
                            <th className="text-left font-semibold pl-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className="py-4">
                                <Link to={'/E-comerce/productDetails/' + product.product._id}>
                                    <div className="flex items-center h-16">
                                        <img className="h-16 w-16 mr-4" src={product.product.imageCover} alt={product.product.title} />
                                        <span className="font-semibold invisible md:visible">{product.product.title}.</span>
                                    </div>
                                </Link>
                            </td>

                            <td className="py-4">${product.price}</td>

                            <td className="py-4">

                                <div className="max-w-xs mx-auto ">
                                    <div className="relative flex items-center">
                                        <button disabled={isloadingForCount} onClick={() => { updateProductCount(product?.product._id, product.count - 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="disabled:cursor-not-allowed flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        {isloadingForCount ? <div className=' w-14  bg-transparent p-1 px-2 text-center'><i className="fa-solid fa-spinner fa-spin"></i></div> : <input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 w-14  text-center" placeholder="" onChange={(e) => { setCount(e.target.value) }} onBlur={() => { count !== product?.count && count * 1 && updateProductCount(product?.product._id, count) }} value={product?.count} required />}
                                        <button disabled={isloadingForCount} onClick={() => { updateProductCount(product?.product._id, product.count + 1) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="disabled:cursor-not-allowed flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ">
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <span className="font-semibold w-full p-1 text-start block md:hidden">{product.product.title}.</span>
                <span className="font-semibold w-full p-1 text-start text-red-500">Total: ${product.count * product.price}.</span>
            </div>
        </>
    )
}
