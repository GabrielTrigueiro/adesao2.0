/* eslint-disable no-lone-blocks */
import React from "react";
import { Box } from "@mui/material";

import { TSaleBody } from "core/models/sale";
import PixInfo from "./pix";
import BoletoInfo from "./boleto";
import { TBoletoBodyResponse } from "core/models/payment/boleto";
import { TPixBodyResponse } from "core/models/payment/pix";
import { PaymentSection, PaymentListContainer, PaymentList } from "./styles";
import {
  formatCEP,
  formatDocument,
  formatPhoneNumber,
} from "core/utils/globalFunctions";
import {
  InfosSection,
  Container,
  Title,
  InfoCardContainer,
  InfoCardTitle,
  InfoCard,
  InfoRow,
  InfoKey,
  InfoValue,
} from "app/components/styles";

interface IProps {
  sales: TSaleBody | undefined;
  reRender: () => void;
}

const SalesInfo = (sale: IProps) => {
  const { reRender, sales } = sale;

  const DisplayPayments = (): React.ReactNode => {
    return sales?.paymentMethods.map(
      (payment: TBoletoBodyResponse | TPixBodyResponse) => {
        if (payment.type === "PIX") {
          const pix = payment as TPixBodyResponse;
          return <PixInfo saleStatus={sales.status} reRender={reRender} pix={pix} key={pix.id} />;
        } else if (payment.type === "BOLETO") {
          const boleto = payment as TBoletoBodyResponse;
          return (
            <BoletoInfo
              boleto={boleto}
              client={sales.client}
              reRender={reRender}
              key={boleto.installment}
            />
          );
        }
        return null;
      }
    );
  };

  // @ts-ignore
  return (
    <Container>
      <Title>Detalhes da venda</Title>
      <InfosSection>
        <InfoCardContainer>
          <InfoCardTitle>Cliente</InfoCardTitle>
          <InfoCard sx={{ width: 500 }}>
            <InfoRow>
              <InfoKey>Nome:</InfoKey>
              <InfoValue>{sale.sales?.client.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>cpf/cnpj:</InfoKey>
              <InfoValue>
                {formatDocument(sale.sales?.client.cpforcnpj!)}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Email:</InfoKey>
              <InfoValue>{sale.sales?.client.email}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Contato:</InfoKey>
              <InfoValue>
                {formatPhoneNumber(sale.sales?.client.telephone!)}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Veio por:</InfoKey>
              <InfoValue>{sale.sales?.cameThrough ?? "--"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Cep:</InfoKey>
              <InfoValue>{formatCEP(sale.sales?.client.cep!)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Bairro:</InfoKey>
              <InfoValue>{sale.sales?.client.neighborhood}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoKey>Estado:</InfoKey>
              <InfoValue>{sale.sales?.client.uf}</InfoValue>
            </InfoRow>
          </InfoCard>
        </InfoCardContainer>
        <Box
          sx={{
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <InfoCardContainer>
            <InfoCardTitle>Vendedor</InfoCardTitle>
            <InfoCard sx={{ width: 250 }}>
              <InfoRow>
                <InfoKey>Nome:</InfoKey>
                <InfoValue>{sale.sales?.client.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoKey>cpf/cnpj:</InfoKey>
                <InfoValue>
                  {formatDocument(sale.sales?.client.cpforcnpj!)}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoKey>Email:</InfoKey>
                <InfoValue>{sale.sales?.client.email}</InfoValue>
              </InfoRow>
            </InfoCard>
          </InfoCardContainer>
          {sale.sales?.indication && (
            <InfoCardContainer>
              <InfoCardTitle>Indicação</InfoCardTitle>
              <InfoCard sx={{ width: 250 }}>
                <InfoRow>
                  <InfoKey>Nome:</InfoKey>
                  <InfoValue>{sale.sales?.indication.coupon}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoKey>cpf/cnpj:</InfoKey>
                  <InfoValue>
                    {formatDocument(sale.sales?.indication.login!)}
                  </InfoValue>
                </InfoRow>
              </InfoCard>
            </InfoCardContainer>
          )}
        </Box>
      </InfosSection>
      <PaymentSection>
        <InfoCardTitle sx={{ marginLeft: "1rem" }}>Pagamentos</InfoCardTitle>
        <PaymentListContainer>
          <PaymentList>{DisplayPayments()}</PaymentList>
        </PaymentListContainer>
      </PaymentSection>
    </Container>
  );
};

export default SalesInfo;
