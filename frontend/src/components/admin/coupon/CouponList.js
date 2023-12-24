import React, { useEffect, useState } from 'react'
import Coupon from './Coupon'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCoupon, getACoupons, getCoupons } from '../../../redux/features/coupon/couponSlice'
import { FaTrashAlt } from 'react-icons/fa';
import { format } from "date-fns";
import Loader from '../../loader/Loader';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';


const CouponList = () => {
    // const [coupon, setCoupon]=useState()
    const { isLoading, coupons} =useSelector(state=>state.coupon)
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshState = async () => {
            await dispatch(getCoupons());
        }
        refreshState();
    }, [dispatch]);

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Brand',
            message: 'Are you sure to delete this brand',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => couponDelete(id)
                },
                {
                    label: 'Cancel',
                    //   onClick: () => alert('Click No')
                }
            ]
        });
    };
    
    const couponDelete = async(id) => {
        await dispatch(deleteCoupon(id));
        await dispatch(getCoupons());
    }

    const formatDate = (date) => {
        const thisDate = new Date(date);
        return format(thisDate, 'dd-MM-yyy');
    }

    const seeCoupon = async(name) => {
        dispatch(getACoupons(name));
    }

  return (
      <div className='--mb2'>
          <h3>All Coupons</h3>
          <div className='table'>
              {coupons.length === 0 ? (
              <p>"no coupons found"</p> 
          ): (
                <table >
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>coupon name</th>
                      <th>discount</th>
                      <th>expiry date</th>
                      <th>Action</th>
                          </tr>
                          </thead>
                          {isLoading && <Loader/>}
                      <tbody>
                          {coupons.map((coupon, index) => (
                                  <tr key={coupon._id}>
                                  <td >{index+1}</td>
                                  <td >{coupon.name}</td>
                                  <td >{coupon.discount}% Off</td>
                                  <td >{formatDate(coupon.expiresAt)}</td>
                                  <td>
                                      <span>
                                              <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(coupon._id)}/>
                                      </span>
                                      {" _ _ "}
                                      <span><Link to={""}><AiOutlineEye size={25} color={"purple"} onClick={()=>seeCoupon(coupon.name)}/></Link></span>
                                  </td>
                                  </tr>
                                  ))}
                              
                          </tbody>
          </table>  
          )}
          </div>
    </div>
  )
}

export default CouponList