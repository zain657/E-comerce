import React, { useContext, useEffect, useState } from 'react'
import imgeRe from '/src/assets/how-ecommerce-works.webp'
import { useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
    const [success, setSuccess] = useState();
    let {userToken}=useContext(AuthContext);
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "name": "",
                "email": "",
                "password": "",
                "rePassword": "",
                "phone": ""
            },
            onSubmit: register,
            validationSchema: Yup.object({
                name: Yup.string().required('Name is required').min(3, 'Name length must be more than 2.').max(20, 'Name length must be less than 20.'),
                email: Yup.string().required('Email is required').email('Enter valid email.'),
                password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/, 'Password must include uppercase, lowercase, number, special character, and be at least 5 characters long.'),
                rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Password and confirm password must be matched.'),
                phone: Yup.string().required('Phone is required')
            })
        }
    );

    async function register() {
        setSuccess('');
        setErr('');
        setIsLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
            setIsLoading(false);
            setSuccess(data.message);
            setTimeout(() => {
                navigate('/E-comerce/login')
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
        })
    }



    return (
        <>
            {!userToken && <div className="h-screen flex items-center justify-center  bg-gray-100 dark:bg-gray-900">
                <div className="mx-auto container">
                    <div className="flex justify-center px-6 py-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex ">
                            <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block bg-center lg:w-6/12 bg-contain bg-no-repeat rounded-l-lg"
                                style={{ backgroundImage: `url(${imgeRe})` }}></div>
                            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
                                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                                            Name
                                        </label>
                                        <input
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none  focus:shadow-outline"
                                            id="name"
                                            name='name'
                                            value={values.name}
                                            type="text"
                                            placeholder="Name"
                                        />
                                        {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
                                    </div>
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
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="mb-4 md:mr-2 md:mb-0">
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
                                        <div className="md:ml-2">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="rePassword">
                                                Confirm Password
                                            </label>
                                            <input
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none  focus:shadow-outline"
                                                id="rePassword"
                                                name='rePassword'
                                                value={values.rePassword}
                                                type="password"
                                                placeholder="******************"
                                            />
                                            {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="phone">
                                            Phone
                                        </label>
                                        <input
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none  focus:shadow-outline"
                                            id="phone"
                                            type="number"
                                            name='phone'
                                            value={values.phone}
                                            placeholder="Phone"
                                        />
                                        {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full disabled:bg-slate-400 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 dark:bg-red-700 dark:text-white dark:hover:bg-red-900 focus:outline-none focus:shadow-outline"
                                            type='submit'
                                            disabled={isLoading}
                                        >
                                            Register Account {isLoading && <i className='fas fa-spin fa-spinner'></i>}
                                        </button>
                                        {success && <p className='text-center text-green-600'>{success}</p>}
                                        {err && <p className='text-center text-red-600'>{err}</p>}
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <Link to='/E-comerce/login' className="inline-block text-sm text-red-500 dark:text-red-500 align-baseline hover:text-red-800 hover:underline"
                                        >
                                            Already have an account? Login!
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
