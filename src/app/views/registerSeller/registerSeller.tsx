import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { Notification } from "app/components/toastNotification/toastNotification";
import { SellerService } from "core/api/seller/sellerService";
import { Validations } from "core/utils/validations";
import { TNewSellerBodyRequest } from "../../../core/models/seller";
import GenericTextField from "../../components/genericTextField/GenericTextField";
import {
  InfoCard,
  InfoCardContainer,
  InfoCardTitle,
} from "../../components/styles";
import {
  RegisterPage,
  RegisterPageContent,
  RegisterPageHeader,
} from "./styles";
import {
  removeExtraSpaces,
  removeNonNumeric,
} from "core/utils/globalFunctions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";
import { TRole, verifyRole } from "core/utils/roles";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",
    "ROLE_CRUD_SELLER"];

  useEffect(() => {
    if (!verifyRole(basicUserInfo?.roles, acceptRoles)) {
      navigate(-1);
    }
  }, [basicUserInfo])

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
    formik.resetForm();
  };

  const initialValues: TNewSellerBodyRequest = {
    name: "",
    cpforcnpj: "",
    email: "",
    password: "",
    group_name: "SELLER",
  };

  const callCreateUser = async (newUser: TNewSellerBodyRequest) => {
    setIsLoading(true)
    if (validateInfos()) {
      let cleanedSellerUser: TNewSellerBodyRequest = {
        name: removeExtraSpaces(newUser.name),
        cpforcnpj: removeNonNumeric(newUser.cpforcnpj) ?? "",
        email: removeExtraSpaces(newUser.email),
        password: removeExtraSpaces(newUser.password),
        group_name: initialValues.group_name,
      };

      SellerService.createNewSeller(cleanedSellerUser)
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
    validationSchema: Validations.registerSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateUser(values);
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
      <RegisterPageHeader>Cadastrar vendedor</RegisterPageHeader>
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
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                small
                name={"name"}
                label={"Nome"}
                value={formik.values.name}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.cpforcnpj}
                helperText={formik.errors.cpforcnpj}
                small
                name={"cpforcnpj"}
                label={"CPF/CNPJ"}
                value={formik.values.cpforcnpj}
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
          <Button onClick={() => navigate("/vendedores")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  );
};
export default RegisterSeller;
