import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// create Category
const createCategory = async (formData) => { 
    const response = await axios.post(`${API_URL}category/create`, formData);
    return response.data
};
// get Category List
const getCategories = async () => { 
    const response = await axios.get(`${API_URL}category/get`);
    return response.data
};
// delete a Category
const deleteCategory = async (slug) => { 
    const response = await axios.delete(`${API_URL}category/delete/${slug}`);
    return response.data
};

// create brand
const createBrand = async (formData) => { 
    const response = await axios.post(`${API_URL}brand/create`, formData);
    return response.data
};

// get brand List
const getBrand = async () => { 
    const response = await axios.get(`${API_URL}brand/get`);
    return response.data
};

const categoryAndBrandService = {
    createCategory,
    getCategories,
    deleteCategory,
    createBrand,
    getBrand
}



export default categoryAndBrandService;