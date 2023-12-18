import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// create Category
const createCategory = async (formData) => { 
    const response = await axios.post(`${API_URL}category/create`, formData);
    return response.data
};

const categoryAndBrandService = {
    createCategory,
}

export default categoryAndBrandService;