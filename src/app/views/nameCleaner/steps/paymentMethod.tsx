import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { FormColumn } from "app/components/styles";
import { TSalePayment } from "core/models/sale";
import { Container, SelectContainer, TitleContainer } from "./styles";
import { TCouponResponse } from "core/models/coupons";
import { formatCurrencyBR } from "core/utils/globalFunctions";

interface IProps {
  document: string;
  payment: TSalePayment;
  onChangePayment: any;
  cupom?: TCouponResponse;
}

const PaymentMethod = (props: IProps) => {
  const { onChangePayment, payment, document, cupom } = props;
  const currentUrl: string = window.location.pathname;
  let saleTitle = "";
  const urlType = window.location.href.split("/");
  const opcoesDias = [];
  const [diferenca, setDiferenca] = useState(0);
  const [show, setShow] = useState(false);

  const calcularDiferenca = () => {
    if (cleanDocument.length === 11 && payment.isFees) {
      return setDiferenca(1500 - Number(cupom?.valueInstallmentCpf));
    } else if (cleanDocument.length === 11 && !payment.isFees) {
      return setDiferenca(1500 - Number(cupom?.valuePixCpf));
    } else if (cleanDocument.length === 14 && payment.isFees) {
      return setDiferenca(2000 - Number(cupom?.valueInstallmentCnpj));
    } else if (cleanDocument.length === 14 && !payment.isFees) {
      return setDiferenca(2000 - Number(cupom?.valuePixCnpj));
    }
  };

  const escolherValor = () => {
    if (cleanDocument.length === 11 && payment.isFees) {
      return 2 * Number(cupom?.valueInstallmentCpf);
    } else if (cleanDocument.length === 11 && !payment.isFees) {
      return cupom?.valuePixCpf;
    } else if (cleanDocument.length === 14 && payment.isFees) {
      return 2 * Number(cupom?.valueInstallmentCnpj);
    } else if (cleanDocument.length === 14 && !payment.isFees) {
      return cupom?.valuePixCnpj;
    }
  };

  const handleChangeFees = (isFees: boolean) => {
    setShow(true);
    onChangePayment((prev: TSalePayment) => ({
      ...prev,
      isFees,
    }));
  };

  const handleChangeInstallmentSelect = (event: SelectChangeEvent) => {
    let installmentAsNumber = Number(event.target.value);
    onChangePayment((prev: TSalePayment) => ({
      ...prev,
      installments: installmentAsNumber,
    }));
  };

  const handleChangePaymentType = (type: "BOLETO" | "PIX") => {
    if (type === "PIX") {
      onChangePayment((prev: TSalePayment) => ({
        ...prev,
        choosenDate: undefined,
        typePayment: type,
      }));
    }
    onChangePayment((prev: TSalePayment) => ({
      ...prev,
      typePayment: type,
    }));
  };

  for (let i = 1; i <= 28; i++) {
    opcoesDias.push(
      <MenuItem key={i} value={i}>
        {String(i)}
      </MenuItem>
    );
  }

  let cleanDocument = document.replace(/\D/g, "");

  function getSaleTitle(): string {
    if (cleanDocument.length === 11 && !payment.isFees) {
      saleTitle = formatCurrencyBR(1500);
    } else if (cleanDocument.length === 11) {
      saleTitle = formatCurrencyBR(2 * 800);
    }

    if (cleanDocument.length === 14 && !payment.isFees) {
      saleTitle = formatCurrencyBR(2000);
    } else if (cleanDocument.length === 14) {
      saleTitle = formatCurrencyBR(2 * 1050);
    }

    // Check if the URL at index 3 contains "consultoria"
    if (urlType[3] === "consultoria") {
      saleTitle = formatCurrencyBR(297);
    }

    return saleTitle;
  }

  useEffect(() => {
    calcularDiferenca();
  }, [payment, onChangePayment]);

  return (
    <FormColumn>
      <Container>
        {show && (
          <TitleContainer>
            <Typography margin={0.5}> Valor: R$ {getSaleTitle()}</Typography>
            {cupom?.coupon && urlType[3] !== "consultoria" && (
              <>
                <Typography color={"#569c00"} margin={0.5}>
                  Desconto: {formatCurrencyBR(diferenca)}
                </Typography>
                <Typography color={"#569c00"} margin={0.5}>
                  Total final: {formatCurrencyBR(Number(escolherValor()))}
                </Typography>
              </>
            )}
          </TitleContainer>
        )}
        <SelectContainer>
          <InputLabel>Pagamento</InputLabel>
          <Select
            label="Pagamento"
            onChange={handleChangeInstallmentSelect}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 150,
                  overflow: "auto",
                },
              },
            }}
          >
            {/* SEM CUPOM CPF LIMPA NOME */}
            {cleanDocument.length === 11 && !cupom?.coupon && urlType[3] !== "consultoria" && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(false);
                  handleChangePaymentType("PIX");
                }}
                value={0}
              >
                1x R$ 1.500,00 - Pix
              </MenuItem>
            )}

            {cleanDocument.length === 11 && !cupom?.coupon && urlType[3] !== "consultoria" && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(true);
                  handleChangePaymentType("BOLETO");
                }}
                value={2}
              >
                1 + 1 R$ 800,00 - Pix + Boleto
              </MenuItem>
            )}

            {/* COM CUPOM CPF LIMPA NOME */}
            {cleanDocument.length === 11 && cupom?.valuePixCpf && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(false);
                  handleChangePaymentType("PIX");
                }}
                value={0}
              >
                1x {formatCurrencyBR(Number(cupom.valuePixCpf))} - Pix
              </MenuItem>
            )}

            {cleanDocument.length === 11 && cupom?.valueInstallmentCpf && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(true);
                  handleChangePaymentType("BOLETO");
                }}
                value={2}
              >
                2x
                {formatCurrencyBR(Number(cupom.valueInstallmentCpf))} - Pix +
                Boleto
              </MenuItem>
            )}

            {/* SEM CUPOM CNPJ LIMPA NOME */}
            {cleanDocument.length === 14 && !cupom?.coupon && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(false);
                  handleChangePaymentType("PIX");
                }}
                value={0}
              >
                1x R$ 2.000,00 - Pix
              </MenuItem>
            )}

            {cleanDocument.length === 14 && !cupom?.coupon && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(true);
                  handleChangePaymentType("BOLETO");
                }}
                value={2}
              >
                2x R$ 1050,00 - Boleto
              </MenuItem>
            )}

            {/* COM CUPOM CNPJ LIMPA NOME */}
            {cleanDocument.length === 14 && cupom?.valuePixCnpj && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(false);
                  handleChangePaymentType("PIX");
                }}
                value={0}
              >
                1x {formatCurrencyBR(Number(cupom.valuePixCnpj))} - Pix
              </MenuItem>
            )}

            {cleanDocument.length === 14 && cupom?.valueInstallmentCnpj && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(true);
                  handleChangePaymentType("BOLETO");
                }}
                value={2}
              >
                2x
                {formatCurrencyBR(Number(cupom.valueInstallmentCnpj))} - Pix +
                Boleto
              </MenuItem>
            )}

            {/* CONSULTORIA */}
            {urlType[3] === "consultoria" && (
              <MenuItem
                onClick={() => {
                  handleChangeFees(false);
                  handleChangePaymentType("PIX");
                }}
                value={0}
              >
                1x R$ 297,00 - Pix
              </MenuItem>
            )}
          </Select>
        </SelectContainer>
      </Container>
    </FormColumn>
  );
};

export default PaymentMethod;
