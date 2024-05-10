import React, { useState } from "react";
import {
  Button,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";

import { TGenerateLinkBodyRequest } from "core/models/sale/link";
import { Container } from "./styles";
import { fetchIndicationsByCoupon } from "core/querryes/indication/indicationQuerry";
import { useQuery } from "@tanstack/react-query";
import { TIndicationUser } from "core/models/indication";

interface IGenerateLinkProps {
  payload: TGenerateLinkBodyRequest;
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  setPayload: React.Dispatch<React.SetStateAction<TGenerateLinkBodyRequest>>;
  onSubmit: () => void;
  haveIndication?: boolean;
}

function GenerateLink(props: IGenerateLinkProps) {
  const { payload, setPayload, onSubmit, setCoupon } = props;
  const [search, setSearch] = useState("");

  // pegar as indicações para listar
  const { data } = useQuery({
    queryKey: ["indications", search],
    queryFn: () => fetchIndicationsByCoupon(search),
  });

  return (
    <Container>
      <Autocomplete
        sx={{ width: "100%" }}
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        onChange={(event: any, newValue: TIndicationUser | null) => {
          setPayload((prevState) => ({
            ...prevState,
            idIndiction: newValue?.id || "",
          }));
          setCoupon(newValue?.coupon || "");
        }}
        options={data?.content || []}
        getOptionLabel={(option) => option.coupon}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="Coupon" />
        )}
      />
      <Button disabled={!payload.idIndiction} onClick={onSubmit}>
        Gerar link
      </Button>
    </Container>
  );
}

export default GenerateLink;
