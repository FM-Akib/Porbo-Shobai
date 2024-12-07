import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_url,
    // baseURL: "http://localhost:5000",
    
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;