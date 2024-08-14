import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function ResetCode() {



    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
    const [success, setSuccess] = useState();
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik(
        {
            initialValues: {
                "resetCode": "",
            },
            onSubmit: register,
            validationSchema: Yup.object({
                resetCode: Yup.number().required('resetCode is required'),
            })
        }
    );

    async function register() {
        setSuccess('');
        setErr('');
        setIsLoading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values).then(({ data }) => {
            setIsLoading(false);
            setSuccess(data.status);
            setTimeout(() => {
                navigate('/resetPass')
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
            <div className='min-h-screen dark:bg-slate-900 flex justify-center items-center'>
                <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-red-300">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember your password?
                                    <Link to='/login' className="text-red-600 decoration-2 hover:underline font-medium" href="#">
                                        Login here
                                    </Link>
                                </p>
                                <Link className='text-red-500 hover:underline font-extrabold' to='/forgotPass'>Back</Link>
                            </div>

                            <div className="mt-5 forg">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label htmlFor="resetCode" className="block text-sm font-bold ml-1 mb-2 dark:text-white">ResetCode</label>
                                            <div className="relative">
                                                <input type="text" id="resetCode" name="resetCode" value={values.resetCode} onChange={handleChange} onBlur={handleBlur} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-red-500 focus:ring-red-500 shadow-sm" required aria-describedby="email-error" />
                                                {touched.resetCode && errors.resetCode && <p className="text-red-500">{errors.resetCode}</p>}
                                            </div>
                                        </div>
                                        <button disabled={isLoading} type="submit" className="py-3 disabled:bg-gray-400 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Verification {isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
                                        { success && <p className='text-green-500 text-center'>{success}</p>}
                                        { err && <p className='text-red-500 text-center'>{err}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                        <a href='https://github.com/zain657' className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-red-600 dark:text-gray-500 dark:hover:text-gray-200" target="_blank">
                            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            View Github
                        </a>
                        <a className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-red-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">

                            Contact us!
                        </a>
                    </p>
                </main>
            </div>
        </>
    )
}
