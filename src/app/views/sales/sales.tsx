import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import PixIcon from "@mui/icons-material/Pix";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import BoletoSvg from "images/assets/boletoSvg.svg";
import { PageContentContainer } from "app/components/styles";
import DefaultModal from "app/components/modals/defaultModal/defaultModal";
import Spinner from "app/components/spinner/spinner";
import DataTablePagination from "app/components/table/pagination/pagination";
import { StyledDivDataTable } from "app/components/table/tableHead/styles";
import useSaleInfoHook from "core/hooks/sales/saleInfoHook";
import { TSaleBody, TSaleFilterRequest } from "core/models/sale";
import { Order } from "core/models/table";
import {
  downloadCSVFromBase64,
  formatDateBr,
  formatDocument,
  formatPhoneNumber,
  removeNonNumeric,
} from "core/utils/globalFunctions";
import SalesInfo from "../../components/modals/sales/salesInfo/salesInfo";
import { ContentBody } from "../sellerList/styles";
import { SalesCell, SalesTypography } from "./styles";
import DefaultFilter, {
  ISelectItem,
} from "app/components/filter/defaultFilter";
import { fetchSales } from "core/querryes/sale/getSaleQuerry";
import { SaleService } from "core/api/sale/saleService";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { TRole, verifyRole } from "core/utils/roles";
import { useAppSelector } from "core/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";
import Search from "app/components/search/Search";

function Sales() {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const { isOpen, onClose, onOpen } = useSaleInfoHook();
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [tempSale, setTempSale] = useState<TSaleBody>();
  const [filterModal, setFilterModal] = useState(false);
  const [dowloadDialog, setDowloadDialog] = useState(false);
  const [saleFilter, setSaleFilter] = useState<TSaleFilterRequest>({
    status: undefined,
    cameThrough: undefined,
    typePayment: undefined,
    sellerCpfOrCnpj: undefined,
    clientCpforCnpj: undefined,
    indicationCpforCnpj: undefined,
    createDate: undefined,
    sellerId: undefined,
  });
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",
    "ROLE_SELLER",
    "ROLE_INDICATIONS",
    "ROLE_CRUD_SELLER",
    "ROLE_CRUD_INDICATIONS",];
  const notAcceptGroup: string = "CLIENT";

  const items: ISelectItem[] = [
    { name: "Status", value: "status", type: "status" },
    { name: "Veio por", value: "cameThrough", type: "texto" },
    { name: "Pagamento", value: "typePayment", type: "type" },
    { name: "Cpf vendedor", value: "sellerCpfOrCnpj", type: "texto" },
    { name: "Cpf cliente", value: "clientCpforCnpj", type: "texto" },
    { name: "Cpf indicação", value: "indicationCpforCnpj", type: "texto" },
  ];

  const { isSuccess, isLoading, data, refetch } = useQuery({
    queryKey: ["sales", page, rowsPerPage, orderBy, order, saleFilter],
    staleTime: Infinity,
    queryFn: () =>
      fetchSales(
        page,
        rowsPerPage,
        orderBy,
        order,
        saleFilter.status,
        saleFilter.cameThrough,
        saleFilter.typePayment,
        removeNonNumeric(saleFilter.sellerCpfOrCnpj),
        removeNonNumeric(saleFilter.clientCpforCnpj),
        removeNonNumeric(saleFilter.indicationCpforCnpj),
        saleFilter.createDate,
        saleFilter.sellerId
      ),
  });

  const dowloadTabletWithFilters = useCallback(() => {
    const payload: TSaleFilterRequest = {
      status: saleFilter.status,
      cameThrough: saleFilter.cameThrough,
      typePayment: saleFilter.typePayment,
      sellerCpfOrCnpj: saleFilter.sellerCpfOrCnpj,
      clientCpforCnpj: saleFilter.clientCpforCnpj,
      indicationCpforCnpj: saleFilter.indicationCpforCnpj,
      createDate: saleFilter.createDate,
      sellerId: saleFilter.sellerId,
    };
    SaleService.getSaleCsv(payload).then((response) => {
      downloadCSVFromBase64(response, "tabelaFiltrada");
    });
  }, [saleFilter]);

  const removeFilter = (attribute: string) => {
    setSaleFilter((prevState) => ({
      ...prevState,
      [attribute]: undefined,
    }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      setCount(data.totalElements);
    }
  }, [isSuccess, data]);

  const handleOpenSaleInfo = (obj: TSaleBody) => {
    setTempSale(obj);
    onOpen();
  };

  function maxStatusSize(name: string, maxLength: number): string {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  }

  const handleConfirmDowload = () => {
    setDowloadDialog(false);
    dowloadTabletWithFilters();
  };

  if (
    !verifyRole(basicUserInfo?.roles, [
      "ROLE_ADMIN",
      "ROLE_SELLER",
      "ROLE_CRUD_SELLER",
    ])
  ) {
    navigate(-1);
  }

  useEffect(() => {
    if (tempSale) {
      setTempSale(data?.content.find((sale) => sale.id === tempSale.id));
    }
  }, [isSuccess, data, tempSale]);

  return (
    <PageContentContainer>
      <TableHeader
        mainActionLabel="Baixar tabela"
        mainActionFunction={() => setDowloadDialog(true)}
        mainIcon={
          <FileDownloadIcon
            sx={{
              fontSize: "20px",
              color: theme.COLORS.BLUE3,
            }}
          />
        }
        filterBtn
        filterBtnAction={() => setFilterModal(true)}
        filter={saleFilter}
        remove={removeFilter}
        extraComponents={
          <Search
            searchPlaceHolder="Cpf/cnpj do cliente..."
            querrySearching={isLoading}
            onChange={(e: string) => setSaleFilter((prevState) => ({
              ...prevState,
              clientCpforCnpj: e,
            }))}
          />
        }
      />
      <ContentBody>
        {isLoading ? (
          <Box sx={{ position: "relative", height: 500 }}>
            <Spinner
              state={isLoading}
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
                <StyledDivDataTable></StyledDivDataTable>
                <StyledDivDataTable align="center">Produto</StyledDivDataTable>
                <StyledDivDataTable>Cliente</StyledDivDataTable>
                <StyledDivDataTable>Vendedor</StyledDivDataTable>
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable>Indicação</StyledDivDataTable>
                )}
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable>Status</StyledDivDataTable>
                )}
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable>Parcelas</StyledDivDataTable>
                )}
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable>Criado em</StyledDivDataTable>
                )}
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable>Veio por</StyledDivDataTable>
                )}
                {basicUserInfo?.group !== "INDICATION" && (
                  <StyledDivDataTable align="center">Opções</StyledDivDataTable>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.content.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <SalesCell
                    align="center"
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {row.typePayment === "BOLETO" ? (
                      <img alt="boleto" src={BoletoSvg} height={"20px"}></img>
                    ) : (
                      <PixIcon style={{ fontSize: 30 }} />
                    )}
                  </SalesCell>
                  <SalesCell
                    align="center"
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {row.typeSales === "CONSULTORIA" ? (
                      <Typography fontWeight={"bold"}>C</Typography>
                    ) : (
                      <Typography fontWeight={"bold"}>LP</Typography>
                    )}
                  </SalesCell>
                  <SalesCell component="th" scope="row" size="small">
                    <Tooltip title={row.client.name}>
                      <SalesTypography fontWeight={"bold"}>
                        {maxStatusSize(row.client.name, 23)}
                      </SalesTypography>
                    </Tooltip>
                    {basicUserInfo?.group !== "INDICATION" && (
                      <>
                        <SalesTypography>
                          {formatDocument(row.client.cpforcnpj)}
                        </SalesTypography>
                        <SalesTypography>
                          {formatPhoneNumber(row.client.telephone)}
                        </SalesTypography>
                      </>
                    )}
                  </SalesCell>

                  <SalesCell component="th" scope="row" size="small">
                    <SalesTypography fontWeight={"bold"}>
                      {row.seller.name}
                    </SalesTypography>
                    {basicUserInfo?.group !== "INDICATION" && (
                      <>
                        <SalesTypography>
                          {formatDocument(row.seller.cpforcnpj)}
                        </SalesTypography>
                        <SalesTypography>{row.seller.email}</SalesTypography>
                      </>
                    )}
                  </SalesCell>

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell component="th" scope="row" size="small">
                      <SalesTypography>
                        {row.indication?.coupon || <i>"Nenhuma"</i>}
                      </SalesTypography>
                      {basicUserInfo?.group !== "INDICATION" &&
                        row.indication?.login && (
                          <SalesTypography>
                            {formatDocument(row.indication.login)}
                          </SalesTypography>
                        )}
                    </SalesCell>
                  )}

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell component="th" scope="row" size="small">
                      <SalesTypography>{row.status}</SalesTypography>
                    </SalesCell>
                  )}

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell component="th" scope="row" size="small">
                      <SalesTypography>{row.installments}</SalesTypography>
                    </SalesCell>
                  )}

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell component="th" scope="row" size="small">
                      <SalesTypography>
                        {formatDateBr(row.createdAt)}
                      </SalesTypography>
                    </SalesCell>
                  )}

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell component="th" scope="row" size="small">
                      <Tooltip title={row.cameThrough}>
                        <SalesTypography>
                          {maxStatusSize(row.cameThrough, 21)}
                        </SalesTypography>
                      </Tooltip>
                    </SalesCell>
                  )}

                  {basicUserInfo?.group !== "INDICATION" && (
                    <SalesCell
                      align="center"
                      component="th"
                      scope="row"
                      size="small"
                    >
                      <Tooltip title="Detalhes">
                        <IconButton onClick={() => handleOpenSaleInfo(row)}>
                          <VisibilityIcon
                            style={{ color: theme.COLORS.BLACK }}
                          />
                        </IconButton>
                      </Tooltip>
                    </SalesCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <DataTablePagination
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          count={count}
        />
      </ContentBody>
      <DefaultFilter
        isOpen={filterModal}
        items={items}
        onChangeFilter={setSaleFilter}
        onClose={() => setFilterModal(false)}
        onOpen={() => setFilterModal(true)}
        title="Filtrar vendas"
        changePage={setPage}
      />
      <DefaultModal
        title=""
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        children={
          <SalesInfo reRender={refetch} sales={tempSale as TSaleBody} />
        }
      />
      <DefaultDialog
        title="Baixar tabela?"
        isOpen={dowloadDialog}
        confirmAction={handleConfirmDowload}
        onCloseAction={() => setDowloadDialog(false)}
      />
    </PageContentContainer>
  );
}

export default Sales;
