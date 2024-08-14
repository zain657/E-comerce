import React, { useState } from 'react'

export default function Search({products,setProducts,allProducts}) {
    const [showInput, setShowInput] = useState(false);
    
    function toggleInput() {
        setShowInput(!showInput);
    }

function search(value) {
    const foundProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(foundProducts);
}




    return (
        <>
            <div className='w-full fixed bottom-0'>
                <div className='relative'>
                    <button onClick={toggleInput} className='bg-red-700 p-2 rounded-2xl absolute right-0 bottom-28 md:bottom-2' type='button'><i className="fa-solid fa-magnifying-glass text-white text-3xl"></i></button>
                    <label
                        className={`transition-transform duration-300 ${showInput ? 'translate-x-0 mx-auto' : 'translate-x-[-100%]'}  relative dark:bg-slate-800 bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300`}
                        htmlFor="search-bar">
                        <input onChange={(e)=>{search(e.target.value)}} id="search-bar" placeholder="your keyword here"
                            className="px-6 py-2 w-full rounded-md flex-1 outline-none dark:text-white dark:bg-slate-800 bg-white" />
                        <button
                            className="w-full md:w-auto px-6 py-3 bg-red-600 border-red-600 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">

                            <div className="relative">
                                <div
                                    className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                </div>

                                <div className="flex items-center transition-all opacity-1 valid:"><span
                                    className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                    Search
                                </span>
                                </div>

                            </div>

                        </button>
                    </label>
                </div>
            </div>

        </>
    )
}
