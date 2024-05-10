import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

import Spinner from "app/components/spinner/spinner";
import { StyledDivDataTable } from "app/components/table/tableHead/styles";
import { formatCurrencyBR, formatDateBr } from "core/utils/globalFunctions";
import { SalesCell, SalesTypography } from "../sales/styles";
import {
  TBoletoActions,
  TBoletoBodyResponse,
} from "core/models/payment/boleto";
import DefaultModal from "app/components/modals/defaultModal/defaultModal";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { BoletoService } from "core/api/boleto/boletoService";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import { IPage } from "core/models/utils";
import AlterBoletoDate from "app/components/modals/sales/alterDate/alterDate";
import DiscountBoleto from "app/components/modals/sales/discount/discount";

interface IFinancialTableProps {
  loading: boolean;
  data: any;

  reRender: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IPage<any> | undefined, Error>>;
}

const FinancialTable = (props: IFinancialTableProps) => {
  const { loading, data, reRender } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalType, setModalType] = useState<TBoletoActions>();
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
    setModal(false);
  };

  const onOpen = () => {
    setModal(true);
  };

  const onCloseDialog = () => {
    setDialog(false);
  };

  const onOpenDialog = () => {
    setDialog(true);
    handleCloseMenu();
  };

  const handleConfirm = async () => {
    if (data.nossoNumero) {
      await BoletoService.DownBoleto(String(data.nossoNumero));
      reRender(data);
      onCloseDialog();
      onClose();
    }
  };

  const handleMenuItem = (actionType: TBoletoActions) => {
    setModalType(actionType);
    onOpen();
    handleCloseMenu();
  };

  const items: IMenuItemProps[] = [
    { function: () => handleMenuItem("DATE"), label: "Alterar data" },
    { function: () => handleMenuItem("DISCOUNT"), label: "Descontar" },
    { function: () => onOpenDialog(), label: "Baixar" },
  ];

  let body;

  switch (modalType) {
    case "DATE":
      body = (
        <AlterBoletoDate
          onCloseModal={onClose}
          nossoNumero={String(data.nossoNumero)}
        />
      );
      break;
    case "DISCOUNT":
      body = (
        <DiscountBoleto
          onCloseModal={onClose}
          nossoNumero={String(data.nossoNumero)}
        />
      );
      break;
  }

  return (
    <>
      {loading ? (
        <Box sx={{ position: "relative", height: 500 }}>
          <Spinner
            state={loading}
            size={10}
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </Box>
      ) : (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledDivDataTable>Tipo</StyledDivDataTable>
              <StyledDivDataTable>Nosso Número</StyledDivDataTable>
              <StyledDivDataTable>D. Cadastro</StyledDivDataTable>
              <StyledDivDataTable>D. Vencimento</StyledDivDataTable>
              <StyledDivDataTable>D. Pagamento</StyledDivDataTable>
              <StyledDivDataTable>Status</StyledDivDataTable>
              <StyledDivDataTable>Valor</StyledDivDataTable>
              <StyledDivDataTable align="center">Opções</StyledDivDataTable>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <SalesCell >
                  <SalesTypography>{row.type}</SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>{row.nossoNumero}</SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    {formatDateBr(row.issuancedate)}
                  </SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>{formatDateBr(row.dueDate)}</SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    {formatDateBr(row.paymentDate)}
                  </SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>{row.status}</SalesTypography>
                </SalesCell>

                <SalesCell component="th" scope="row" size="small">
                  <SalesTypography>
                    {formatCurrencyBR(row.value)}
                  </SalesTypography>
                </SalesCell>

                {row.type === "BOLETO" ? (
                  <SalesCell
                    align="center"
                    component="th"
                    scope="row"
                    size="small"
                  >
                    <Tooltip title="Opções">
                      <IconButton onClick={handleMenuClick}>
                        <MoreHorizIcon
                          sx={{
                            fontSize: "30px",
                            color: (theme) => theme.palette.primary.main,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </SalesCell>
                ) : <SalesCell></SalesCell>}
              </TableRow>
            ))}
          </TableBody>
          <DefaultMenu
            status={open}
            anchor={anchorEl}
            menuItems={items}
            onClose={handleCloseMenu}
          />
        </Table>
      )}
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
      <DefaultDialog
        title="Baixar boleto?"
        isOpen={dialog}
        onCloseAction={onCloseDialog}
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default FinancialTable;
