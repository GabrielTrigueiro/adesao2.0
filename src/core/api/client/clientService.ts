import { CLIENT_CONTRACT, CLIENT_PAYMENTS } from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";

const getDeal = async (): Promise<any> => {
  return await axiosInstance
    .get(CLIENT_CONTRACT)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.response?.data;
      }
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getPayments = async (): Promise<any> => {
  return await axiosInstance
    .get(CLIENT_PAYMENTS)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.response?.data;
      }
      return response.data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const ClientService = {
  getDeal,
  getPayments,
};
