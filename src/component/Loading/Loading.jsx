import React from 'react'
import Style from './loading.module.css'

export default function Loading() {
    return (
        <>
            <div className="w-full  h-screen flex justify-center items-center zz fixed overflow-hidden dark:bg-black bg-white"><span className={Style.loader}></span></div>
        </>
    )
}
