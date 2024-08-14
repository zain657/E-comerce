import React, { useContext, useEffect, useState } from 'react'
import logo from '/src/assets/logo.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import { CartProductContext } from '../../Context/CartProductContext';


export default function NavBar() {
    const [darkMode, setDarkMode] = useState(false);
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    let { userToken ,setUserToken } = useContext(AuthContext);
    let { products } = useContext(CartProductContext);
    useEffect(() => {
        const savedMode = localStorage.getItem('dark-mode');
        if (savedMode === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const darkOrLightMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('dark-mode', 'true');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('dark-mode', 'false');
            }
            return newMode;
        });
    };




    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-30 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl w-screen lg:w-11/12 flex flex-wrap items-center justify-between mx-auto p-4 pr-6">
                    <div className="flex items-center h-16 overflow-hidden space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-28" alt="Store logo" />
                    </div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button  type="button" onClick={darkOrLightMode} className="text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center " >{darkMode ? <i className="fa-solid fa-moon text-3xl"></i> : <i className="fa-solid fa-sun text-3xl text-gray-600"></i>}</button>
                        {userToken && <button onClick={handleToggle} data-collapse-toggle="navbar-Sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>}
                    </div>
                    {userToken && <div className={`items-center  justify-between ${show ? 'hidden':''} w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
                        <ul className="flex flex-col p-4  md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to='/' className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900  rounded md:bg-transparent md:hover:text-red-700  md:p-0 md:dark:hover:text-red-500  "><i className="fa-solid fa-shop"></i><span>Home</span></NavLink>
                            </li>
                            <li>
                                <NavLink to='/wishList' className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900 rounded md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:border-gray-700"><i className="fa-regular fa-heart"></i><span>Wish List</span></NavLink>
                            </li>
                            <li>
                                <NavLink to='/categorise' className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900 rounded md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:border-gray-700"><i className="fa-solid fa-table"></i><span>Categorise</span></NavLink>
                            </li>
                            <li>
                                <NavLink to='/brands' className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900 rounded md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:border-gray-700"><i className="fa-solid fa-tag"></i><span>Brands</span></NavLink>
                            </li>
                            <li>
                                <NavLink to='/cart' className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900 rounded md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:border-gray-700"><div className='relative flex flex-col'><i className="fa-solid fa-cart-shopping z-10"></i> <span className='px-1 rounded-full text-sm bg-red-700 text-white absolute top-[-17px] left-[4px]'>{products?.numOfCartItems}</span></div> <span>Cart</span></NavLink>
                            </li>
                            {userToken && <li>
                                <NavLink to='/settings' onClick={()=>{setShow(true)}} className="flex flex-col justify-center items-center nav-item font-semibold text-lg py-2 px-3 text-gray-900 rounded md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:border-gray-700"><i className="fa-solid fa-gear"></i>Settings</NavLink>
                            </li>}
                        </ul>
                    </div>}
                </div>
            </nav>
        </>
    )
}
