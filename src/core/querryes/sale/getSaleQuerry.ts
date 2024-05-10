import { SaleService } from "core/api/sale/saleService";
import { TSaleStatusType } from "core/models/sale";
import { Order } from "core/models/table";

export const fetchSales = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: Order,
  status?: TSaleStatusType,
  cameThrough?: string,
  typePayment?: string,
  sellerCpfOrCnpj?: string,
  clientCpforCnpj?: string,
  indicationCpforCnpj?: string,
  createDate?: string,
  sellerId?: number
) => {
  return await SaleService.getFilteredSales({
    page: page,
    size: rowsPerPage,
    sort: orderBy + "," + order,
    status,
    cameThrough,
    typePayment,
    sellerCpfOrCnpj,
    clientCpforCnpj,
    indicationCpforCnpj,
    createDate,
    sellerId,
  });
};
