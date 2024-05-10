import { FinancialService } from "core/api/financial/financialService";
import { Order } from "core/models/table";

export const fetchFinancial = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: Order,
  type?: string
) => {
  return await FinancialService.getAllFinancial({
    page: page,
    size: rowsPerPage,
    sort: orderBy + "," + order,
    type,
  });
};
