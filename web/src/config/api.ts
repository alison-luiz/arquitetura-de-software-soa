import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/ibge",
});

export default api;
