import axios from "axios";

import { BASE_URL } from "../constants/common";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  function (config) {
    if (config.method === "post") {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
