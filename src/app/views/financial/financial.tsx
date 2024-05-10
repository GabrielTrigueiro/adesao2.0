import { useQuery } from "@tanstack/react-query";
import DefaultFilter, {
  ISelectItem,
} from "app/components/filter/defaultFilter";
import { PageContentContainer } from "app/components/styles";
import useFinancialFilterHook from "core/hooks/filters/financialHook";
import { TFinancialFilterRequest } from "core/models/financial";
import { Order } from "core/models/table";
import { fetchFinancial } from "core/querryes/financial/financialQuerry";
import { useEffect, useState } from "react";
import { ContentBody } from "../sellerList/styles";
import FinancialTable from "./financialTable";
import DataTablePagination from "app/components/table/pagination/pagination";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";
import { TRole, verifyRole } from "core/utils/roles";

const Financial = () => {
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const { isOpen, onClose, onOpen } = useFinancialFilterHook();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [filters, setFilters] = useState<TFinancialFilterRequest>({
    type: undefined,
  });
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",];
  const notAcceptGroup: string = "CLIENT";

  const items: ISelectItem[] = [{ name: "Tipo", value: "type", type: "type" }];

  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["users", page, rowsPerPage, orderBy, order, filters],
    staleTime: Infinity,
    queryFn: () =>
      fetchFinancial(page, rowsPerPage, orderBy, order, filters.type),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCount(data.totalElements);
    }
  }, [isSuccess, data]);

  const removeFilter = (attribute: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [attribute]: undefined,
    }));
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
      <TableHeader
        filter={filters}
        filterBtn={true}
        filterBtnAction={() => onOpen()}
        remove={removeFilter}
      />
      <ContentBody>
        <FinancialTable data={data} loading={isLoading} reRender={refetch} />
        <DataTablePagination
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          count={count}
        />
      </ContentBody>
      <DefaultFilter
        isOpen={isOpen}
        items={items}
        onChangeFilter={setFilters}
        onClose={onClose}
        onOpen={onOpen}
        title="Filtrar transações"
      />
    </PageContentContainer>
  );
};

export default Financial;
