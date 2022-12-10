import axios from "axios";

const instance = axios.create({
  baseURL: "https://image-generator.cyclic.app/",
});

export default instance;
