import { CampaignService } from "core/api/campaign/campaignServie";
import { Order } from "core/models/table";

export const fetchCampaigns = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: Order
) => {
  return await CampaignService.getCampaigns({
    page: page,
    size: rowsPerPage,
    sort: orderBy + "," + order,
  });
};
