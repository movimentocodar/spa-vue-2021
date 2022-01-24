import axios from "axios";
const AxiosIntance = axios.create({
  baseURL: "https://my-json-server.typicode.com/hugoogle/hamburgueria",
});

export default AxiosIntance;
