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
          
          <Route path='/admin/*' element={
            <AdminOnly>
              <Admin/>
            </AdminOnly>
            } />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
