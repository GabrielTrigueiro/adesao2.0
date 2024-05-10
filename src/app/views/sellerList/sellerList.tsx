import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import Spinner from "app/components/spinner/spinner";
import { fetchSellers } from "core/querryes/seller/getSellerQuerry";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFilterHook from "../../../core/hooks/filters/filterHook";
import { ITableHeadCell, Order } from "../../../core/models/table";
import { TSellerFilterRequest } from "../../../core/models/seller";
import { PageContentContainer } from "../../components/styles";
import DataTablePagination from "../../components/table/pagination/pagination";
import DataTable from "../../components/table/table/table";
import { ContentBody } from "./styles";
import { useAppSelector } from "core/hooks/reduxHooks";
import { TRole, verifyRole } from "core/utils/roles";
import DefaultFilter, {
  ISelectItem,
} from "app/components/filter/defaultFilter";
import { removeNonNumeric } from "core/utils/globalFunctions";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";
import Search from "app/components/search/Search";

const SellerList = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useFilterHook();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filters, setFilters] = useState<TSellerFilterRequest>({
    cpforcnpj: undefined,
    groupname: undefined,
    name: undefined,
  });
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN", "ROLE_CRUD_SELLER",];
  const notAcceptGroup: string = "CLIENT";

  const items: ISelectItem[] = [
    { name: "Cpf/Cnpj", value: "cpforcnpj", type: "texto" },
    { name: "Nome", value: "name", type: "texto" },
    { name: "Grupo", value: "groupname", type: "texto" },
  ];

  const head: ITableHeadCell[] = [
    { name: "id", label: "ID", align: "left" },
    { name: "name", label: "Nome", align: "left" },
    { name: "cpforcnpj", label: "CPF", align: "left" },
    { name: "email", label: "Email", align: "left" },
    { name: "createdAt", label: "Data de criação", align: "left", date: true },
    { name: "isActive", label: "Ativo", align: "left" },
  ];

  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ["users", page, rowsPerPage, orderBy, order, filters],
    queryFn: () =>
      fetchSellers(
        page,
        rowsPerPage,
        orderBy,
        order,
        removeNonNumeric(filters.cpforcnpj),
        filters.groupname,
        filters.name
      ),
  });

  const removeFilter = (attribute: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [attribute]: undefined,
    }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      setCount(data.totalElements);
    }
  }, [isSuccess, data]);

  if (!verifyRole(basicUserInfo?.roles, ["ROLE_ADMIN", "ROLE_CRUD_SELLER"])) {
    navigate(-1);
  }

  return (
    <PageContentContainer>
      <TableHeader
        filterBtn={true}
        filterBtnAction={() => onOpen()}
        filter={filters}
        remove={removeFilter}
        extraComponents={
          <Search
            searchPlaceHolder="Cpf/cnpj do vendedor..."
            querrySearching={isLoading}
            onChange={(e: string) => setFilters((prevState) => ({
              ...prevState,
              cpforcnpj: e,
            }))}
          />
        }
        mainActionLabel="Cadastrar vendedor"
        mainActionFunction={() => navigate("/cadastroVendedor")}
        mainIcon={
          <AddIcon
            sx={{
              fontSize: "20px",
              color: theme.COLORS.BLUE3,
            }}
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
          <DataTable
            head={head}
            data={data?.content}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
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
        title="Filtrar vendedores"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        items={items}
        onChangeFilter={setFilters}
        changePage={setPage}
      />
    </PageContentContainer>
  );
};

export default SellerList;
