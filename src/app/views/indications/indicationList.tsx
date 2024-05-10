import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import DefaultFilter, {
  ISelectItem,
} from "app/components/filter/defaultFilter";
import Spinner from "app/components/spinner/spinner";
import { PageContentContainer } from "app/components/styles";
import DataTablePagination from "app/components/table/pagination/pagination";
import DataTable from "app/components/table/table/table";
import useIndicationFilterHook from "core/hooks/filters/indicationFilterHook";
import { useAppSelector } from "core/hooks/reduxHooks";
import { ITableHeadCell, Order } from "core/models/table";
import { fetchIndications } from "core/querryes/indication/indicationQuerry";
import { verifyRole } from "core/utils/roles";
import { ContentBody } from "./styles";
import { TIndicationFilter } from "core/models/utils";
import { removeNonNumeric } from "core/utils/globalFunctions";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import theme from "core/theme/theme";
import Search from "app/components/search/Search";

const IndicationList = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useIndicationFilterHook();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("coupon");
  const [filters, setFilters] = useState<TIndicationFilter>({
    coupon: undefined,
    cpforcnpj: undefined,
  });

  const items: ISelectItem[] = [
    { name: "Coupon", value: "coupon", type: "texto" },
    { name: "CPF", value: "cpforcnpj", type: "texto" },
  ];

  const head: ITableHeadCell[] = [
    { name: "id", label: "ID", align: "left" },
    { name: "coupon", label: "Coupon", align: "left" },
    { name: "cpforcnpj", label: "CPF", align: "left" },
    { name: "isActive", label: "Ativo", align: "left" },
  ];

  const { isSuccess, isLoading, data } = useQuery({
    queryKey: ["indications", page, rowsPerPage, orderBy, order, filters],
    staleTime: Infinity,
    queryFn: () =>
      fetchIndications(
        page,
        rowsPerPage,
        orderBy,
        order,
        filters.coupon,
        removeNonNumeric(filters.cpforcnpj)
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

  if (!verifyRole(basicUserInfo?.roles, ["ROLE_ADMIN", "ROLE_INDICATIONS"])) {
    navigate(-1);
  }

  return (
    <PageContentContainer>
      <TableHeader
        filterBtn={true}
        filterBtnAction={() => onOpen()}
        filter={filters}
        remove={removeFilter}
        mainActionLabel="Cadastrar indicação"
        mainActionFunction={() => navigate("/cadastroIndicacao")}
        extraComponents={
          <Search
            searchPlaceHolder="Cpf/cnpj da indicação..."
            querrySearching={isLoading}
            onChange={(e: string) => setFilters((prevState) => ({
              ...prevState,
              cpforcnpj: e,
            }))}
          />
        }
        mainIcon={
          <AddIcon
            sx={{
              fontSize: "20px",
              color: theme.COLORS.BLUE3,
            }}
          />
        }
        mainActionDisabled={
          !verifyRole(basicUserInfo?.roles, [
            "ROLE_ADMIN",
            "ROLE_CRUD_INDICATIONS",
          ])
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
        title="Filtrar indicações"
        onChangeFilter={setFilters}
        items={items}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </PageContentContainer>
  );
};

export default IndicationList;
