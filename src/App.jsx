import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Cart from './component/Cart/Cart'
import WishList from './component/WishList/WishList'
import Categorise from './component/Categories/Categorise'
import Brands from './component/Brands/Brands'
import NotFound from './component/NotFound/NotFound'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import ProtectedRouteForlog from './component/ProtectedRouteForlog/ProtectedRouteForlog'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import Settings from './component/Settings/Settings'
import ForgotPass from './component/ForgotPass/ForgotPass'
import ResetCode from './component/ResetCode/ResetCode'
import ResetPass from './component/ResetPass/ResetPass'
import ShippingAddress from './component/ShippingAddress/ShippingAddress'
import AllOrders from './component/AllOrders/AllOrders'
import UpdateProfile from './component/UpdateProfile/UpdateProfile'
import ResetPassword from './component/ResetPassword/ResetPassword'
import Addresses from './component/Addresses/Addresses'
import AddressesForm from './component/AddressesForm/AddressesForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishContextProvider from './Context/WishContext'
import AuthContextProvider from './Context/AuthContext'
import CartProductContextProvider from './Context/CartProductContext'



function App() {
  let router = createBrowserRouter([
    {
      path: '/E-comerce/', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectedRouteForlog><Login /></ProtectedRouteForlog> },
        { path: 'register', element: <ProtectedRouteForlog><Register /></ProtectedRouteForlog> },
        { path: 'forgotPass', element: <ProtectedRouteForlog><ForgotPass /></ProtectedRouteForlog> },
        { path: 'resetCode', element: <ProtectedRouteForlog><ResetCode /></ProtectedRouteForlog> },
        { path: 'resetPass', element: <ProtectedRouteForlog><ResetPass /></ProtectedRouteForlog> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'categorise', element: <ProtectedRoute><Categorise /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'updateProfile', element: <ProtectedRoute><UpdateProfile /></ProtectedRoute> },
        { path: 'resetPassword', element: <ProtectedRoute><ResetPassword /></ProtectedRoute> },
        { path: 'addresses', element: <ProtectedRoute><Addresses /></ProtectedRoute> },
        { path: 'addressesForm', element: <ProtectedRoute><AddressesForm /></ProtectedRoute> },
        { path: '*', element: <ProtectedRoute><NotFound /></ProtectedRoute> },
      ]
    }
  ])
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>

        <AuthContextProvider>
          <WishContextProvider>
            <CartProductContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />
            </CartProductContextProvider>
          </WishContextProvider>
        </AuthContextProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
