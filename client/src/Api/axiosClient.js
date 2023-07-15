import axios from 'axios'
const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  axiosClient.interceptors.request.use(config => {
    // Customize config before sending request
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });
  axiosClient.interceptors.response.use(response => {
   if(response && response.data){
       return response.data
   }
    return response;
  }, error => {
    // Do something with response error
    return Promise.reject(error);
  });

 export default axiosClient