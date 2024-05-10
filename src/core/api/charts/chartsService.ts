import { AxiosError } from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import {
  CHART_BOLETOS_STATUS,
  CHART_PIX_STATUS,
  CHART_SALES_MONTH,
  CHART_SALES_STATUS,
  CHART_LIST_SALES_LIQUI_MONTH,
  CHART_LIST_PAYMENT_DATE,
  CHART_LIST_SALES_LIQUIDADAS,
} from "core/utils/constants";

export type DataRange = {
  dataInicial: string;
  dataFinal: string;
};

export interface IGetChartDataByTypeProps {
  url: string;
  dataRange: DataRange;
}

const getChartDataByType = async (
  request: IGetChartDataByTypeProps
): Promise<any> => {
  return await axiosInstance
    .get(request.url, {
      params: {
        dataInicio: request.dataRange.dataInicial,
        dataFinal: request.dataRange.dataFinal,
      },
    })
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.data;
      }
      return response.data.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const getChartBoletosStatus = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_BOLETOS_STATUS, dataRange: dataRange });

const getChartPixStatus = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_PIX_STATUS, dataRange: dataRange });

const getChartSalesStatus = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_SALES_STATUS, dataRange: dataRange });

const getChartSalesMonth = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_SALES_MONTH, dataRange: dataRange });

const getChartListSalesLiquiMonth = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_LIST_SALES_LIQUI_MONTH, dataRange: dataRange });

const getChartListPaymentDate = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_LIST_PAYMENT_DATE, dataRange: dataRange });

const getChartListSalesLiquidadas = (dataRange: DataRange) =>
  getChartDataByType({ url: CHART_LIST_SALES_LIQUIDADAS, dataRange: dataRange });

export const ChartsService = {
  getChartBoletosStatus,
  getChartPixStatus,
  getChartSalesStatus,
  getChartSalesMonth,
  getChartListSalesLiquiMonth,
  getChartListPaymentDate,
  getChartListSalesLiquidadas,
};
