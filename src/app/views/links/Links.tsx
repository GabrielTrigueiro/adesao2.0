import useGenerateIndicationLinkHook from 'core/hooks/generateLinkHook';
import { useCallback, useState } from 'react';

import DefaultModal from 'app/components/modals/defaultModal/defaultModal';
import { PageContentContainer } from 'app/components/styles';
import { TGenerateLinkBodyRequest } from 'core/models/sale/link';
import { SellerService } from 'core/api/seller/sellerService';
import useUrlGeneratedHook from 'core/hooks/dashboard/urlHook';
import { Box, Button, Divider, IconButton, Typography, useMediaQuery } from '@mui/material';
import { BoxLink, GenerateLinkContent, LinkText, TitleLink } from './styles';
import theme from "core/theme/theme";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LINK_VENDA_CURSO, LINK_VENDA_LIMPA_NOME } from 'core/utils/constants';
import copy from "clipboard-copy";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLinks } from 'core/querryes/dashboard/getLinksQuerry';
import { LinkBox } from './copyLink/styles';
import GenerateLink from './generateLink/generateLink';
import CopyLink from './copyLink/copyLink';
import { useAppSelector } from 'core/hooks/reduxHooks';
import { TRole, verifyRole } from 'core/utils/roles';
import PositivoTheme from 'theme';

type TSaleType = "consultoria" | "limpaNome";

const Links = () => {
  const isMobile = useMediaQuery(PositivoTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const { isOpen, onClose, onOpen } = useGenerateIndicationLinkHook();
  const [linkRequest, setLinkRequest] = useState<TGenerateLinkBodyRequest>({
    idIndiction: "",
    numero: 1,
  });
  const { setTempUrl } = useUrlGeneratedHook();
  const [couponName, setCouponName] = useState("");
  const [indicationLink, setIndicationLink] = useState("");
  const [typeLink, setTypeLink] = useState("");
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN",
    "ROLE_SELLER",
    "ROLE_CRUD_SELLER",];
  const notAcceptGroup: string = "INDICATION";

  const handleCopyClick = (type: TSaleType, param?: string) => {
    if (type === "limpaNome") return copy(LINK_VENDA_LIMPA_NOME + param);
    else return copy(LINK_VENDA_CURSO + param);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    staleTime: Infinity,
    queryFn: () => fetchLinks(),
  });

  // gerar os links com base na indicação e salva em estado a resposta
  const handleGenerateLink = useCallback(async () => {
    await SellerService.generateLink(linkRequest).then((resp) => {
      setIndicationLink(resp.data);
      setTempUrl(resp.data);
    });
  }, [linkRequest, setTempUrl]);

  if (
    !verifyRole(basicUserInfo?.roles, acceptRoles) ||
    basicUserInfo?.group === notAcceptGroup
  ) {
    navigate(-1);
    return null;
  }

  return (
    <PageContentContainer>
      <BoxLink mobile={isMobile}>
        <GenerateLinkContent mobile={isMobile}>
          <TitleLink>Limpa Nome</TitleLink>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ color: theme.COLORS.BLUE3 }}>Link sem Indicação :</Typography>
            <LinkBox>
              <Link target="_blank" to={`/limpanome/` + data?.data.CAMPANHA26022024}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LinkText> {LINK_VENDA_LIMPA_NOME}</LinkText>
                </Box>
              </Link>
              <IconButton disabled={isLoading} onClick={() => handleCopyClick("limpaNome", data?.data.CAMPANHA26022024)} sx={{ marginLeft: "7px" }}>
                <ContentCopyIcon color="primary" />
              </IconButton>
            </LinkBox>
          </Box>
        </GenerateLinkContent>
        <Divider color={theme.COLORS.GRAY5} flexItem orientation={isMobile ? "horizontal" : "vertical"}></Divider>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center" }}>
          <Typography sx={{ color: theme.COLORS.BLUE3 }}>Link com indicação</Typography>
          <Button onClick={() => { onOpen(); setTypeLink("limpaNome") }}>GERAR LINK</Button>
        </Box>
      </BoxLink>
      <BoxLink mobile={isMobile}>
        <GenerateLinkContent mobile={isMobile}>
          <TitleLink>Consultoria</TitleLink>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ color: theme.COLORS.BLUE3 }}>Link sem Indicação :</Typography>
            <LinkBox>
              <Link target="_blank" to={`/consultoria/` + data?.data.CAMPANHA26022024}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LinkText> {LINK_VENDA_CURSO}</LinkText>
                </Box>
              </Link>
              <IconButton disabled={isLoading} onClick={() => handleCopyClick("consultoria", data?.data.CAMPANHA26022024)} sx={{ marginLeft: "7px" }}>
                <ContentCopyIcon color="primary" />
              </IconButton>
            </LinkBox>
          </Box>
        </GenerateLinkContent>
        <Divider color={theme.COLORS.GRAY5} flexItem orientation={isMobile ? "horizontal" : "vertical"}></Divider>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center" }}>
          <Typography sx={{ color: theme.COLORS.BLUE3 }}>Link com indicação</Typography>
          <Button onClick={() => { onOpen(); setTypeLink("consultoria") }}>GERAR LINK</Button>
        </Box>
      </BoxLink>

      <DefaultModal
        title="Link por indicação"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={() => onClose()}
      >
        {indicationLink === "" ? (
          <GenerateLink
            payload={linkRequest}
            setPayload={setLinkRequest}
            onSubmit={() => handleGenerateLink()}
            setCoupon={setCouponName}
          />
        ) : (
          <CopyLink
            type={typeLink}
            setCoupon={setCouponName}
            coupon={couponName}
            links={indicationLink}
            setLinks={setIndicationLink}
            setIndication={setLinkRequest}
          />
        )}
      </DefaultModal>
    </PageContentContainer>
  )
}

export default Links