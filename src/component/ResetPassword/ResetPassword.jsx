import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/src/assets/logo.png'

export default function ResetPassword() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
    const [success, setSuccess] = useState();
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "currentPassword": "",
                "password": "",
                "rePassword": ""
            },
            onSubmit: register,
            validationSchema: Yup.object({
                currentPassword: Yup.string().required('Password is required'),
                password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/, 'Password must include uppercase, lowercase, number, special character, and be at least 5 characters long.'),
                rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Password and confirm password must be matched.'),
            })
        }
    );

    async function register() {
        setSuccess('');
        setErr('');
        setIsLoading(true);
        await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {
            headers: {
                token: localStorage.getItem('token'),
            }
        }).then(({ data }) => {
            setIsLoading(false);
            setSuccess(data.message);
            setTimeout(() => {
                navigate('/E-comerce/settings')
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
                        <img className="w-32 h-28 mr-2" src={logo} alt="logo" />
                    </a>
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 text-center" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="currentPassword" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.currentPassword} type='password' name="currentPassword" id="currentPassword" placeholder="******************" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600  text-start w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required="" />
                                {touched.currentPassword && errors.currentPassword && <p className="text-red-500">{errors.currentPassword}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.password} type='password' name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="******************" required="" />
                                {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="rePassword" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type='password' name="rePassword" id="rePassword" placeholder="******************" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required="" />
                                {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full disabled:bg-slate-400 dark:disabled:bg-slate-400 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reset passwod {isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
                            {!isLoading && success && <p className='text-green-500 text-center'>{success}</p>}
                            {!isLoading && err && <p className='text-red-500 text-center'>{err}</p>}
                            <Link to='/E-comerce/updateProfile' className='text-red-600 hover:underline font-bold'>Or Update profile</Link>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
