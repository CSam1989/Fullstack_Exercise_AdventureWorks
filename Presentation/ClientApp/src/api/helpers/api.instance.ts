import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:50356/api/" });

export default instance;
