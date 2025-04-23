import axios from "axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {},
});

//? interceptors stops something in the middle, they are like middlewares.

instance.interceptors.response.use(
  (response) => response.data, //? here, whenever the response will come, it will return the response's data.
  (error) => {
    toast.error(error.response?.data?.message || "something went wrong");
    console.log(error);
    return Promise.reject(error);
  }
);

//? we can also make an interceptor for the request, but we dont need it in our case { it has the same syntax just replace response with the request}

export default instance;
