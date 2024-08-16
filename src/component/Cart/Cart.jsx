import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading';
import { Bounce, toast } from 'react-toastify'
import CartCard from '../CartCard/CartCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartProductContext } from '../../Context/CartProductContext';

export default function Cart() {
    let { userToken } = useContext(AuthContext);
    let [isloading, setIsLoading] = useState(false);
    let {products, setProducts} = useContext(CartProductContext)
    let [animatingProductId, setAnimatingProductId] = useState(null);
    function getCartProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: userToken,
            }
        })
    }
    let {data , isLoading}=useQuery({
        queryKey:['CartProducts'],
        queryFn:getCartProduct,
    })



    async function clearAllProducts() {
        setIsLoading(true);
        let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: userToken,
            }
        }).finally(()=>{setIsLoading(false);})
        setProducts(null);
    }



    function darkOrLight() {
        if (localStorage.getItem('dark-mode') == 'true') {
            return "dark"
        }
        return "light"

    }

    async function removeProductFromCart(id) {
        setAnimatingProductId(id);
        let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id, {
            headers: {
                token: userToken,
            }
        })
        setProducts(data);
        setAnimatingProductId(null);

        toast.success('The product has been successfully deleted.', {
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

    useEffect(() => {
        if (data?.data) {
            setProducts(data.data);
        }
    }, [data]);

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900 min:h-screen py-8 mt-4 min-h-screen overflow-hidden dark:text-white">
                {(isLoading || isloading) && <div className='w-full h-screen dark:bg-slate-900 bg-white z-50'><Loading /></div>}
                <div className="container mx-auto px-4 my-10">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        {products ? <div className="md:w-3/4">
                            {products?.data.products.map((product, index) => {
                                return <CartCard key={index} animatingProductId={animatingProductId} product={product} removeProductFromCart={removeProductFromCart} setProducts={setProducts} products={products}/>
                            })}
                        </div>: <h1 className='text-4xl font-extrabold md:w-3/4'>You have no products in the cart.</h1>}
                        <div className="md:w-1/4">
                        <div className="bg-white dark:bg-slate-800 dark:border-slate-600 dark:border-2 rounded-lg shadow-md p-2 ">
                                <button onClick={clearAllProducts} className="bg-red-500 block text-center hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full">Clear cart</button>
                            </div>
                            <div className="bg-white dark:bg-slate-800 dark:border-slate-600 dark:border-2 rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${products ? products?.data.totalCartPrice : "0.00"}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>$0.00</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">${products ? products?.data.totalCartPrice : "0.00"}</span>
                                </div>
                                <Link to={'/E-comerce/shippingAddress/' + data?.data.data._id} className="bg-red-500 block text-center hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
