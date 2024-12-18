import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;
const frameToken = (token) => {
  return `Bearer ${token}`;
};

export const completeSignUp = async (token, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/complete-signup`, { password }, {
            headers: {
                Authorization: frameToken(token),
            },
        });
        return response;
        
    } catch (error) {
        return error.response;
        
    }
}; 