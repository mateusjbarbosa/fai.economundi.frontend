import axios from "axios";

const api = axios.create({
  // baseURL: "https://economundi-api.herokuapp.com/economundi"
  baseURL: "https://economundi-frontend.herokuapp.com/"
  // baseURL: "http://localhost:3000/"
});

export default api;
