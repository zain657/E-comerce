import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards';
import HomeSlider from '../HomeSlider/HomeSlider';
import Search from '../Search/Search';
import HomeLoading from '../HomeLoading/HomeLoading';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    let {data , isLoading}=useQuery({
        queryKey:['product'],
        queryFn:getAllProducts,
        refetchOnMount:true,
    })

    useEffect(()=>{
        if (!isLoading) {
            window.scrollTo(0, 0);
        }
    },[isLoading]);
    useEffect(() => {
        if (data?.data) {
            setProducts(data?.data.data);
            setAllProducts(data?.data.data)
        }
    }, [data]);


    return (
        <>
            <div className="w-full min-h-screen overflow-auto dark:bg-slate-900">
                {isLoading && <HomeLoading/>}
                <HomeSlider/>
            <div className="container mt-14 mx-auto my-20">
                <div className="grid grid-cols-2 px-3  lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {products?.map((product,index)=>{
                        return <Cards key={index} product={product}/>
                    
                    })}
                </div>
            </div>
            <Search products={products} setProducts={setProducts} allProducts={allProducts}/>
            </div>
        </>
    )
}
