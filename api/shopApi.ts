import axios from "axios";

const shopApi = axios.create({
  baseURL: "/api",
});

export default shopApi;
