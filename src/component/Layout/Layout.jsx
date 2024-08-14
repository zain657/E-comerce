import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function Layout() {
    return (
        <>
        <NavBar/>
        <div className="min-h-screen pt-12">
            <Outlet/>
        </div>
        <Footer/>
        </>
    )
}
