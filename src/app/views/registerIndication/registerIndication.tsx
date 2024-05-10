import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import { AxiosError } from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import GenericTextField from "../../components/genericTextField/GenericTextField";
import { Notification } from "app/components/toastNotification/toastNotification";
import { Validations } from "core/utils/validations";
import { InfoCardContainer, InfoCardTitle } from "../../components/styles";
import { TIndicationUserRegister } from "core/models/indication";
import { IndiactionService } from "core/api/indication/indicationService";
import {
  removeExtraSpaces,
  removeNonNumeric,
} from "core/utils/globalFunctions";
import { InfoCard } from "app/components/styles";
import {
  RegisterPage,
  RegisterPageContent,
  RegisterPageHeader,
} from "./styles";
import { TRole, verifyRole } from "core/utils/roles";
import { useAppSelector } from "core/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

const RegisterIndication = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",
    "ROLE_INDICATIONS",
    "ROLE_CRUD_INDICATIONS",];
  const notAcceptGroup: string = "CLIENT";

  useEffect(() => {
    if (!verifyRole(basicUserInfo?.roles, acceptRoles)) {
      navigate(-1);
    }
  }, [basicUserInfo]);

  const validateInfos = (): boolean => {
    if (pass !== formik.values.password) {
      formik.setFieldError("password", "Senhas não conferem");
      setIsLoading(false);
      return false;
    }
    return true;
  };

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function togglePasswordConfirm() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  const handleResetStates = () => {
    setPass("");
    setIsLoading(false);
    setCheck(false);
    formik.resetForm();
  };

  const initialValues: TIndicationUserRegister = {
    coupon: "",
    description: "",
    email: "",
    password: "",
    cpforcnpj: "",
  };

  const callCreateIndicationUser = async (newUser: TIndicationUserRegister) => {
    if (validateInfos()) {
      IndiactionService.createNewIndicationUser(newUser)
        .then((resp) => {
          Notification(resp.data.data, "success");
          handleResetStates();
          navigate(-1)
        })
        .catch((err: AxiosError) => {
          Notification(err.message, "error");
          setIsLoading(false);
        });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Validations.registerIndicationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      let cleanedIndication: TIndicationUserRegister = {
        coupon: removeExtraSpaces(values.coupon),
        description: removeExtraSpaces(values.description),
        email: removeExtraSpaces(values.email),
        password: removeExtraSpaces(values.password),
        cpforcnpj: removeNonNumeric(values.cpforcnpj) ?? "",
      };
      await callCreateIndicationUser(cleanedIndication);
      setSubmitting(false);
    },
  });


  if (
    !verifyRole(basicUserInfo?.roles, acceptRoles)
  ) {
    return null;
  }

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar usuário de indicação</RegisterPageHeader>
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
              Informações pessoais
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                error={!!formik.errors.coupon}
                helperText={formik.errors.coupon}
                small
                name={"coupon"}
                label={"Coupon"}
                value={formik.values.coupon}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                small
                name={"description"}
                label={"Descrição"}
                value={formik.values.description}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                small
                name={"email"}
                label={"E-mail"}
                value={formik.values.email}
                props={{
                  onChange: formik.handleChange,
                }}
              />
            </InfoCard>
          </InfoCardContainer>
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações acesso a plataforma
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                error={!!formik.errors.cpforcnpj}
                helperText={formik.errors.cpforcnpj}
                small
                name={"cpforcnpj"}
                label={"Cpf/Cnpj"}
                value={formik.values.cpforcnpj}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                small
                name={"password"}
                label={"Senha"}
                value={formik.values.password}
                props={{
                  type: showPassword ? "text" : "password",
                  onChange: formik.handleChange,
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                small
                name={"confirmPass"}
                label={"Confirmar senha"}
                value={pass}
                props={{
                  onChange: (e) => setPass(e.target.value),
                  type: showPasswordConfirm ? "text" : "password",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/indicacoes")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  );
};
export default RegisterIndication;
