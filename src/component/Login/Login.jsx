import React, { useContext, useEffect, useState } from 'react'
import imgeRe from '/src/assets/how-ecommerce-works.webp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function Register() {
    const navigate = useNavigate();
    const [isLoading,setIsLoading]=useState(false);
    const [err,setErr]=useState();
    const [success,setSuccess]=useState();
    let {userToken,setUserToken}=useContext(AuthContext);
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "email": "",
                "password": "",
            },
            onSubmit: register,
            validationSchema: Yup.object({
                email: Yup.string().required('Email is required').email('Enter valid email.'),
                password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/, 'Password must include uppercase, lowercase, number, special character, and be at least 5 characters long.'),
            })
        }
    );
    
    async function register() {
        setSuccess('');
        setErr('');
        setIsLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({data})=>{
            setIsLoading(false);
            setSuccess(data.message);
            setUserToken(data.token);
            localStorage.setItem('token',data.token);
            
            setTimeout(() => {
                navigate('/')
            }, 600)
        }).catch((errors)=>{
            let err=errors.response.data;
            if(err.message=='fail'){
                err=err.errors.msg;
            }
            else{
                err=err.message;
            }
            setErr(err);
            setIsLoading(false);
        });
    }


    return (
        <>
            { <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="mx-auto container">
                    <div className="flex justify-center px-6 py-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex ">
                            <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block bg-center lg:w-6/12 bg-contain bg-no-repeat rounded-l-lg"
                                style={{ backgroundImage: `url(${imgeRe})` }}></div>
                            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Login</h3>
                                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none  focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            value={values.email}
                                            name='email'
                                            placeholder="Email"
                                        />
                                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>
                                        <div className="mb-4 ">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none  focus:shadow-outline"
                                                id="password"
                                                name='password'
                                                value={values.password}
                                                type="password"
                                                placeholder="******************"
                                            />
                                            {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
                                        </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full disabled:bg-slate-400 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 dark:bg-red-700 dark:text-white dark:hover:bg-red-900 focus:outline-none focus:shadow-outline"
                                            type='submit'
                                            disabled={isLoading}
                                        >
                                            Login {isLoading && <i className='fas fa-spin fa-spinner'></i>}
                                        </button>
                                        {success && <p className='text-center text-green-600'>{success}</p>}
                                        {err && <p className='text-center text-red-600'>{err}</p>}
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <Link className="inline-block text-sm hover:underline text-red-500 dark:text-red-500 align-baseline hover:text-red-800"
                                            to="/forgotPass">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link to='/register' className="inline-block hover:underline text-sm text-red-500 dark:text-red-500 align-baseline hover:text-red-800"
                                            >
                                            Need an account? Sign Up
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
