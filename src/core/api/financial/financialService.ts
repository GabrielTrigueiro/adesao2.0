import { FINANCIAL } from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import { IPage, IResponseBody } from "core/models/utils";
import { IFinancialPageable } from "core/models/financial";

const getFilteredFinancial = async (
  financialPageable: IFinancialPageable
): Promise<IPage<any> | undefined> => {
  const response = await axiosInstance.get<IResponseBody<IPage<any>>>(
    FINANCIAL,
    {
      params: {
        page: financialPageable.page,
        size: financialPageable.size,
        sort: financialPageable.sort,
        type: financialPageable?.type,
      },
    }
  );
  return response.data.data;
};

export const FinancialService = {
  getAllFinancial: getFilteredFinancial,
};
