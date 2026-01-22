import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='bg-gray-200 min-h-screen h-max'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default MainLayout
