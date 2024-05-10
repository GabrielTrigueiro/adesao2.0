import { ClientService } from "core/api/client/clientService";

export const fetchClientDeal = async () => {
  return await ClientService.getDeal();
};
