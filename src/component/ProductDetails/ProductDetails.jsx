import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import RatingStar from '../RatingStar/RatingStar';
import Sliderr from '../Slider/Slider';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { AddProductToCart } from '../../CartService'
import { AuthContext } from '../../Context/AuthContext'
import { WishContext } from '../../Context/WishContext'


export default function ProductDetails() {
    let {userToken} = useContext(AuthContext);
    let { id } = useParams();
    let [productDetails, setProductDetails] = useState(null);
    let [relatedProduct, setRelatedProduct] = useState(null);
    let [isloading, setIsLoading] = useState(false);
    const [slider, setSlider] = useState(false);
    let { isInWishList, AddProductToWish , isLoading } = useContext(WishContext);

    function slideOrClick() {
        setSlider(!slider);
    }

    useEffect(() => {
        if (isloading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isloading]);


    useEffect(() => {
        getProductDetails();
    }, [id])

    async function getProductDetails() {
        setIsLoading(true);
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id);
        setProductDetails(data.data);
        getRealtedProuduct(data.data.category._id);
    }

    async function getRealtedProuduct(categoryId) {
        let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products',{
            params:{
                category:categoryId,
            }
        })
        setRelatedProduct(data.data);
        setIsLoading(false);
    }


    function changeImage(src) {
        document.getElementById('mainImage').src = src;
    }
    return (
        <>
            <div className="bg-gray-100 overflow-hidden mt-12 min-h-screen dark:bg-slate-900 dark:text-white">
                {isloading && <div className='w-full h-screen  fixed z-50 '><Loading /></div>}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-6/12 xl:w-5/12 px-4 mb-8 ">
                            
                                {slider && <div className="w-8/12 mx-auto h-full">
                                    <Sliderr imges={productDetails?.images}/>
                                </div>}
                            {!slider && <img src={productDetails?.imageCover} alt="Product"
                                className="w-8/12 rounded-lg shadow-md mb-4 mx-auto " id="mainImage" />}
                            {!slider && <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                {productDetails?.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Photo ${index + 1}`}
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onClick={() => changeImage(img)}
                                    />
                                ))}
                            </div>}
                            <button type='button' onClick={slideOrClick} className='mx-auto mb-2 bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>{!slider ? 'Image slide' : 'Image Click'}</button>
                        </div>
                        <div className="w-full md:w-1/2 px-4 dark:text-white">
                            <h2 className="text-3xl font-bold mb-2 mt-7 md:mt-0">{productDetails?.title}</h2>
                            <p className="text-gray-600 mb-4">Brand: {productDetails?.brand.name}</p>
                            <div className="mb-4">
                                {productDetails?.priceAfterDiscount ? <span className="text-2xl font-bold mr-2">{productDetails?.priceAfterDiscount}$</span> : <span className="text-2xl font-bold mr-2">{productDetails?.price}$</span>}
                                {productDetails?.priceAfterDiscount && <span className="text-gray-500 line-through">{productDetails?.price}$</span>}
                            </div>
                            <RatingStar rating={productDetails?.ratingsAverage} />
                            <p className="text-gray-700 mb-6 dark:text-white">{productDetails?.description}.</p>


                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={()=>{AddProductToCart(productDetails?._id,userToken)}}
                                    className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => { AddProductToWish(productDetails?._id,userToken) }}
                                    className={`bg-gray-200 ${isInWishList(productDetails?._id) ? 'text-red-500' : 'text-slate-400'} flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}>
                                        {isLoading == productDetails?._id && <i className='fas fa-spin fa-spinner dark:text-white'></i>}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    Wishlist
                                </button>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Category:</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-white">
                                    <li>{productDetails?.category.name}</li>
                                    <li>{productDetails?.category._id}</li>
                                    <li>Sold : {productDetails?.sold}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto my-12 overflow-hidden px-2">
                    <RelatedProduct products={relatedProduct}/>
                </div>
            </div>
        </>
    )
}
