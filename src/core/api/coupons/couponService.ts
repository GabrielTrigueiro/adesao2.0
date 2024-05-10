import {
  TCouponGetResponse,
  TCouponPageable,
  TCouponRequest,
  TParamsRequest,
} from "core/models/coupons";
import {
  COUPON,
  COUPON_ACTIVE_INACTIVE,
  COUPON_CREATE,
  COUPON_PARAM,
  COUPON_PROTECT,
  COUPON_VALIDATE,
} from "core/utils/constants";
import { axiosInstance, noAuthAxiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";

export interface IValidateCupom {
  param: string;
  coupon: string;
}

const validateCoupon = async (coupom: string, param: string): Promise<any> => {
  return await noAuthAxiosInstance
    .get(`${COUPON_VALIDATE}${coupom}/${param}`)
    .then((res) => {
      if (res instanceof AxiosError) {
        return res;
      }
      return res;
    });
};

const createCoupon = async (coupon: TCouponRequest): Promise<any> => {
  return await axiosInstance.post(COUPON_CREATE, coupon).then((res) => {
    if (res instanceof AxiosError) {
      return res;
    }
    return res;
  });
};

const protectOrNotCoupon = async (id: number): Promise<any> => {
  return await axiosInstance.post(`${COUPON_PROTECT}${id}`).then((res) => {
    if (res instanceof AxiosError) {
      return res;
    }
    return res;
  });
};

const activeOrNotCoupon = async (id: number): Promise<any> => {
  return await axiosInstance
    .post(`${COUPON_ACTIVE_INACTIVE}${id}`)
    .then((res) => {
      if (res instanceof AxiosError) {
        return res;
      }
      return res;
    });
};

interface ICreateParam {
  list: string[];
  id: number;
}
const createParam = async (data: ICreateParam): Promise<any> => {
  return await axiosInstance
    .post(`${COUPON_PARAM}${data.id}`, { list: data.list })
    .then((res) => {
      if (res instanceof AxiosError) {
        return res;
      }
      return res;
    });
};

const getCoupon = async (
  couponPageable: TCouponPageable
): Promise<TCouponGetResponse> => {
  return await axiosInstance
    .get(COUPON, {
      params: {
        page: couponPageable.page,
        size: couponPageable.size,
        sort: "createdAt,desc",
      },
    })
    .then((res) => res.data.data)
    .catch((err) => err);
};

export const CouponService = {
  createCoupon,
  getCoupon,
  createParam,
  protectOrNotCoupon,
  activeOrNotCoupon,
  validateCoupon,
};
