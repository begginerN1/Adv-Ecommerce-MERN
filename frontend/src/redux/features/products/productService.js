import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// create Category
const createProduct = async (formData) => { 
    const response = await axios.post(`${API_URL}products/create`, formData);
    return response.data
};


  const productService = {
    createProduct,
    
}



export default productService;