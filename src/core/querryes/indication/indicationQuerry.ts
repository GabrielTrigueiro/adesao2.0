import { IndiactionService } from "core/api/indication/indicationService";
import { Order } from "core/models/table";

export const fetchIndications = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: Order,
  coupon?: string,
  cpforcnpj?: string
) => {
  return await IndiactionService.getAllIndicationUsers({
    page: page,
    size: rowsPerPage,
    sort: orderBy + "," + order,
    coupon: coupon,
    cpforcnpj: cpforcnpj,
  });
};

export const fetchIndicationsByCoupon = async (coupon: string) => {
  return await IndiactionService.getAllIndicationUsers({
    page: 0,
    size: 100,
    sort: "coupon,asc",
    coupon,
    cpforcnpj: undefined,
  });
};
