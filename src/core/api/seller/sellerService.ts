import {
  TNewSellerBodyRequest,
  TSellerBodyRequest,
  TSellerPageable,
} from "core/models/seller";
import { IPage, IResponseBody } from "core/models/utils";
import {
  SELLERS,
  SELLERS_GENERATE_LINK,
  SELLERS_GET_LINK,
} from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";
import { TGenerateLinkBodyRequest } from "core/models/sale/link";

export interface IDefaultResponse {
  data: string;
  errors: string[];
  links: [string];
}

export interface ILinksResponse {
  data: {
    CAMPANHA26022024: string;
  };
  errors: string[];
  links: [string];
}

const getFilteredSellers = async (
  sellerPageable: TSellerPageable
): Promise<IPage<TSellerBodyRequest> | undefined> => {
  const response = await axiosInstance.get<
    IResponseBody<IPage<TSellerBodyRequest>>
  >(SELLERS, {
    params: {
      page: sellerPageable.page,
      size: sellerPageable.size,
      sort: sellerPageable.sort,
      name: sellerPageable?.name,
      cpforcnpj: sellerPageable?.cpforcnpj,
      groupname: sellerPageable?.groupname,
    },
  });
  return response.data.data;
};

const createNewSeller = async (
  newSeller: TNewSellerBodyRequest
): Promise<any> => {
  return await axiosInstance
    .post(`${SELLERS + "/new"}`, newSeller)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response;
      }
      return response;
    });
};

const generateLink = async (
  payload: TGenerateLinkBodyRequest
): Promise<any> => {
  return await axiosInstance
    .post(SELLERS_GENERATE_LINK, payload)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.data;
      }
      return response.data;
    });
};

const getLinks = async (): Promise<any> => {
  return await axiosInstance
    .get<ILinksResponse>(SELLERS_GET_LINK)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.data;
      }
      return response.data;
    })
    .catch((err: any) => {
      console.error("aqui");
      console.error(err);
    });
};

export const SellerService = {
  getAllSellers: getFilteredSellers,
  createNewSeller,
  generateLink,
  getLinks,
};
