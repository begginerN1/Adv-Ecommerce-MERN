import React, { useState } from 'react'
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";

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

    const fixedNavBar = () => {
        if (window.scrollY > 800) {
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

    const cart = (
        <span className={styles.cart}>
            <Link to={'/cart'}>
                Cart 
                <FaCartShopping size={20} />
                <p>0</p>
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
                          <NavLink to='/shop' className={activeLink}>
                              Shop
                            </NavLink>
                      </li>
                  </ul> 
                  
                  <div className={styles['header-right']}>
                      <span className={styles.links}>
                          <NavLink to={'login'} className={activeLink}>
                              Login
                          </NavLink>
                          <NavLink to={'register'} className={activeLink}>
                              Register
                          </NavLink>
                          <NavLink to={'order-history'} className={activeLink}>
                              My Order
                          </NavLink>
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