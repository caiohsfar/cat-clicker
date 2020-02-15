import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_CAT_API_URL,
  headers: {
    'x-api-key': process.env.REACT_APP_CAT_API_KEY
  }
});

const getCats = (limit = 0) => {
  return api.get(`/images/search?limit=${limit}`);
};

export default {
  getCats
};
