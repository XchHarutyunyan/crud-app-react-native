import axios from 'axios';
import {baseURL} from '../constants/urls';
import {Alert} from 'react-native';

const axiosApi = axios.create({baseURL});

axiosApi.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    throw error;
  },
);

axiosApi.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    const errorMessage = error.response.data.message || 'Server Error';
    Alert.alert(errorMessage);
    throw error;
  },
);

export default axiosApi;
