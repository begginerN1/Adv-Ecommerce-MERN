import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/features/auth/authSlice'
import styles from "./Navbar.module.scss";
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive })=>(isActive? `${styles.active}`:"")

const Navbar = () => {
    const user = useSelector(selectUser);
    // console.log(user);
    
    const username = user?.name;
  return (
      <div className={styles.navbar}>
          <div className={styles.user}>
              <FaUserCircle size={50} color='#fff' />
              {/* <div style={{ width: '50px', height: '50px', borderRadius: "50%", backgroundColor:'white',background: `url(${user?.photo}) center no-repeat`, backgroundSize: 'contain', marginBottom:'10px'}}>
              </div> */}
              <h4>{ username }</h4>
          </div>
          <nav>
              <ul>
                  <li>
                      <NavLink to={'/admin/home'} className={activeLink}>Home</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/admin/all-product'} className={activeLink}>All Products</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/admin/add-product'} className={activeLink}>Add Product</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/admin/coupon'} className={activeLink}>Coupon</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/admin/category'} className={activeLink}>Category</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/admin/brand'} className={activeLink}>Brand</NavLink>
                  </li>
                  
              </ul>
          </nav>
    </div>
  )
}

export default Navbar