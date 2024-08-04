// dependencies
import axios from "axios";

// configure axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// export axios configure API
export default API;
