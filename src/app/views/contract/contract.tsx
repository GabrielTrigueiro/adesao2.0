import { PageContentContainer } from 'app/components/styles'
import React from 'react'
import { ButtonDownload, Container, ContractBox } from './styles'
import { Box, Button, Icon } from '@mui/material'
import handleDeal from '../nameCleaner/microComponents/contract/deal'
import { useAppSelector } from 'core/hooks/reduxHooks'
import DownloadIcon from '@mui/icons-material/Download';
import { useQuery } from '@tanstack/react-query'
import { fetchClientDeal } from 'core/querryes/client/clientDealQuerry'
import ReactDOMServer from 'react-dom/server'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom'
import { TRole, verifyRole } from 'core/utils/roles'

const Contract = () => {
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const clientInfos = useAppSelector((state) => state.auth.client);
  const acceptRoles: TRole[] = [
    "ROLE_COURSES",];
  const notAcceptGroup: string = "ROLE_ADMIN";


  const dealInfo = useQuery({
    queryKey: ["installments"],
    staleTime: Infinity,
    queryFn: () => fetchClientDeal(),
  });

  const contractViwer = handleDeal(
    clientInfos?.name || " ",
    clientInfos?.cpforcnpj || " ",
    clientInfos?.address || " ",
  )

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
      <Container>
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
          <ButtonDownload onClick={handleClick}>
            Baixar
            <Icon sx={{ marginLeft: "3px", marginBottom: "8px" }}>
              <DownloadIcon />
            </Icon>
          </ButtonDownload>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", overflowY: "auto", height: "80svh" }}>
          <ContractBox>
            {contractViwer}
          </ContractBox>
        </Box>
      </Container>
    </PageContentContainer>

  )
}

export default Contract