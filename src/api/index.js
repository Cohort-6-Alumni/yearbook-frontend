import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const frameToken = (token) => {
  return `Bearer ${token}`;
};

export const completeSignUp = async (token, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/signup/complete`,
      { password },
      {
        headers: {
          Authorization: frameToken(token),
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { username, password });
    return {
      status: response.status,
      auth: response.headers.authorization,
      data: {
        username: response.data?.username,
        role: response.data?.role,
        userId: response.data?.userId,
        profileId: response.data?.profile?.profileId,
        firstName: response.data?.firstName,
        lastName: response.data?.lastName,
        emailId: response.data?.emailId,
        picture: response.data?.picture,
      },
    };
  } catch (error) {
    return error.response;
  }
};

// Update user details

export const updateAccount = async (token, data) => {
  try {
    const response = await axios.post(`${API_URL}/user/update`, data, {
      headers: {
        Authorization: frameToken(token),
      },
    });
    return {
      status: response.status,
      data: {
        username: response.data?.username,
        role: response.data?.role,
        userId: response.data?.userId,
        profileId: response.data?.profile?.profileId,
        firstName: response.data?.firstName,
        lastName: response.data?.lastName,
        emailId: response.data?.emailId,
        picture: response.data?.picture,
      },
    };
  } catch (error) {
    return error.response;
  }
};

export const getProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/profiles`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getProfile = async (profileId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${profileId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Update user profile, always update userData after each update.
export const updateProfile = async (token, data) => {
  try {
    const response = await axios.post(`${API_URL}/user/update/profile`, data, {
      headers: {
        Authorization: frameToken(token),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllMembers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/members/list`, {
      headers: {
        Authorization: frameToken(token),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
