export type TIndicationUserRegister = {
  email: string;
  password: string;
  coupon: string;
  description: string;
  cpforcnpj: string;
};

export type TIndicationUser = {
  id: string;
  group_name: string;
  login: string;
  coupon: string;
  description: string;
};

export type TIndicationFilterPayload = {
  email: string | undefined;
  coupon: string | undefined;
};
