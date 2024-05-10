import React, { useState } from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

import {
  ContentHeader,
  ContentTitle,
  PageContentContainer,
} from "app/components/styles";
import DefaultFloatingMenu, {
  TMenuActions,
} from "app/components/floatingMenu/floatingMenu";
import DefaultModal from "app/components/modals/defaultModal/defaultModal";
import { PagamentosContainer, Container, ContainerTitle, StatusContainer } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { fetchClientPayments } from "core/querryes/client/clientPaymentsQuerry";
import { useAppSelector } from "core/hooks/reduxHooks";
import Spinner from "app/components/spinner/spinner";
import BoletoInfo from "app/components/modals/sales/salesInfo/boleto";
import { TBoletoBodyResponse } from "core/models/payment/boleto";
import ReadDeal from "./readDeal";
import handleDeal from "app/views/nameCleaner/microComponents/contract/deal";
import { fetchClientDeal } from "core/querryes/client/clientDealQuerry";
import ReactDOMServer from "react-dom/server";
import PixInfo from "app/components/modals/sales/salesInfo/pix";
import { Box, Typography } from "@mui/material";
import { TRole, verifyRole } from "core/utils/roles";
import { useNavigate } from "react-router-dom";

const ClientPayment = () => {
  const navigate = useNavigate();
  const clientInfos = useAppSelector((state) => state.auth.client);
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const acceptRoles: TRole[] = ["ROLE_COURSES"]; 
	const notAcceptGroup: string  = "ROLE_ADMIN";

  const dealInfo = useQuery({
    queryKey: ["installments"],
    staleTime: Infinity,
    queryFn: () => fetchClientDeal(),
  });


  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    staleTime: Infinity,
    queryFn: () => fetchClientPayments(),
  });

  const [readDeal, setReadDeal] = useState(false);

  const clientMenu: TMenuActions = [
    {
      icon: <VerticalAlignBottomIcon />,
      name: "Baixar contrato",
      action: () => handleClick(),
    },
    {
      icon: <AutoStoriesIcon />,
      name: "Ler contrato",
      action: () => setReadDeal(true),
    },
  ];

  const handleClick = () => {
    const content =
      handleDeal(
        clientInfos?.name || " ",
        clientInfos?.cpforcnpj || " ",
        clientInfos?.address || " ",
        dealInfo.data
      ) || "";

    const htmlString = ReactDOMServer.renderToString(<div>{content}</div>);

    const htmlContent = `
        <html>
          <head>
            <title>Contrato</title>
          </head>
          <body>
            <div style="max-width: 800px; margin: 0 auto;">
              ${htmlString}
            </div>
          </body>
        </html>
      `;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  if (
		!verifyRole(basicUserInfo?.roles, acceptRoles) ||
		basicUserInfo?.group === notAcceptGroup
	  ) {
		navigate(-1);
		return null;
	  }
  
  return (
    <PageContentContainer>
      <ContentHeader>
        <ContentTitle>Início</ContentTitle>
      </ContentHeader>
      <Container>
        <StatusContainer>
          <Typography className="status vencido">Vencido</Typography>
          <Typography className="status aguardando">Aguardando</Typography>
          <Typography className="status pago">Pago</Typography>
        </StatusContainer>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem", margin: "auto" }}>
            <Spinner state={true} />
          </Box>
        ) : (
          <>
            {data.map((item: any) => (
              <React.Fragment key={item.id}>
                {item.type === "PIX" && (
                  <>
                    <PagamentosContainer container>
                      <PixInfo pix={item} isClient={true} />
                    </PagamentosContainer>
                  </>
                )}
                {item.type === "BOLETO" && clientInfos && (
                  <>
                    <PagamentosContainer container>
                      <BoletoInfo key={item.id} boleto={item} client={clientInfos} />
                    </PagamentosContainer>
                  </>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </Container>

      <DefaultFloatingMenu items={clientMenu} />

      <DefaultModal
        title="Seu contrato"
        isOpen={readDeal}
        onClose={() => setReadDeal(false)}
        onOpen={() => setReadDeal(true)}
        children={<ReadDeal installments={dealInfo.data} />}
      />
    </PageContentContainer>
  );
};

export default ClientPayment;
