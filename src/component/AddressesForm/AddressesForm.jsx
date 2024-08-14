import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AddressesForm() {
    const [isLoading, setIsLoading] = useState(false);
    let { userToken, setUserToken } = useContext(AuthContext);
    let navigate = useNavigate();
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "name": "",
                "details": "",
                "phone": "",
                "city": ""
            },
            onSubmit: register,
            validationSchema: Yup.object({
                name: Yup.string().required('required'),
                details: Yup.string().required('required'),
                phone: Yup.string().required('required'),
                city: Yup.string().required('required'),
            })
        }
    );

    async function register() {
        setIsLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/addresses', values,{
            headers:{
                token:userToken,
            }
        }).then(({ data }) => {
            navigate('/E-comerce/addresses');
            
            setIsLoading(false);

        }).catch((errors) => {
            setIsLoading(false);
        });
    }




    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-gray-100 dark:bg-slate-900">
                <div className="w-full max-w-3xl mx-auto p-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Address</h1>
                        <form onSubmit={handleSubmit} className="mb-3">
                        <div className="mt-4">
                                <label htmlFor="name" className="block text-gray-700 dark:text-white mb-1">Name of address</label>
                                <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' id="name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="details" className="block text-gray-700 dark:text-white mb-1">Address</label>
                                <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' id="details" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                {touched.details && errors.details && <p className="text-red-500">{errors.details}</p>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                                <input type="text" id="city" onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                {touched.city && errors.city && <p className="text-red-500">{errors.city}</p>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="phone" className="block text-gray-700 dark:text-white mb-1">Phone</label>
                                <input type="text" onBlur={handleBlur} onChange={handleChange} value={values.phone} id="phone" name='phone' className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                                {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
                            </div>

        
                            <div className="mt-8 flex justify-end">
                            <button type='submit' className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-900 disabled:bg-slate-400 dark:disabled:bg-slate-400" disabled={isLoading}>Check out {isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
                        </div>
                        </form>



                    </div>
                </div>
            </div >

        </>
    )
}
