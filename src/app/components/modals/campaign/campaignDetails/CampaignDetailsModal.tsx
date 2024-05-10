import { useState } from "react";
import ContactPageIcon from "@mui/icons-material/ContactPage";

import { TCampaign, TContact, TExecution } from "core/models/campaign";
import DefaultModal from "../../defaultModal/defaultModal";
import {
  Container,
  InfoCard,
  InfoCardContainer,
  InfoCardTitle,
  InfoKey,
  InfoRow,
  InfosSection,
  InfoValue,
  Title,
} from "app/components/styles";
import { formatDateBr, formatPhoneNumber } from "core/utils/globalFunctions";
import {
  ContactLine,
  ContactList,
  ExecutionsList,
  ExecutionsSection,
  InfoLabel,
} from "./styles";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "core/theme/theme";

interface ICampaignDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  campaign: TCampaign;
}

const CampaignDetailsModal = (props: ICampaignDetailsProps) => {
  const { isOpen, onClose, onOpen, campaign } = props;
  const [contactModal, setContactModal] = useState(false);
  const [tempList, setTempList] = useState<TContact[]>();

  function handleShowList(tempList: any) {
    setTempList(tempList);
    setContactModal(true);
  }

  function closeList() {
    setContactModal(false);
  }

  return (
    <>
      <DefaultModal
        title=""
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        children={
          <Container>
            <Title>Detalhes da campanha</Title>
            <InfosSection>
              <InfoCardContainer>
                <InfoCardTitle>Informações</InfoCardTitle>
                <InfoCard sx={{ width: 500 }}>
                  <InfoRow>
                    <InfoKey>Id:</InfoKey>
                    <InfoValue>{campaign.id}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Nome:</InfoKey>
                    <InfoValue>{campaign.name}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Data de criação:</InfoKey>
                    <InfoValue>{formatDateBr(campaign.createdAt)}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Última atualização:</InfoKey>
                    <InfoValue>{formatDateBr(campaign.updated_at)}</InfoValue>
                  </InfoRow>
                  <InfoRow
                    sx={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 0,
                    }}
                  >
                    <InfoKey>Descrição:</InfoKey>
                    <Typography
                      sx={{ maxWidth: 400, fontSize: theme.FONTS_SIZE.MD }}
                    >
                      {campaign.description}
                    </Typography>
                  </InfoRow>
                </InfoCard>
              </InfoCardContainer>
            </InfosSection>
            <Box>
              <InfoCardTitle sx={{ marginLeft: "1rem" }}>
                Execuções
              </InfoCardTitle>
              <Box
                sx={{
                  padding: "1rem",
                  background: theme.COLORS.BLUE3,
                  overflowY: "scroll",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <TableContainer
                  component={Paper}
                  style={{ maxHeight: 200, overflow: "auto" }}
                >
                  <Table
                    stickyHeader
                    sx={{ minWidth: 300 }}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Dt. Início</TableCell>
                        <TableCell align="right">Dt. Término</TableCell>
                        <TableCell align="right">Opção</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {campaign.executions.map((row: TExecution) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="right">{row.id}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="right">
                            {formatDateBr(row.dateInitial)}
                          </TableCell>
                          <TableCell align="right">
                            {formatDateBr(row.dateFinal)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleShowList(row.contacts)}
                            >
                              <ContactPageIcon
                                sx={{
                                  fontSize: "30px",
                                  color: theme.COLORS.BLUE3,
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Container>
        }
      />
      <DefaultModal
        title="Clientes contatados"
        isOpen={contactModal}
        onClose={() => closeList()}
        onOpen={() => setContactModal(true)}
        children={
          <ContactList>
            {tempList &&
              tempList.map((contact: any) => (
                <ContactLine key={contact.id} $active={contact.success}>
                  <InfoLabel sx={{ width: "30px" }}>Id:</InfoLabel>
                  <InfoValue sx={{ width: "100px" }}>{contact.id}</InfoValue>
                  <InfoLabel sx={{ width: "50px" }}>Nome:</InfoLabel>
                  <InfoValue sx={{ width: "250px" }}>{contact.name}</InfoValue>
                  <InfoLabel sx={{ width: "50px" }}>Telefone:</InfoLabel>
                  <InfoValue sx={{ width: "150px" }}>
                    {formatPhoneNumber(contact.telephone)}
                  </InfoValue>
                </ContactLine>
              ))}
          </ContactList>
        }
      />
    </>
  );
};

export default CampaignDetailsModal;
