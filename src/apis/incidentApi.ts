import axios from 'axios'
import { getEnvVariables } from '../helpers';


const { VITE_API_URL } = getEnvVariables();

const incidentApi = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

incidentApi.interceptors.request.use(function (config) {
    // Do something before request is sent

    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

incidentApi.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      
      if (status === 401) {
        // Handle unauthorized access
        //TODO: Verificar si el accessToken es invalido y el refreshToken es valido y renovarlo
      } else if (status === 404) {
        // Handle not found errors
      } else {
        // Handle other errors
      }
      
      return Promise.reject(error);
    }
  );





//TODO: CONFIGURAR INTERCEPTORES


export default incidentApi;