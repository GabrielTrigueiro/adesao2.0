import { CAMPAIGN, CAMPAIGN_EXECUTE } from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import {
  TCampaignGetResponse,
  TCampaignPageable,
  TCampaignPostResponse,
  TCampaignRequest,
} from "core/models/campaign";
import { Notification } from "app/components/toastNotification/toastNotification";

const getCampaigns = async (
  campaignPageable: TCampaignPageable
): Promise<TCampaignGetResponse> => {
  return await axiosInstance
    .get(CAMPAIGN, {
      // params: {
      //   page: campaignPageable.page,
      //   size: campaignPageable.size,
      //   sort: campaignPageable.sort,
      // },
    })
    .then((res) => res.data.data)
    .catch((err) => err);
};

const createCampaign = async (
  campaign: TCampaignRequest
): Promise<TCampaignPostResponse> => {
  return await axiosInstance
    .post(CAMPAIGN, campaign)
    .then((res) => {
      Notification("Campanha criada com sucesso", "success");
      return res.data;
    })
    .catch((err) => {
      //Notification(res.response?.data, "success");
      console.log(err);
    });
};

interface TesteCsv {
  csv: string;
}

const execCampaign = async (id: number, csv: TesteCsv) => {
  console.log("entrou na req");
  return await axiosInstance
    .post(`${CAMPAIGN_EXECUTE}${id}`, csv)
    .then(() => {
      console.log("entrou no then");
    })
    .catch((err) => console.log(err));
};

export const CampaignService = {
  getCampaigns,
  createCampaign,
  execCampaign,
};
