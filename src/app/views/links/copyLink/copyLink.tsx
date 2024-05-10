import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, IconButton, Button, Box } from "@mui/material";
import copy from "clipboard-copy";

import { LINK_VENDA_CURSO, LINK_VENDA_LIMPA_NOME } from "core/utils/constants";
import { ModalBox, LinkBox, LinkText } from "./styles";
import { Dispatch, SetStateAction } from "react";

import { TGenerateLinkBodyRequest } from "core/models/sale/link";

interface ICopyLinkProps {
  links: string;
  coupon?: string;
  setLinks: Dispatch<SetStateAction<string>>;
  setCoupon: (coupon: string) => void;
  setIndication?: Dispatch<SetStateAction<TGenerateLinkBodyRequest>>;
  type?: string;
}

type TSaleType = "consultoria" | "limpaNome";

function CopyLink(props: Readonly<ICopyLinkProps>) {
  const { coupon, setLinks, links, setCoupon, setIndication, type } = props;

  function clearInfos() {
    setLinks("");
    setCoupon("");
    setIndication && setIndication({ idIndiction: "", numero: 1 });
  }

  const handleCopyClick = async (paramLink: string, type: TSaleType) => {
    if (type === "limpaNome") return copy(LINK_VENDA_LIMPA_NOME + paramLink);
    else return copy(LINK_VENDA_CURSO + paramLink);
  };

  return (
    <ModalBox>
      <Typography textAlign={"center"}>Coupon utilizado</Typography>
      <Typography textAlign={"center"} fontWeight={"bold"}>
        {coupon}
      </Typography>
      {type === "limpaNome" && (
        <LinkBox>
          <Link target="_blank" to={`/limpanome/${links}`}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography fontSize={14} fontWeight={"bold"} width={100}>
                Limpa nome:
              </Typography>
              <LinkText> {LINK_VENDA_LIMPA_NOME + links}</LinkText>
            </Box>
          </Link>
          <IconButton onClick={() => handleCopyClick(links, "limpaNome")}>
            <ContentCopyIcon />
          </IconButton>
        </LinkBox>
      )}
      {type === "consultoria" && (
        <LinkBox>
          <Link target="_blank" to={`/consultoria/${links}`}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography fontSize={14} fontWeight={"bold"} width={100}>
                Consultoria:
              </Typography>
              <LinkText>{LINK_VENDA_CURSO + links}</LinkText>
            </Box>
          </Link>
          <IconButton onClick={() => handleCopyClick(links, "consultoria")}>
            <ContentCopyIcon />
          </IconButton>
        </LinkBox>
      )}
      <Button onClick={() => clearInfos()}>Gerar outro link</Button>
    </ModalBox>
  );
}

export default CopyLink;
