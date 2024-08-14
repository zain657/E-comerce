import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';

export default function Settings() {
    const navigate = useNavigate();
    const decoded = jwtDecode(localStorage.getItem('token'));
    function getUserInfo() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/users/' + decoded.id , {
            headers: {
                token: userToken,
            }
        })
    }
    let {data , isLoading}=useQuery({
        queryKey:['Users'],
        queryFn:getUserInfo,
    })

    let { userToken, setUserToken } = useContext(AuthContext);
    function signOut() {
        setUserToken('');
        localStorage.setItem('token', '');
        navigate('/E-comerce/login');
    }

    return (
        <>
            <div className='min-h-screen flex justify-center items-center dark:bg-slate-900 overflow-hidden'>
            {isLoading && <div className='relative z-10 dark:bg-slate-900 bg-white w-full h-screen'><Loading /></div>}
            <div className='md:flex mb-10  overflow-auto w-full'>
                <div className="p-5 border mx-auto md:mx-0 dark:bg-slate-800 md:w-1/4 min-h-[50vh] md:my-20 mt-20 rounded flex flex-col justify-center items-center text-center text-gray-500 max-w-sm">
                    <Link to='/E-comerce/updateProfile' className='w-full bg-red-600 hover:bg-red-800 mb-4 py-2 rounded-full font-bold text-white'>Update profile</Link>
                    <Link to='/E-comerce/addresses' className='w-full bg-red-600 hover:bg-red-800 mb-4 py-2 rounded-full font-bold text-white'>My Addresses</Link>
                    <img className="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/240" alt="" />
                    <div className="text-sm mt-5">
                        <h1 className="font-medium leading-none dark:text-white text-gray-900 hover:text-red-600 transition duration-500 ease-in-out">
                        {data?.data.data.name}
                        </h1>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 relative overflow-hidden md:w-3/4 shadow rounded-lg  border">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 dark:text-white font-medium text-gray-900">
                            User Profile
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            This is some information about the user.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200 ">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                    {data?.data.data.name}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Id:
                                </dt>
                                <dd className="mt-1 text-sm dark:text-white text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data?.data.data._id}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address:
                                </dt>
                                <dd className="mt-1 text-sm dark:text-white text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data?.data.data.email}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Phone number:
                                </dt>
                                <dd className="mt-1 text-sm dark:text-white text-gray-900 sm:mt-0 sm:col-span-2">
                                {data?.data.data.phone}
                                </dd>
                            </div>
                        </dl>
                        <button onClick={signOut} className='absolute p-2 px-4 bottom-2 right-6 border-red-800 border-2 hover:border-red-600 font-semibold text-lg py-2 text-red-800 rounded-2xl hover:rounded-full transition-all duration-300 md:hover:text-red-600 md:dark:hover:text-red-600 dark:text-red-800'><i className="fa-solid fa-right-from-bracket rotate-180 mr-2"></i>Sign out</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
