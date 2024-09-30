import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "@/shared/helpers/index";

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    const res = error.response;
    if (res && res.status === 401) {
      window.location.href = API_BASE_URL;
    }
    console.error(
      "Looks like there was a problem. Status Code: " + res?.status
    );
    return Promise.reject(error);
  }
);

export default axiosClient;
