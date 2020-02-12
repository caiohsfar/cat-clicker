import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_CAT_API_URL,
  headers: {
    'x-api-key': process.env.REACT_APP_CAT_API_KEY
  }
});

const getCats = async (limit = 0) => {
  try {
    return await api.get(`/images/search?limit=${limit}`);
  } catch (err) {
    return null;
  }
};

export default {
  getCats
};
