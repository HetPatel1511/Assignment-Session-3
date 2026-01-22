import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Modal from '../ProductModal';
import TextInput from '../TextInput';

const ShopLayout = () => {
  return (
    <div>
      <h1>Shop Layout</h1>
      <Outlet />
    </div>
  )
}

export default ShopLayout
