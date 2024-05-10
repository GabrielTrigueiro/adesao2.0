// * Api
export const FRONT_BASE_URL = "https://portal.grupopositivobrasil.com.br/";

export const LINK_VENDA_LIMPA_NOME = `${FRONT_BASE_URL + "limpanome/"}`;

export const LINK_VENDA_CURSO = `${FRONT_BASE_URL + "consultoria/"}`;

export const BACKEND_BASE_URL = "https://api.grupopositivobrasil.com.br/";
// export const TESTE_BACKEND_BASE_URL = "https://api.gppositivo.bitbeelabs.tech/";

// * Client
export const CLIENT = `${BACKEND_BASE_URL + "client"}`;

export const CLIENT_CONTRACT = `${BACKEND_BASE_URL + "v1/client/certifier"}`;

export const CLIENT_PAYMENTS = `${
  BACKEND_BASE_URL + "v1/client/payment-method"
}`;

// * User
export const AUTH = `${BACKEND_BASE_URL}v1/auth`;

// * Sale
export const SALE = `${BACKEND_BASE_URL + "v1/sales"}`;

export const SALE_CSV = `${BACKEND_BASE_URL + "v1/export"}`;

export const NEW_SALE = `${BACKEND_BASE_URL + "v1/sales/new"}`;

// * Course
export const COURSES = `${BACKEND_BASE_URL + "v1/course"}`;

// * Seller
export const SELLERS = `${BACKEND_BASE_URL}v1/seller`;

export const SELLERS_GENERATE_LINK = `${
  BACKEND_BASE_URL + "v1/seller/url/link"
}`;

export const SELLERS_GET_LINK = `${BACKEND_BASE_URL + "v1/seller/url"}`;

// * Indication
export const INDICATIONS = `${BACKEND_BASE_URL + "v1/indication"}`;

// * Boletos
export const BOLETO = `${BACKEND_BASE_URL + "v1/boletos/"}`;

export const BOLETO_DATE = `${BOLETO + "update/date/"}`;

export const BOLETO_DISCOUNT = `${BOLETO + "update/discount/"}`;

export const BOLETO_DOWN = `${BOLETO + "baixar/"}`;

// * financial // payment methods

export const FINANCIAL = `${BACKEND_BASE_URL + "v1/paymentmethods/pixboleto"}`;

// * Dashboard
export const CHART_BOLETOS_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/boletostatus"
}`;

export const CHART_PIX_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/pixstatus"
}`;

export const CHART_SALES_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/salesstatus"
}`;

export const CHART_SALES_MONTH = `${
  BACKEND_BASE_URL + "v1/dashboard/salesmonth"
}`;

export const CHART_LIST_SALES_LIQUI_MONTH = `${
  BACKEND_BASE_URL + "v1/dashboard/listsalesliquimonth"
}`;

export const CHART_LIST_PAYMENT_DATE = `${
  BACKEND_BASE_URL + "v1/dashboard/listpaymentdate"
}`;

export const CHART_LIST_SALES_LIQUIDADAS = `${
  BACKEND_BASE_URL + "v1/dashboard/listsalesliquidadas"
}`;

// * Campaign
export const CAMPAIGN = `${BACKEND_BASE_URL + "v1/campaigns"}`;
export const CAMPAIGN_EXECUTE = `${BACKEND_BASE_URL + "v1/campaigns/execute/"}`;

// Coupons

export const COUPON_CREATE = `${BACKEND_BASE_URL + "v1/coupon/new"}`;
export const COUPON_PARAM = `${BACKEND_BASE_URL + "v1/coupon/add-param/"}`;
export const COUPON_ACTIVE_INACTIVE = `${
  BACKEND_BASE_URL + "v1/coupon/active-or-inactive-coupon/"
}`;
export const COUPON_PROTECT = `${
  BACKEND_BASE_URL + "v1/coupon/protected-or-not-protected-coupon/"
}`;
export const COUPON = `${BACKEND_BASE_URL + "v1/coupon"}`;
export const COUPON_VALIDATE = `${
  BACKEND_BASE_URL + "v1/coupon/validate-coupon/"
}`;

// forgot password

export const SEND_MESSEGE = `${BACKEND_BASE_URL + "v1/message/enviar-message"}`;

export const VERIFICATION_TOKEN = `${
  BACKEND_BASE_URL + "v1/message/verification-token"
}`;

// sync payment

export const ASYNC_PAYMENT = `${
  BACKEND_BASE_URL + "v1/paymentmethods/async/payments/"
}`;

export const DOWLOAD_BOLETO = `${BACKEND_BASE_URL + "v1/boletos/pdf/"}`;
