import SearchFilters from "app/components/searchFilter/searchFilter";
import ClientRequest from "app/components/clientRequest/clientRequest";
import { FindList, FindListPagination, StyledContainer } from "app/components/searchFilter/styles";
import { PageContentContainer } from "app/components/styles";
import DataTablePagination from "app/components/table/pagination/pagination";
import { useState } from "react";
import { ContentBody } from "../sellerList/styles";
import { Divider } from "@mui/material";

const SearchRequests = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detail, setDetail] = useState(false);
  const [page, setPage] = useState(0);
  let count = 0;

  function handleDetail(action: "open" | "close") {
    action === "open" ? setDetail(true) : setDetail(false);
  }

  return (
    <PageContentContainer>
      <SearchFilters />
      <ContentBody>
        <FindList>
          <StyledContainer container>
            {[...Array(22)].map((_, index) => (
              <ClientRequest key={index} handleDetail={handleDetail} />
            ))}
          </StyledContainer>
        </FindList>
        <FindListPagination>
          <Divider />
          <DataTablePagination
            setPage={setPage}
            page={page}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            count={count}
          />
        </FindListPagination>
      </ContentBody>
    </PageContentContainer>
  );
};

export default SearchRequests;   
