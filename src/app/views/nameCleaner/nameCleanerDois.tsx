import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import VendaLogo from "images/assets/logoVenda.svg";
import RegisterAddressForm from "./steps/registerClientForm";
import GenericTextField from "app/components/genericTextField/GenericTextField";
import { useSaleFormContext } from "core/context/SaleContext";
import { SaleService } from "core/api/sale/saleService";
import { CouponService } from "core/api/coupons/couponService";
import {
  removeExtraSpaces,
  removeNonNumeric,
} from "core/utils/globalFunctions";
import { Notification } from "app/components/toastNotification/toastNotification";

import AssignDeal from "./steps/assignDeal";
import { Compra, TSaleBodyRequest, TSalePayment } from "core/models/sale";
import PaymentMethod from "./steps/paymentMethod";
import { TNewClientBodyRequest } from "core/models/client";
import { TGetSaleResponse } from "core/models/payment/boleto";
import QR from "./microComponents/paymentTypes/waitingPix/QR";
import { TPixBodyResponse } from "core/models/payment/pix";
import Spinner from "app/components/spinner/spinner";
import DefaultStepper from "app/components/stepper/stepper";
import theme from "core/theme/theme";
import FormCard from "app/components/formCard/FormCard";
import PersonalInfos from "./steps/personalInfos";

// ! FLUXO DAS LÓGICAS ** limpa nome **
// ? cliente novo: INSERE DOCUMENTO -> PREENCHE DADOS -> PREENCHE ENDEREÇO -> INSERE CUPOM -> ACEITA CONTRATO -> ESCOLHE PAGAMENTO -> PAGA
// ? cliente novo não pode: VOLTAR PRA TELA DE INSERIR DOCUMENTO

// ? cliente existente: INSERE O DOCUMENTO -> INSERE O CUPOM -. ACEITA CONTRATO -> ESCOLHE PAGAMENTO -> PAGA
// ? cliente existente não pode: -> VOLTAR PRA NENHUMA TELA ANTES DO CUPOM

// ! FLUXO DAS LÓGICAS ** consultoria **
// ? cliente novo: INSERE DOCUMENTO -> PREENCHE DADOS -> PREENCHE ENDEREÇO -> ACEITA CONTRATO -> ESCOLHE PAGAMENTO -> PAGA
// ? cliente novo não pode: VOLTAR PRA TELA DE INSERIR DOCUMENTO && VOLTAR PRA TELA DE CUPOM, MAS PODE VOLTAR PARA TELA DE PREENCHER DADOS

// ? cliente existente: INSERE O DOCUMENTO -> ACEITA CONTRATO -> ESCOLHE PAGAMENTO -> PAGA
// ? cliente existente não pode: -> VOLTAR PRA NENHUMA TELA ANTES DO CONTRATO

const steps = [
  "CPF/CNPJ",
  "Informações pessoais",
  "Endereço",
  "Cupom",
  "Contrato",
  "Formas de pagamento",
];

function NameCleanerDois() {
  const {
    formik,
    isLoading,
    setUserPermissions,
    userPermissions,
    setIsLoading,
    activeStep,
    setActiveStep,
    setDocValidated,
    setTempCupom,
    cupom,
    tempCupom,
    setCupom,
  } = useSaleFormContext();
  let urlPath = window.location.href.split("/");
  const urlType = urlPath[3] === "consultoria" ? "CONSULTORIA" : "LIMPA_NOME";
  const [isCheckboxEnabled, setCheckboxEnabled] = useState(false);
  const [response, setResponse] = useState<TGetSaleResponse>();
  const [paymentInfo, setPaymentInfo] = useState<TSalePayment>({
    typePayment: "",
    installments: undefined,
    isFees: false,
  });

  // navegar no form
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (
      activeStep === 4 &&
      urlType === "CONSULTORIA" &&
      !userPermissions.isExistForClient
    ) {
      setActiveStep(1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  // titulo do form com base na url
  function saleTitle() {
    let urlType = window.location.href.split("/");
    let productType =
      urlType[3] === "consultoria" ? "Consultoria" : "Limpa nome";
    return productType;
  }

  // seleciona a funcao que o next vai usar
  function handleButton() {
    if (activeStep === 0) {
      validateDocument();
    }
    if (activeStep === 1) {
      validatePersonalInfos();
    }
    if (activeStep === 2) {
      validateAddressInfos();
    }
    if (activeStep === 3) {
      validateCoupon();
    }
    if (activeStep === 4) {
      handleNext();
    }
    if (activeStep === 5) {
      mountNewSale();
    }
  }

  // ? VALIDAÇÕES

  // validar documento e analisar pra onde vai
  async function validateDocument() {
    setIsLoading(true);
    let clearedDoc = removeNonNumeric(formik.values.cpforcnpj);

    if (
      clearedDoc &&
      clearedDoc.length === 14 &&
      urlPath[3] === "consultoria"
    ) {
      Notification("Consultoria não pode ser fornecida a cnpj.", "error");
      setIsLoading(false);
      return; // Cancela a execução da função
    } else
      await formik.validateForm().then(async (resp) => {
        if (Object.keys(resp).length === 0) {
          let urlType = window.location.href.split("/");
          let productType =
            urlType[3] === "consultoria" ? "CONSULTORIA" : "LIMPA_NOME";
          await SaleService.getValidationDoc(
            removeNonNumeric(formik.values.cpforcnpj) ?? "",
            productType
          ).then((resp) => {
            setDocValidated(true);
            setUserPermissions(resp);
            //caso ja tenha o produto
            if (resp.isExist) {
              Notification("CPF/CNPJ já adiquiriu este produto", "error");
              setDocValidated(false);
            }
            // caso cliente novo
            if (!resp.isExist && !resp.isExistForClient) {
              setActiveStep(1);
            }
            //caso a venda seja pra cliente existente + validaçao de tipo de venda
            if (!resp.isExist && resp.isExistForClient) {
              if (productType === "CONSULTORIA") {
                setActiveStep(4);
              } else {
                setActiveStep(3);
              }
            }
          });
        }
        setIsLoading(false);
      });
  }

  // validar infos pessoais
  async function validatePersonalInfos() {
    await formik.validateForm().then((resp) => {
      if (
        !resp.name &&
        !resp.email &&
        !resp.cpforcnpj &&
        !resp.telephone &&
        !resp.password &&
        !resp.confirmPassword
      ) {
        formik.setErrors({});
        handleNext();
      }
    });
  }

  // validar formulario caso tenha
  async function validateAddressInfos() {
    await formik.validateForm().then((resp) => {
      if (Object.keys(resp).length === 0) {
        if (urlType === "CONSULTORIA") {
          setActiveStep(4);
        } else {
          handleNext();
        }
      }
    });
  }

  //validar cupom caso tenha
  const validateCoupon = async () => {
    if (!cupom) {
      setActiveStep(activeStep + 1);
    } else {
      await CouponService.validateCoupon(
        cupom,
        removeNonNumeric(formik.values.cpforcnpj) ?? ""
      )
        .then((resp) => {
          Notification("Cupom válidado", "success");
          setTempCupom(resp.data.data);
          setActiveStep(activeStep + 1);
        })
        .catch((err) => {
          Notification(err.response.data.errors[0], "error");
        });
    }
  };

  //fazer a compra
  const mountNewSale = async () => {
    setIsLoading(true);
    const url = window.location.pathname.split("/").pop();
    let urlType = window.location.href.split("/");
    let productType =
      urlType[3] === "consultoria" ? "CONSULTORIA" : "LIMPA_NOME";

    let clearedClient: TNewClientBodyRequest = {
      name: removeExtraSpaces(formik.values.name),
      cpforcnpj: removeNonNumeric(formik.values.cpforcnpj) ?? "",
      email: removeExtraSpaces(formik.values.email),
      password: removeExtraSpaces(formik.values.password),
      city: removeExtraSpaces(formik.values.city),
      uf: removeExtraSpaces(formik.values.uf),
      cep: removeNonNumeric(formik.values.cep) ?? "",
      address: removeExtraSpaces(formik.values.address),
      neighborhood: removeExtraSpaces(formik.values.neighborhood),
      telephone: removeNonNumeric(formik.values.telephone) ?? "",
      confirmPassword: removeExtraSpaces(formik.values.confirmPassword),
      cameThrough: removeExtraSpaces(formik.values.cameThrough),
    };

    let saleInfos: TSaleBodyRequest = {
      client: clearedClient,
      contract: true,
      tokenSales: url ?? "",
      cameThrough: formik.values.cameThrough,
      isFees: paymentInfo.isFees,
      typePayment: paymentInfo.typePayment,
      installments: paymentInfo.installments,
      couponId: Number(tempCupom?.id),
      typeSales: productType as Compra,
    };

    await SaleService.submitSale(saleInfos)
      .then((resp) => {
        setResponse(resp.data);
        setIsLoading(false);
        setActiveStep(activeStep + 1);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));

  return (
    <Container
      component="main"
      disableGutters
      sx={{
        height: isSmallScreen ? "100svh" : undefined,
        width: "100svw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: isSmallScreen ? 0 : 1,
        paddingTop: isSmallScreen ? 0 : 5,
        alignItems: "center",
      }}
    >
      <Box position={"relative"} textAlign={"center"}>
        <img
          alt="sadjaslkdj"
          src={VendaLogo}
          height={isSmallScreen ? 70 : 80}
        />
        <Typography
          fontWeight={"bold"}
          color={theme.COLORS.BLUE3}
          fontSize={isSmallScreen ? 15 : 20}
        >
          Adiquirir serviço de {saleTitle()}
        </Typography>
      </Box>

      <Box
        sx={{
          height: isSmallScreen ? "100%" : undefined,
          width: isSmallScreen ? "100%" : undefined,
          borderRadius: isSmallScreen ? 0 : 1,
        }}
        bgcolor={theme.COLORS.WHITE}
        border={!isSmallScreen ? "2px solid" : undefined}
        borderColor={!isSmallScreen ? theme.COLORS.GRAY4 : undefined}
      >
        {!isSmallScreen && (
          <DefaultStepper activeStep={activeStep} steps={steps} />
        )}

        {/* conteúdo */}
        <Box>
          {activeStep === steps.length ? (
            <Box sx={{padding: "0.5rem 0"}}>
              <QR {...(response?.pix as TPixBodyResponse)} />
            </Box>
          ) : isLoading ? (
            <Box
              position={isSmallScreen ? "absolute" : undefined}
              height={isSmallScreen ? "100%" : "50svh"}
              width={isSmallScreen ? "100%" : undefined}
              display={"flex"}
            >
              <Spinner state={isLoading} size={10} css={{ margin: "auto" }} />
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              position={isSmallScreen ? "absolute" : undefined}
              width={isSmallScreen ? "100%" : undefined}
            >
              <Box
                padding={1}
                display={"flex"}
                justifyContent={"center"}
                sx={{ overflowY: "scroll" }}
              >
                {activeStep === 0 ? (
                  <FormCard title="Insira seu CPF/CNPJ:">
                    <GenericTextField<string>
                      error={!!formik.errors.cpforcnpj}
                      helperText={formik.errors.cpforcnpj}
                      name={"cpforcnpj"}
                      label={"Documento"}
                      value={formik.values.cpforcnpj}
                      props={{
                        onChange: formik.handleChange,
                      }}
                    />
                  </FormCard>
                ) : activeStep === 1 ? (
                  <PersonalInfos />
                ) : activeStep === 2 ? (
                  <RegisterAddressForm />
                ) : activeStep === 3 ? (
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      sx={{ margin: "0 auto" }}
                      label="Inserir cupom?"
                      value={cupom}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setCupom(event.target.value);
                      }}
                    />
                  </Box>
                ) : activeStep === 4 ? (
                  <AssignDeal
                    formik={formik}
                    isCheckboxEnabled={isCheckboxEnabled}
                    setCheckboxEnabled={setCheckboxEnabled}
                  />
                ) : activeStep === 5 ? (
                  <PaymentMethod
                    cupom={tempCupom}
                    document={formik.values.cpforcnpj}
                    payment={paymentInfo}
                    onChangePayment={setPaymentInfo}
                  />
                ) : (
                  <QR {...(response?.pix as TPixBodyResponse)} />
                )}
              </Box>
              {/* footer do formulario */}
              {activeStep !== 6 && (
                <Box
                  pb={2}
                  pt={2}
                  display={"flex"}
                  justifyContent={"space-around"}
                  borderTop={isSmallScreen ? undefined : "2px solid"}
                  borderColor={isSmallScreen ? undefined : theme.COLORS.GRAY4}
                  height={isSmallScreen ? 100 : undefined}
                >
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                    disabled={
                      activeStep === 0 ||
                      activeStep === 1 ||
                      (activeStep === 3 && userPermissions.isExistForClient) ||
                      (activeStep === 4 &&
                        urlType === "CONSULTORIA" &&
                        userPermissions.isExistForClient)
                    }
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                  <Button
                    color="primary"
                    disabled={
                      (!isCheckboxEnabled && activeStep === 4) ||
                      (activeStep === 5 && paymentInfo.typePayment === "") ||
                      isLoading ||
                      (activeStep === 5 &&
                        paymentInfo.installments === undefined)
                    }
                    onClick={handleButton}
                  >
                    {activeStep < 5 ? "Próximo" : "Finalizar"}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default NameCleanerDois;
