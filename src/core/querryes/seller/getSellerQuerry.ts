import { SellerService } from "core/api/seller/sellerService";
import { Order } from "core/models/table";

export const fetchSellers = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: Order,
  cpforcnpj?: string,
  groupname?: string,
  name?: string
) => {
  return await SellerService.getAllSellers({
    page: page,
    size: rowsPerPage,
    sort: orderBy + "," + order,
    cpforcnpj: cpforcnpj,
    groupname: groupname,
    name: name,
  });
};
