import { Box, IconButton } from "@mui/material";
import { formatCurrencyBR, formatDateBr } from "core/utils/globalFunctions";
import { ContentCopy } from "@mui/icons-material";
import copy from "clipboard-copy";
import CloudSyncIcon from '@mui/icons-material/CloudSync';

import { TPixBodyResponse } from "core/models/payment/pix";
import theme from "core/theme/theme";
import { InfoColumn } from "./styles";
import { InfoKey, InfoValue } from "app/components/styles";
import PixIcon from "@mui/icons-material/Pix";
import { SaleService } from "core/api/sale/saleService";
import { useState } from "react";

interface IPixInfoProps {
  pix: TPixBodyResponse;
  isClient?: boolean;
  saleStatus?: string;
  reRender?: () => void;
}

const PixInfo = (props: IPixInfoProps) => {
  const { pix, isClient, reRender, saleStatus } = props;
  const { brcode, dateCreation, dueDate, status, value, paymentDate, id } = pix;
  const [loading, setLoading] = useState(false);

  const handleAsync = async (id: number) => {
    setLoading(true)
    await SaleService.asyncPaymentById(id)
      .then(() => {
        setLoading(false)
        if (reRender) {
          reRender()
        }
      })
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "-8px",
        justifyContent: "space-between",
        alignItems: "center",
        background: theme.COLORS.GRAY6,
        borderRadius: 1,
        padding: "0.3rem 0.5rem",
        borderLeft:
          status === "LIQUIDADO"
            ? `6px solid ${theme.COLORS.GREEN1}`
            : `6px solid ${theme.COLORS.YELLOW}`,
      }}
    >
      <PixIcon sx={{ fontSize: "30px", color: "#000" }} />
      <InfoColumn>
        <InfoKey>Emissão</InfoKey>
        <InfoValue>{formatDateBr(dateCreation)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Vencimento</InfoKey>
        <InfoValue>{formatDateBr(dueDate)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Pagamento</InfoKey>
        <InfoValue>{formatDateBr(paymentDate)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Valor</InfoKey>
        <InfoValue>{formatCurrencyBR(value)}</InfoValue>
      </InfoColumn>
      <InfoColumn>
        <InfoKey>Status</InfoKey>
        <InfoValue>{status}</InfoValue>
      </InfoColumn>
      <Box>
        <IconButton
          disabled={status === "LIQUIDADO"}
          onClick={() => copy(brcode)}
        >
          <ContentCopy
            sx={{
              fontSize: "30px",
              color:
                status === "LIQUIDADO" ? theme.COLORS.GRAY4 : theme.COLORS.BLUE3,
            }}
          />
        </IconButton>
        {(isClient || status !== 'LIQUIDADO' || saleStatus === "PENDENTE") && (<IconButton
          disabled={loading}
          onClick={() => handleAsync(id)}
        >
          <CloudSyncIcon
            sx={{
              fontSize: "30px",
              color: loading ? theme.COLORS.GRAY4 : theme.COLORS.BLUE3,
            }}
          />
        </IconButton>)}
      </Box>
    </Box>
  );
};

export default PixInfo;
