import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss";
import loginImg from '../../assets/login.png'
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { register, RESET_AUTH } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const inititialState = {
    name: '',
    email: '',
    password: '',
    cPassword: '',
};

const Register = () => {
    const [formData, setFormData] = useState(inititialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isloggedIn, isSuccess } = useSelector(state => state.auth);
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }
    
    
    const registerUser = async(e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            return toast.error('all fields are required')
        }
        if (formData.password.length <6) {
            return toast.error('password must be 6 characters long')
        }
        if (!validateEmail(formData.email)) {
            return toast.error('please enter valid email')
        }
        if (formData.password !== formData.cPassword) {
            return toast.error("passwords do not match")
        }

        const userData = {
            name:formData.name,
            email:formData.email,
            password:formData.password,
        }

        await dispatch(register(userData))

    }

    useEffect(() => {
        if (isSuccess && isloggedIn) {
            navigate('/');
            dispatch(RESET_AUTH())
        }
    },[isSuccess, isloggedIn, dispatch, navigate])
    
    return (
        <>
            {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>

          <Card>
            <div className={styles.form}>
                  <h2>Register</h2>
                  <form onSubmit={registerUser} className=''>
                      <input
                          type="text"
                          name="name"
                      placeholder='name'
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                  />
                      <input
                          type="email"
                          name="email"
                      placeholder='email'
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                  <input
                          type="password"
                          name="password"
                      placeholder='password'
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                  />
                  <input
                          type="password"
                          name="cPassword"
                      placeholder='confirm password'
                      required
                      value={formData.cPassword}
                      onChange={handleInputChange}
                  />
                  <button
                      type='submit'
                      className='--btn --btn-primary --btn-block'
                  >Login</button>
                  </form>
                  <span className={styles.register}>
                      <p>Have an account? </p>
                      <Link to='/login'>Login</Link>
                  </span>
            </div>
          </Card>
          <div className={styles.img}>
              <img src={loginImg} alt="Register" width={400} />
          </div>
          
          
    </section></>
  )
}

export default Register