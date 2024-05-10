import { ChartsService, DataRange } from "core/api/charts/chartsService";

export const fetchChartBoletosStatus = async (dataRange: DataRange) => {
  return await ChartsService.getChartBoletosStatus(dataRange);
};
export const fetchChartPixStatus = async (dataRange: DataRange) => {
  return await ChartsService.getChartPixStatus(dataRange);
};
export const fetchChartSalesStatus = async (dataRange: DataRange) => {
  return await ChartsService.getChartSalesStatus(dataRange);
};
export const fetchChartSalesMonth = async (dataRange: DataRange) => {
  return await ChartsService.getChartSalesMonth(dataRange);
};
export const fetchChartListSalesLiquiMonth = async (dataRange: DataRange) => {
  return await ChartsService.getChartListSalesLiquiMonth(dataRange);
};
export const fetchChartListPaymentDate = async (dataRange: DataRange) => {
  return await ChartsService.getChartListPaymentDate(dataRange);
};
export const fetchChartListSalesLiquidadas = async (dataRange: DataRange) => {
  return await ChartsService.getChartListSalesLiquidadas(dataRange);
};

