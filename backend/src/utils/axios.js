// dependencies
import axios from "axios";

// configure axios
const API = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});

// export API
export default API;
