import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Addresses() {
    let [addresses, setAddresses] = useState(null);
    let [isloading, setIsLoading] = useState(false);
    let [animatingProductId, setAnimatingProductId] = useState(null);

    async function getAllAddresses() {
        setIsLoading(true);
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
        setAddresses(data.data);
        setIsLoading(false);
    }
    useEffect(() => {
        getAllAddresses()
    }, [])

    async function removeAddress(id) {
        setAnimatingProductId(id);
        let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/addresses/' + id , {
            headers: {
                token: localStorage.getItem('token'),
            }
        })      
        setAddresses(data.data);
        setAnimatingProductId(null);
    }



    return (
        <>
            <div className=" w-full h-screen bg-gray-100 dark:bg-slate-900">
            {isloading && <div className='relative z-10 dark:bg-slate-900 bg-white w-full h-screen'><Loading /></div>}
                <div className="w-full mt-10 p-8">
                <Link to='/addressesForm' className='w-full text-center bg-red-600 hover:bg-red-800 mb-4 py-2 block rounded-full font-bold text-white my-5'>Add New Address</Link>
                    <div className="m-6">
                        <div className="flex flex-wrap -mx-6">
                            {addresses?.map((address,i) => {
                                return <div key={i} className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                                    <div className={`${animatingProductId === address._id ? 'animate-ping animate-once animate-duration-1000 animate-ease-in-out' : ''}flex items-center relative px-5 py-6 shadow-sm rounded-md dark:bg-slate-800 border-2 dark:border-slate-400 bg-white`}>
                                    <button type='button' onClick={()=>{removeAddress(address._id)}}><i className="fa-solid fa-trash dark:text-white absolute top-5 right-5 dark:hover:text-red-800 hover:text-red-800"></i></button>
                                        <div className="p-3 rounded-full bg-red-600 bg-opacity-75">
                                            <i className="fa-solid fa-location-dot text-2xl text-white"></i>
                                        </div>
                                        <div className="mx-5 ">
                                            <h4 className="text-2xl font-semibold dark:text-white">{address.name}</h4>
                                            <div className='flex flex-row gap-2 dark:text-slate-400'> <span>{address.city}</span> - <span>{address.phone}</span></div>
                                            <div className='dark:text-slate-400 '><span>{address.details}</span></div>
                                        </div>
                                    </div>
                                </div>
                            })}


                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
