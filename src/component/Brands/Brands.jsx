import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function Brands() {

    function getAllBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    }
    let {data , isLoading}=useQuery({
        queryKey:['BrandsCards'],
        queryFn:getAllBrands,
    })


    return (
        <>
            <div className='min-h-screen dark:bg-slate-900 pt-12 overflow-hidden '>
            {isLoading && <div className='w-full h-screen dark:bg-slate-900 bg-white z-10'><Loading /></div>}
                <div className='grid grid-cols-1 gap-5 w-full mt-6'>
                {data?.data.data.map((brand,i)=>{
                    return <div key={i}
                    className="w-10/12 h-[50vh] border-2 mx-auto overflow-hidden  dark:border-slate-900 hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] rounded-lg hover:w-full hover:h-[70vh] transition-all duration-300 bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
                    <div className="p-6 dark:bg-slate-800 bg-slate-100 rounded-t-lg w-full">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight">
                            {brand?.name}
                        </h5>
                    </div>
                    <div className="relative overflow-hidden bg-cover w-full h-full  bg-no-repeat flex justify-center items-center">
                        <img
                            className="rounded-b-lg "
                            src={brand?.image}
                            alt={brand?.name} />
                    </div>
                </div>
                })}
                </div>
            </div>
        </>
    )
}
