import React from 'react'
import styles from "./Admin.module.scss";
import Navbar from '../../components/admin/navbar/Navbar';
import AdminHome from '../../components/admin/adminHome/AdminHome';

const Admin = () => {
  return (
      <div className={styles.admin}>
          <div className={styles.navbar}>
              <Navbar/>
          </div>
          <div className={styles.content}>
              <AdminHome/>
          </div>
          
    </div>
  )
}

export default Admin