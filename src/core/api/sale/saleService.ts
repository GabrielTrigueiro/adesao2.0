import {
  TSaleBodyRequest,
  TSaleBody,
  TSubmitSaleResponse,
  TSalePageable,
  TSaleFilterRequest,
} from "core/models/sale";
import { axiosInstance, noAuthAxiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";
import {
  ASYNC_PAYMENT,
  DOWLOAD_BOLETO,
  NEW_SALE,
  SALE,
  SALE_CSV,
} from "core/utils/constants";
import { Notification } from "app/components/toastNotification/toastNotification";
import { IPage, IResponseBody } from "core/models/utils";
import { downloadPdf } from "core/utils/globalFunctions";

const submitSale = async (
  sale: TSaleBodyRequest
): Promise<TSubmitSaleResponse> => {
  return await noAuthAxiosInstance
    .post<TSubmitSaleResponse>(NEW_SALE, sale)
    .then((response) => {
      if (response instanceof AxiosError) {
        Notification(response.response?.data, "error");
        return response.response?.data;
      }
      Notification("Pedido confirmado, esperando pagamento", "success");
      return response.data;
    })
    .catch((err: any) => {
      if (err.response?.data) {
        Notification(err.response?.data?.errors[0], "error");
      } else {
        Notification(err.message, "error");
      }
    });
};

const getFilteredSales = async (
  salePageable: TSalePageable
): Promise<IPage<TSaleBody> | undefined> => {
  const response = await axiosInstance.get<IResponseBody<IPage<TSaleBody>>>(
    SALE,
    {
      params: {
        page: salePageable.page,
        size: salePageable.size,
        status: salePageable.status,
        cameThrough: salePageable.cameThrough,
        typePayment: salePageable.typePayment,
        sellerCpfOrCnpj: salePageable.sellerCpfOrCnpj,
        clientCpforCnpj: salePageable.clientCpforCnpj,
        indicationCpforCnpj: salePageable.indicationCpforCnpj,
        createDate: salePageable.createDate,
        sellerId: salePageable.sellerId,
        sort: "createdAt,desc",
      },
    }
  );
  return response.data.data;
};

const getSaleCsv = async (
  salePageable: TSaleFilterRequest
): Promise<any | undefined> => {
  const response = await axiosInstance.get(SALE_CSV, {
    params: {
      status: salePageable.status,
      cameThrough: salePageable.cameThrough,
      typePayment: salePageable.typePayment,
      sellerCpfOrCnpj: salePageable.sellerCpfOrCnpj,
      clientCpforCnpj: salePageable.clientCpforCnpj,
      indicationCpforCnpj: salePageable.indicationCpforCnpj,
      createDate: salePageable.createDate,
      sellerId: salePageable.sellerId,
    },
  });
  return response.data.data;
};

const getValidationDoc = async (
  doc: string,
  type: string
): Promise<any | undefined> => {
  const response = await noAuthAxiosInstance.get(
    `https://api.grupopositivobrasil.com.br/v1/sales/pix/validation/${doc}/${type}`
  );
  return response.data.data;
};

const asyncPaymentById = async (id: number): Promise<any | undefined> => {
  await noAuthAxiosInstance
    .post(`${ASYNC_PAYMENT}${id}`)
    .then((response) => {
      if (response instanceof AxiosError) {
        Notification(response.response?.data, "error");
        return response.response?.data;
      }
      return response.data?.data;
    })
    .catch((err: any) => {
      if (err.response?.data) {
        Notification(err.response?.data?.errors[0], "error");
      } else {
        Notification(err.message, "error");
      }
    });
};

const getB64Boleto = async (
  id: number,
  inst: number
): Promise<any | undefined> => {
  await axiosInstance
    .get(`${DOWLOAD_BOLETO}${id}`)
    .then((response) => {
      if (response instanceof AxiosError) {
        Notification(response.response?.data, "error");
        return response.response?.data;
      }
      if (response.data && response.data.data) {
        Notification("Boleto será baixado", "success");
        downloadPdf(response.data.data, `parcela${inst}`);
        return response.data.data;
      }
      return undefined;
    })
    .catch((err: any) => {
      if (err.response?.data) {
        Notification(err.response?.data?.errors[0], "error");
      } else {
        Notification(err.message, "error");
      }
    });
};

export const SaleService = {
  submitSale,
  getFilteredSales,
  getSaleCsv,
  getValidationDoc,
  asyncPaymentById,
  getB64Boleto,
};
