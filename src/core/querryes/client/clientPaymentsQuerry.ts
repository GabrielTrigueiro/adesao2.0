import { ClientService } from "core/api/client/clientService";

export const fetchClientPayments = async () => {
  return await ClientService.getPayments();
};
