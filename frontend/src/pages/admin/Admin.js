import React from 'react'
import styles from "./Admin.module.scss";
import Navbar from '../../components/admin/navbar/Navbar';
import AdminHome from '../../components/admin/adminHome/AdminHome';
import { Route, Routes } from 'react-router-dom';
import Category from '../../components/admin/category/Category';
import Brand from '../../components/admin/brand/Brand';
import AddProducts from '../../components/admin/addProduct/AddProducts';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts';
import EditProducts from '../../components/admin/editProduct/EditProducts';
import Coupon from '../../components/admin/coupon/Coupon';

const Admin = () => {
  return (
      <div className={styles.admin}>
          <div className={styles.navbar}>
              <Navbar/>
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path='home' element={<AdminHome />}/>
              <Route path='category' element={<Category />} />
              <Route path='brand' element={<Brand />} />
          
              <Route path='add-product' element={<AddProducts/>}/>
              <Route path='all-product' element={<ViewProducts/>}/>
              <Route path='edit-product/:id' element={<EditProducts/>}/>
              <Route path='coupon' element={<Coupon/>}/>
            </Routes>
        
          </div>
          
    </div>
  )
}

export default Admin