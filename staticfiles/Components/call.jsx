import axios from "axios"


const baseURL = 'http://127.0.0.1:8000/'

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials:true,
  headers:{
    Authorization: sessionStorage.getItem('access_token')
      ? 'JWT ' + sessionStorage.getItem('access_token')
      : null,
      accept: 'application/json',
  },
});

export default axiosInstance