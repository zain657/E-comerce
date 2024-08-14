import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function ShippingAddress() {
    const { cartId } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingp, setIsLoadingp] = useState(false);
    const [isLoadingc, setIsLoadingc] = useState(false);
    let [addresses, setAddresses] = useState(null);
    let { userToken, setUserToken } = useContext(AuthContext);
    let { handleSubmit, values, handleChange, errors, touched, handleBlur, setFieldValue } = useFormik(
        {
            initialValues: {
                "details": "",
                "phone": "",
                "city": ""
            },
            onSubmit: register,
            validationSchema: Yup.object({
                details: Yup.string().required('required'),
                phone: Yup.string().required('required'),
                city: Yup.string().required('required'),
            })
        }
    );

    async function register() {
        setIsLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' + cartId, { shippingAddress: values }, {
            headers: {
                token: userToken,
            },
            params: {
                url: 'http://localhost:5173'
            }
        }).then(({ data }) => {
            location.href = data.session.url;

            setIsLoading(false);

        }).catch((errors) => {
            setIsLoading(false);
        });
    }


    async function getAllAddresses() {
        setIsLoadingp(true);
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
        setAddresses(data.data);
        setIsLoadingp(false);
    }
    useEffect(() => {
        getAllAddresses()
    }, [])

    async function setAddressFromAddresses(id) {
        setIsLoadingc(true);
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses/' + id, {
            headers: {
                token: localStorage.getItem('token'),
            }
        })
        setFieldValue('details', data.data.details);
        setFieldValue('phone', data.data.phone);
        setFieldValue('city', data.data.city);
        setIsLoadingc(false);
    }


    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-gray-100 dark:bg-slate-900">
                {isLoadingp && <div className='relative z-10 dark:bg-slate-900 bg-white w-full h-screen'><Loading /></div>}
                <div className="w-full max-w-3xl mx-auto p-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

                        <form className="max-w-sm mx-auto mb-5 text-center">
                            <div className='flex flex-row'>
                            <select onChange={(e) => setAddressFromAddresses(e.target.value)} id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Choose the address.  *optional</option>
                                {addresses?.map((address, i) => {
                                    return <option key={i} value={address._id}>{address.name} </option>
                                })}
                            </select>
                            {isLoadingc && <i className='fas fa-spin fa-spinner text-white block'></i>}
                            </div>
                            <Link to='/addressesForm' className=' hover:underline mb-4 font-bold text-red-600 my-5'>Add New Address</Link>
                        </form>


                        <form onSubmit={handleSubmit} className="mb-3">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
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
