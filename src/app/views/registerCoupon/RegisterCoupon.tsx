import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useFormik } from "formik";

import {
  InfoCard,
  InfoCardContainer,
  InfoCardTitle,
} from "../../components/styles";
import GenericTextField from "../../components/genericTextField/GenericTextField";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./style";
import { CouponService } from "core/api/coupons/couponService";
import { Validations } from "core/utils/validations";
import { TCouponRequest } from "core/models/coupons";
import { useEffect, useState } from "react";
import { Notification } from "app/components/toastNotification/toastNotification";
import { useAppSelector } from "core/hooks/reduxHooks";
import { TRole, verifyRole } from "core/utils/roles";

let initialValues: TCouponRequest = {
  coupon: "",
  description: "",
  quatityInstallments: "",
  valueInstallmentCnpj: "",
  valueInstallmentCpf: "",
  valuePixCnpj: "",
  valuePixCpf: "",
};

const RegisterCoupon = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",
    "ROLE_CRUD_SELLER",
    "ROLE_SELLER"];

  useEffect(() => {
    if (!verifyRole(basicUserInfo?.roles, acceptRoles)) {
      navigate(-1);
    }
  }, [basicUserInfo])

  const formik = useFormik({
    initialValues,
    validationSchema: Validations.registerCouponSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await CouponService.createCoupon(values)
        .then((resp) => {
          Notification(resp.data.data, "success");
          navigate(-1)
          formik.resetForm();
          setIsLoading(false);
        })
        .catch((err: AxiosError) => {
          Notification(err.message, "error");
          setIsLoading(false);
        });
    },
  });

  if (
    !verifyRole(basicUserInfo?.roles, acceptRoles)
  ) {
    return null;
  }

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar coupon</RegisterPageHeader>
      <RegisterPageContent>
        <Box
          sx={{
            gap: " 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações do coupon
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                error={!!formik.errors.coupon}
                helperText={formik.errors.coupon}
                name={"coupon"}
                label={"Cupom"}
                value={formik.values.coupon}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                name={"description"}
                label={"Descrição"}
                value={formik.values.description}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.quatityInstallments}
                helperText={formik.errors.quatityInstallments}
                name={"quatityInstallments"}
                label={"Quantidade de parcelas"}
                value={formik.values.quatityInstallments ?? ""}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.valueInstallmentCnpj}
                helperText={formik.errors.valueInstallmentCnpj}
                name={"valueInstallmentCnpj"}
                label={"Valor parcela CNPJ"}
                value={formik.values.valueInstallmentCnpj ?? ""}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.valueInstallmentCpf}
                helperText={formik.errors.valueInstallmentCpf}
                name={"valueInstallmentCpf"}
                label={"Valor parcela CPF"}
                value={formik.values.valueInstallmentCpf ?? ""}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.valuePixCnpj}
                helperText={formik.errors.valuePixCnpj}
                name={"valuePixCnpj"}
                label={"Valor Pix CNPJ"}
                value={formik.values.valuePixCnpj ?? ""}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.valuePixCpf}
                helperText={formik.errors.valuePixCpf}
                name={"valuePixCpf"}
                label={"Valor Pix CPF"}
                value={formik.values.valuePixCpf ?? ""}
                props={{
                  onChange: formik.handleChange,
                }}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/cupons")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.submitForm()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  );
};
export default RegisterCoupon;
