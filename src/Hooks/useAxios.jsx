import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  const navigate = useNavigate();
  const { signOUT } = useAuth();
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in the interceptor", status);
      if (status === 401 || status === 403) {
        await signOUT();
        navigate("/signIn");
      }

      return Promise.reject(error);
    }
  );
  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
    console.log(refetchTrigger);
  };

  axiosSecure.refetch = refetch;

  return axiosSecure;
};

export default useAxios;
