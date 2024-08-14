import React from 'react'

export default function SubCategoriesModal({ modal, isLoading1, setModal, subCategories , setSubCategories }) {

    function handelClose(){
        setSubCategories(null);
        setModal(false);
    }


    return (
        <>

            {modal ? <div id="crypto-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            SubCategories
                            </h3>
                            <button onClick={() => { handelClose() }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <ul className="my-4 space-y-3">
                            {subCategories?.length==0 && <h4 className='text-red-700 text-xl'>There is nothing to display</h4>}
                                {subCategories?.map((sup,i) => {
                                    return <li key={i}>
                                        <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                            <span className="flex-1 ms-3 whitespace-nowrap">{sup.name}</span>
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div> : isLoading1 && <div className='w-full h-screen z-10 relative flex justify-center items-center'><i className='fas text-4xl fa-spin fa-spinner dark:text-white'></i></div>}

        </>
    )
}
