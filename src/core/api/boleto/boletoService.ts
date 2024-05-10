import { AxiosError } from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { IDefaultResponse } from "../seller/sellerService";
import {
  BOLETO_DATE,
  BOLETO_DISCOUNT,
  BOLETO_DOWN,
} from "core/utils/constants";
import { Notification } from "app/components/toastNotification/toastNotification";

const makeRequest = async (
  url: string,
  param?: any
): Promise<IDefaultResponse | undefined> => {
  return await axiosInstance
    .post(url, param)
    .then((response) => {
      if (response?.data) {
        Notification(response.data.data, "success");
        return response.data;
      }
    })
    .catch((error: AxiosError) => {
      Notification(error.message, "error");
    });
};

const AlterBoletoDate = (newDate: string, nossoNumero: string) =>
  makeRequest(`${BOLETO_DATE + nossoNumero}`, { newDueDate: newDate });

const DownBoleto = (nossoNumero: string) =>
  makeRequest(`${BOLETO_DOWN + nossoNumero}`);

const DiscountBoleto = (amount: number, nossoNumero: string) =>
  makeRequest(`${BOLETO_DISCOUNT + nossoNumero}`, { discount: amount });

export const BoletoService = { AlterBoletoDate, DownBoleto, DiscountBoleto };
