import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { Username } from '../../pages/profile/Profile';
import { AdminOnlyLink } from '../hiddenLink/AdminOnly';
import { CART_LOGOUT, TOTAL_CART } from '../../redux/features/cart/cartSlice';



export const logo = (
   
              <div className={styles.logo}>
                  <Link to='/'>
                      <h2>Shop<span>Vako</span>.</h2>
                  </Link>
              </div>
         
)

const activeLink = ({isActive}) => (isActive? `${styles.active}`:'')

const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, cartTotalQuantity } = useSelector(state => state.cart);

    useEffect(() => {
    dispatch(TOTAL_CART());
  },[dispatch,cartItems])

    const fixedNavBar = () => {
        if (window.scrollY > 50) {
            setScrollPage(true);
        } else {
            setScrollPage(false)
        }
    }
    window.addEventListener('scroll',fixedNavBar)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const hideMenu = () => {
        setShowMenu(false)
    }

    const logoutUser = async() => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        
        navigate('/login')
   } 

    const cart = (
        <span className={styles.cart}>
            <Link to={'/cart'}>
                Cart 
                <FaCartShopping size={20} />
                <p style={{color:'orange'}}>{cartTotalQuantity}</p>
            </Link>

        </span>
    )
  return (
      <header className={scrollPage?`${styles.fixed}`:null}>
          <div className={styles.header}>{logo}
              <nav className={showMenu? `${styles['show-nav']}`:`${styles['hide-nav']}`}>
                  
                  <div className={showMenu? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`:`${styles['nav-wrapper']}`} onClick={hideMenu}>
                      
                  </div>

                  <ul>
                      <li className={styles['logo-mobile']}>
                          {logo}
                            <IoIosClose size={22} color='#fff' onClick={hideMenu}/>
                      </li>
                      <li>
                          
                          <ShowOnLogin>
                              <NavLink to='/shop' className={activeLink}>
                              Shop
                            </NavLink>
                          </ShowOnLogin>
                      </li>
                      <li>
                          <AdminOnlyLink>
                              <ShowOnLogin>
                              <NavLink to='/admin/home' className={activeLink}>
                              |  admin
                            </NavLink>
                          </ShowOnLogin>
                          </AdminOnlyLink>
                          
                      </li>
                  </ul> 
                  
                  <div className={styles['header-right']}>
                      <span className={styles.links}>
                          
                            <ShowOnLogin>
                              <Link to='/profile' >
                                  <FaUserCircle size={16} color='#ff7722' />
                                  <Username/>
                            </Link>
                          </ShowOnLogin>

                          <ShowOnLogout>
                              <NavLink to={'login'} className={activeLink}>
                              Login
                                </NavLink>
                          </ShowOnLogout>
                          
                          <ShowOnLogout>
                          <NavLink to={'register'} className={activeLink}>
                              Register
                          </NavLink>
                          </ShowOnLogout>

                          <ShowOnLogin>
                          <NavLink to={'order-history'} className={activeLink}>
                              My Order
                          </NavLink>
                          </ShowOnLogin>

                          <ShowOnLogin>
                          <Link to={'/'} onClick={logoutUser}>
                              Logout
                          </Link>
                          </ShowOnLogin>
                      </span>
                      {cart}
                  </div>
              </nav>
              
                  <div className={styles['menu-icon']}>
                  {cart}
                    <BiMenuAltRight size={28} onClick={toggleMenu} />
              </div>
             

            </div>
    </header>
  )
}

export default Header