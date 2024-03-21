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
    let errorMessage = 'Server Error';
    if (error?.response?.data?.statusCode === 400) {
      errorMessage = error.response.data.message[0];
    }
    Alert.alert(errorMessage);
    throw error;
  },
);

export default axiosApi;
