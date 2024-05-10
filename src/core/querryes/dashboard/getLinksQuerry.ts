import { SellerService } from "core/api/seller/sellerService";

export const fetchLinks = async () => {
  return await SellerService.getLinks();
};
