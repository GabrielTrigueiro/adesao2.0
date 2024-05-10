import { TNewClientBodyRequest } from "../client";
import { TIndicationUser } from "../indication";
import { TBoletoBodyResponse, TGetSaleResponse } from "../payment/boleto";
import { TPixBodyResponse } from "../payment/pix";
import { TSellerBodyRequest } from "../seller";
import { IPageable } from "../utils";

export type TSubmitSaleResponse = {
  data: TGetSaleResponse;
  errors: string[];
  links: string[];
};
export type TPayment = "" | "BOLETO" | "PIX";

export type Compra = "CONSULTORIA" | "LIMPA_NOME";

export type TSaleBodyRequest = {
  couponId: null | number;
  id?: number;
  cameThrough: string;
  tokenSales: string;
  client: TNewClientBodyRequest;
  typePayment: TPayment;
  installments?: number | null;
  tokenContract?: null;
  contract: true;
  isFees: boolean;
  choosenDate?: string;
  typeSales: Compra;
};

export type TSalePayment = {
  typePayment: TPayment;
  installments?: number | null;
  tokenContract?: null;
  isFees: boolean;
};

export type TSaleBody = {
  id: number;
  value: number;
  installments: number;
  status: string;
  indication: TIndicationUser;
  typePayment: "BOLETO" | "PIX";
  seller: TSellerBodyRequest;
  client: TNewClientBodyRequest;
  cameThrough: string;
  paymentMethods: TPixBodyResponse[] | TBoletoBodyResponse[];
  createdAt: string;
  typeSales?: Compra;
};

export type TSaleStatusType = " PENDENTE" | "EM_PAGAMENTO" | "PAGO";

export type TSaleFilterRequest = {
  status: TSaleStatusType | undefined;
  cameThrough: string | undefined;
  typePayment: string | undefined;
  sellerCpfOrCnpj: string | undefined;
  clientCpforCnpj: string | undefined;
  indicationCpforCnpj: string | undefined;
  createDate: string | undefined;
  sellerId: number | undefined;
};

export type TSalePageable = TSaleFilterRequest & IPageable;
