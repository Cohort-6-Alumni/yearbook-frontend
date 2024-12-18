import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;
const frameToken = (token) => {
  return `Bearer ${token}`;
};

export const completeSignUp = async (token, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/signup/complete`, { password }, {
            headers: {
                Authorization: frameToken(token),
            },
        });
        return response;
        
    } catch (error) {
        return error.response;
        
    }
}; 
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { username, password });
        return response;
        
    } catch (error) {
        return error.response;
        
    }
};
export const updateAccount = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/user/update`, data, {
            headers: {
                Authorization: frameToken(token),
            },
        });
        return response;
        
    } catch (error) {
        return error.response;
        
    }
};