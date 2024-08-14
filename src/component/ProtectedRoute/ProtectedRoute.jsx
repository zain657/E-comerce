import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {userToken}=useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userToken) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }, [userToken]);
    return (
        <>
            {userToken ? children:<h1 className='text-red-600 font-extrabold text-5xl mt-28 text-center'>It seems that you are trying to log in <br/> without logging in, you failed fraudster.</h1>  }
        </>
    )
}
