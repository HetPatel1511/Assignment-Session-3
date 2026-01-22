import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";

export default axios;