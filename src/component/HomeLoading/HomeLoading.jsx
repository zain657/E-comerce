import React, { useEffect } from 'react'

export default function HomeLoading() {

    function showOverlay() {
        document.documentElement.classList.add('overflow-hidden');
    }

    function hideOverlay() {
        document.documentElement.classList.remove('overflow-hidden');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        showOverlay();
        return () => hideOverlay();
    }, []);



    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 pt-28  z-10 overflow-y-auto bg-white dark:bg-slate-900 '>
            <div className='h-80 w-full rounded-3xl md:rounded-full mb-5 bg-gray-300 dark:border-slate-400 dark:border-2 overflow-hidden shadow-lg animate-pulse'></div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen gap-5 container  mx-auto">
                {Array.from({ length: 25 }, (_, index) => (
                    <div key={index} className="w-12/12">
                    <div className="max-w-sm rounded dark:border-slate-400 dark:border-2 overflow-hidden shadow-lg animate-pulse">
                        <div className="h-48 bg-gray-300"></div>
                        <div className="px-6 py-4">
                            <div className="h-6 bg-gray-300 mb-2"></div>
                            <div className="h-4 bg-gray-300 w-2/3"></div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 w-1/2"></div>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
            </div>
        </>
    )
}
