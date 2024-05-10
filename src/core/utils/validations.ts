import { TNewClientBodyRequest } from "core/models/client";
import { TIndicationUserRegister } from "core/models/indication";
import { TNewSellerBodyRequest } from "core/models/seller";
import * as yup from "yup";
import { validarCpfCnpj } from "./globalFunctions";
import { TCouponRequest } from "core/models/coupons";

const loginSchema = yup.object({
  login: yup
    .string()
    .required("Digite o usuário")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  password: yup
    .string()
    .min(5, "Senha deve ter ao menos 5 digitos")
    .required("Digite a senha"),
});

const forgotPasswordSchema = yup.object({
  login: yup
    .string()
    .required("Digite o usuário")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
});

const redefinePassword = yup.object({
  password: yup
  .string()
  .required("Senha é obrigatória")
  .min(6, "A senha deve ter no mínimo 6 caracteres"),
confirmPassword: yup
  .string()
  .required("Confirmação de senha é obrigatória")
  .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

const registerCouponSchema = yup.object<TCouponRequest>().shape({
  coupon: yup.string().required("Cupom é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  quatityInstallments: yup
    .string()
    .required("Quantidade de parcelas é obrigatória")
    .test(
      "is-minimum-value",
      "A quantidade mínima de parcelas é 2",
      (value) => parseInt(value || "0") >= 2
    ),
  valuePixCpf: yup.string().required("Descrição é obrigatório"),
  valuePixCnpj: yup.string().required("Descrição é obrigatório"),
  valueInstallmentCpf: yup.string().required("Descrição é obrigatório"),
  valueInstallmentCnpj: yup.string().required("Descrição é obrigatório"),
});

const registerSchema = yup.object<TNewSellerBodyRequest>().shape({
  name: yup.string().required("O nome é obrigatório"),
  cpforcnpj: yup
    .string()
    .required("O CPF é obrigatório")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

const updateSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const registerClientSchema = yup.object<TNewClientBodyRequest>().shape({
  cpforcnpj: yup
    .string()
    .required("Documento obrigatório")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
});

const registerPersonalSchema = yup.object<TNewClientBodyRequest>().shape({
  name: yup.string().required("Nome é obrigatório"),
  cpforcnpj: yup
    .string()
    .required("Documento obrigatório")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  email: yup.string().required("Email é obrigatório"),
  telephone: yup.string().required("Telefone é obrigatório"),
});

const registerNewUserClientSchema = yup.object<TNewClientBodyRequest>().shape({
  name: yup.string().required("Nome é obrigatório"),
  cpforcnpj: yup
    .string()
    .required("Documento obrigatório")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
  email: yup.string().required("Email é obrigatório"),
  city: yup.string().required("Cidade é obrigatório"),
  uf: yup.string().required("Uf é obrigatório"),
  cep: yup.string().required("CEP é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  telephone: yup.string().required("Telefone é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

const registerIndicationSchema = yup.object<TIndicationUserRegister>().shape({
  email: yup.string().required("Email é obrigatório"),
  coupon: yup.string().required("Coupon é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  cpforcnpj: yup
    .string()
    .required("Documento obrigatório")
    .test("cpf-cnpj-validation", "Documento inválido", validarCpfCnpj),
});

export const Validations = {
  loginSchema,
  registerSchema,
  updateSchema,
  registerClientSchema,
  registerIndicationSchema,
  registerCouponSchema,
  registerNewUserClientSchema,
  registerPersonalSchema,
  forgotPasswordSchema,
  redefinePassword,
};
