import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// create product
const createProduct = async (formData) => { 
    const response = await axios.post(`${API_URL}products/create`, formData);
    return response.data
};
// get product
const getProducts = async () => { 
    const response = await axios.get(`${API_URL}products/get`);
    return response.data
};
// delete product
const deleteProduct = async (id) => { 
    const response = await axios.delete(`${API_URL}products/delete/${id}`);
    return response.data
};
// get a product
const getAProduct = async (id) => { 
    const response = await axios.get(`${API_URL}products/getproduct/${id}`);
    return response.data
};
// update a product
const updateProduct = async (id, formdata) => { 
    const response = await axios.patch(`${API_URL}products/update/${id}`, formdata);
    return response.data
};


  const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getAProduct,
    updateProduct
}



export default productService;