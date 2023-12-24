import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getCoupons } from '../../../redux/features/coupon/couponSlice';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [expire, setExpire] = useState(new Date());
    
    const { isLoading } = useSelector(state => state.coupon);
    const dispatch = useDispatch();

    const saveCoupon = async(e) => {
        e.preventDefault();
        
        if (name.length < 6) {
            return toast.error("coupon must be 6 characets")
        }
        if (discount <= 1) {
            return toast.error("discount must be greater than 1%")
        }
        if (expire <= Date.now()) {
            return toast.error("expiry date must be a future date")
        }
        const formData = {
            name,discount,expire
        }
        await dispatch(createCoupon(formData));
        await dispatch(getCoupons());
        setName("");
        setDiscount(0);
        setExpire(new Date());
    }

  return (
      <>
          {isLoading && <Loader/>}
          <div className='--mb2'>
              <h3>Create Coupon</h3>
              <p>Use this form to create a <b>coupon</b></p>
              <Card cardClass={"card"}>
                  <br />
                  <form onSubmit={saveCoupon}>
                      <label>Coupon Name: </label>
                      <input
                          type="text"
                          placeholder='name'
                          name='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                      <label>Coupon Discount: </label>
                      <input
                          type="number"
                          placeholder='discount'
                          name='discount'
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          required
                      />
                      <label>Expiry Date: </label>
                      <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={expire}
                          value={expire}
                          onChange={(e) => setExpire(e)}
                          required
                      />
                      <div className='--my'>
                          <button type='submit' className='--btn --btn-primary'>Save Coupon</button>
                      </div>
                  </form>
              </Card>
        </div>
      </>
  )
}

export default CreateCoupon