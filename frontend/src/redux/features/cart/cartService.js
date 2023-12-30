import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

const saveCartDB = async (cartData) => {
    
    const response = await axios.patch(`${API_URL}savecart`, cartData, {
        withCredentials: true,
    });
    return response.data
};
const getCard = async () => {
    
    const response = await axios.get(`${API_URL}getcart`, {
        withCredentials: true,
    });
    return response.data
};

const cartService = {
    saveCartDB,
    getCard,
};

export default cartService;