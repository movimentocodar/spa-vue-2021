import axios from "axios";

const AxiosIntance = axios.create({
  baseURL: "https://api.github.com/",
});
export default AxiosIntance;
