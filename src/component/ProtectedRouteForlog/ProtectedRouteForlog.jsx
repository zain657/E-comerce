import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {userToken}=useContext(AuthContext);
    return (
        <>
            {!userToken ? children : <Navigate to='/E-comerce/'/>}
        </>
    )
}
