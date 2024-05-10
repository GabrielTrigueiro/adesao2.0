import CloudSyncIcon from '@mui/icons-material/CloudSync';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

import {
  TBoletoBodyResponse,
  TBoletoActions,
} from "core/models/payment/boleto";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import { useAppSelector } from "core/hooks/reduxHooks";
import {
  downloadPdf,
  formatCurrencyBR,
  formatDateBr,
} from "core/utils/globalFunctions";
import DefaultModal from "../../defaultModal/defaultModal";
import AlterBoletoDate from "../alterDate/alterDate";
import DiscountBoleto from "../discount/discount";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { TNewClientBodyRequest } from "core/models/client";
import theme from "core/theme/theme";
import { InfoColumn } from "./styles";
import { InfoKey, InfoValue } from "app/components/styles";
import BoletoSvg from "images/assets/boletoSvg.svg";
import { SaleService } from 'core/api/sale/saleService';
import { BoletoService } from 'core/api/boleto/boletoService';
import { Notification } from 'app/components/toastNotification/toastNotification';

interface IBoletoInfoProps {
  boleto: TBoletoBodyResponse;
  client: TNewClientBodyRequest;
  reRender?: () => void;
}

const BoletoInfo = (props: IBoletoInfoProps) => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const { boleto, reRender } = props;
  const {
    nossoNumero,
    dueDate,
    installment,
    issuancedate,
    status,
    value,
    seuNumero,
    discount,
    paymentDate,
    paymentValue,
    id
  } = boleto;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState<TBoletoActions>();
  const [dialog, setDialog] = useState(false);

  const open = Boolean(anchorEl);

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

  const onCloseDialog = () => {
    setDialog(false);
  };

  const onOpenDialog = () => {
    setDialog(true);
    handleCloseMenu();
  };

  const handleDowloadBoletoPdf = async () => {
    if (!loading) {
      setLoading(true);
      await SaleService.getB64Boleto(id, installment);
      handleCloseMenu();
      setLoading(false)
    }
  }

  const items: IMenuItemProps[] = [
    { function: () => handleMenuItem("DATE"), label: "Alterar data" },
    { function: () => handleMenuItem("DISCOUNT"), label: "Descontar" },
    { function: () => onOpenDialog(), label: "Baixar" },
    { function: () => handleDowloadBoletoPdf(), label: "Dowload PDF boleto" },
  ];

  const onClose = () => {
    setModal(false);
  };

  const onOpen = () => {
    setModal(true);
  };

  const handleMenuItem = (actionType: TBoletoActions) => {
    setModalType(actionType);
    onOpen();
    handleCloseMenu();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirm = async () => {
    if (nossoNumero) {
      BoletoService.DownBoleto(String(nossoNumero))
      onCloseDialog();
      onClose();
      if (reRender) {
        reRender();
      }
    }
  };

  let body;

  switch (modalType) {
    case "DATE":
      body = (
        <AlterBoletoDate
          onCloseModal={onClose}
          nossoNumero={String(nossoNumero)}
          refetch={reRender}
        />
      );
      break;
    case "DISCOUNT":
      body = (
        <DiscountBoleto
          onCloseModal={onClose}
          nossoNumero={String(nossoNumero)}
          refetch={reRender}
        />
      );
      break;
  }

  function isMenuDisabled(): boolean {
    if (
      basicUserInfo &&
      basicUserInfo.roles &&
      basicUserInfo.roles.includes("ROLE_ADMIN")
    ) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          background: theme.COLORS.GRAY6,
          borderRadius: 1,
          padding: "0.3rem 0.5rem",
          borderLeft: !paymentDate
            ? `6px solid ${theme.COLORS.YELLOW}`
            : `6px solid ${theme.COLORS.GREEN1}`,
        }}
      >
        <img
          alt="boleto"
          src={BoletoSvg}
          height={"20px"}
          style={{ margin: "auto 0px" }}
        ></img>
        <InfoColumn sx={{ alignSelf: "center" }}>
          <InfoKey>Parcela</InfoKey>
          <InfoValue sx={{ textAlign: "center" }}>{installment}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Datas</InfoKey>
          <InfoValue>Emissão: {formatDateBr(issuancedate)}</InfoValue>
          <InfoValue>Vencimento: {formatDateBr(dueDate)}</InfoValue>
          <InfoValue>Pagamento: {formatDateBr(paymentDate)}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Valores</InfoKey>
          <InfoValue>A pagar: {formatCurrencyBR(value)}</InfoValue>
          <InfoValue>Desconto: {formatCurrencyBR(discount)}</InfoValue>
          <InfoValue>Pago: {formatCurrencyBR(paymentValue)}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Nosso/Seu número</InfoKey>
          <InfoValue>{nossoNumero}</InfoValue>
          <InfoValue>{seuNumero}</InfoValue>
        </InfoColumn>
        <InfoColumn>
          <InfoKey>Status</InfoKey>
          <InfoValue>{status}</InfoValue>
        </InfoColumn>
        <Box sx={{ height: "100%", display: "flex", flexDirection: 'row', alignContent: "center", justifyContent: 'center' }}>

          {(basicUserInfo?.group === 'CLIENT' || status !== 'LIQUIDADO') && (<IconButton
            sx={{ alignSelf: "center" }}
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
          <IconButton
            sx={{ alignSelf: "center" }}
            disabled={isMenuDisabled()}
            onClick={handleClick}
          >
            <MoreHorizIcon
              sx={{
                fontSize: "30px",
                color: isMenuDisabled() ? theme.COLORS.GRAY4 : theme.COLORS.BLUE2,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <DefaultModal
        title={
          modalType === "DATE"
            ? "Alterar data de vencimento"
            : modalType === "DISCOUNT"
              ? "Descontar boleto"
              : "Baixar o boleto"
        }
        isOpen={modal}
        onOpen={onOpen}
        onClose={onClose}
      >
        {body}
      </DefaultModal>
      <DefaultMenu
        anchor={anchorEl}
        menuItems={items}
        onClose={handleCloseMenu}
        status={open}
      />
      <DefaultDialog
        title="Baixar boleto?"
        isOpen={dialog}
        onCloseAction={onCloseDialog}
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default BoletoInfo;
