import {
  TIndicationUser,
  TIndicationUserRegister,
} from "core/models/indication";
import {
  IPage,
  IResponseBody,
  TIndicationFilterRequest,
} from "core/models/utils";
import { INDICATIONS } from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";

// * getAll
const getAllIndicationUsers = async (
  indicationPageable: TIndicationFilterRequest
): Promise<IPage<TIndicationUser> | undefined> => {
  const response = await axiosInstance.get<
    IResponseBody<IPage<TIndicationUser>>
  >(INDICATIONS, {
    params: {
      page: indicationPageable.page,
      size: indicationPageable.size,
      sort: indicationPageable.sort,
      coupon: indicationPageable?.coupon,
      cpforcnpj: indicationPageable?.cpforcnpj,
    },
  });
  return response.data.data;
};

// * create
const createNewIndicationUser = async (
  newIndicationUser: TIndicationUserRegister
): Promise<any> => {
  return await axiosInstance
    .post(`${INDICATIONS + "/new"}`, newIndicationUser)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response;
      }
      return response;
    });
};

// ! getById
// ! deleteById
// ! editById

export const IndiactionService = {
  getAllIndicationUsers,
  createNewIndicationUser,
};
