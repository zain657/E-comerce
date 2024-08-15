import React from 'react'
import notFoundImage from '/src/assets/notFoundPage.png';

export default function NotFound() {
    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <img src={notFoundImage} alt="notFound" />
            </div>
        </>
    )
}
