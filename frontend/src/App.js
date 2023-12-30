import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser } from './redux/features/auth/authSlice';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';
import AdminOnly from './components/hiddenLink/AdminOnly';
import NotFound from './pages/404/NotFound';
import Product from './pages/shop/Product';
import ProdDetails from './components/product/productDetails/ProdDetails';
import Cart from './pages/cart/Cart';

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const { isloggedIn, user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])
  
  useEffect(() => {
    if (isloggedIn && user === null) {
      dispatch(getUser())
    }
  },[dispatch, isloggedIn, user])

  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/register' element={<Register/> } />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shop' element={<Product />} />
          <Route path='/product-details/:id' element={<ProdDetails />} />
          <Route path='/cart/' element={<Cart />} />
          
          <Route path='/admin/*' element={
            <AdminOnly>
              <Admin/>
            </AdminOnly>
            } />
          
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
