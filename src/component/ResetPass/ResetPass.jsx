import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/src/assets/logo.png'

export default function ResetPass() {







    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
    const [success, setSuccess] = useState();
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "email":"",
                "newPassword": ""
            },
            onSubmit: register,
            validationSchema: Yup.object({
                email: Yup.string().required('Email is required').email('Enter valid email.'),
                newPassword: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/, 'Password must include uppercase, lowercase, number, special character, and be at least 5 characters long.'),
            })
        }
    );

    async function register() {
        setSuccess('');
        setErr('');
        setIsLoading(true);
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values).then(({ data }) => {
            setIsLoading(false);
            setSuccess(data.message);
            setTimeout(() => {
                navigate('/login')
            }, 500)
        }).catch((errors) => {
            let err = errors.response.data;
            if (err.message == 'fail') {
                err = err.errors.msg;
            }
            else {
                err = err.message;
            }
            setErr(err);
            setIsLoading(false);
        });

    }





    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-32 h-28 mr-2" src={logo} alt="logo"/>
                    </a>
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="name@company.com" required=""/>
                                {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.newPassword} type="password" name="newPassword" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required=""/>
                                {touched.newPassword && errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full disabled:bg-slate-400 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reset passwod {isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
                            {!isLoading &&success && <p className='text-green-500 text-center'>{success}</p>}
                            {!isLoading &&err && <p className='text-red-500 text-center'>{err}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
