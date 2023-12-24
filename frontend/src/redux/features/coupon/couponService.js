import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// create coupon
const createCoupon = async (formData) => { 
    const response = await axios.post(`${API_URL}coupon/create`, formData);
    return response.data
};
// get coupons
const getCoupons = async () => { 
    const response = await axios.get(`${API_URL}coupon/get`);
    return response.data
};
// delete coupon
const deleteCoupon = async (id) => { 
    const response = await axios.delete(`${API_URL}coupon/delete/${id}`);
    return response.data
};
// get a coupon
const getACoupon = async (name) => { 
    const response = await axios.get(`${API_URL}coupon/get/${name}`);
    return response.data
};
// update a coupon
const updateCoupon = async (name, formdata) => { 
    const response = await axios.patch(`${API_URL}coupon/update/${name}`, formdata);
    return response.data
};


  const couponService = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    getACoupon,
    updateCoupon
}



export default couponService;