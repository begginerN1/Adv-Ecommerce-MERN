import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// register user
const register = async (userData) => {
    
    const response = await axios.post(`${API_URL}register`, userData, {
        withCredentials: true,
    });
    return response.data
};

// login user
const login = async (userData) => {
    
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
};
// logout user
const logout = async () => {
    
    const response = await axios.get(`${API_URL}logout`);
    return response.data.message;
};
// get login status 
const getLoginStatus = async () => {
    
    const response = await axios.get(`${API_URL}getloginstatus`);
    return response.data;
};
// get user 
const getUser = async () => {
    
    const response = await axios.get(`${API_URL}getuser`);
    return response.data;
};

// update user 
const updateUser = async (userData) => {
    
    const response = await axios.patch(`${API_URL}updateuser`, userData);
    return response.data;
};
const updatPhoto = async (userData) => {
    
    const response = await axios.patch(`${API_URL}updatephoto`, userData);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    updatPhoto
};

export default authService;