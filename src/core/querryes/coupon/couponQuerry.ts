import { CouponService } from "core/api/coupons/couponService";
import { Order } from "core/models/table";

export const fetchCoupons = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order
  ) => {
    return await CouponService.getCoupon({
      page: page,
      size: rowsPerPage,
      sort: orderBy + "," + order,
    });
  };