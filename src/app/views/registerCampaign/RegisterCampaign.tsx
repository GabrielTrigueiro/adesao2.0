import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  InfoCard,
  InfoCardContainer,
  InfoCardTitle,
} from "../../components/styles";
import GenericTextField from "../../components/genericTextField/GenericTextField";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./style";
import { useEffect, useState } from "react";
import { TCampaignRequest } from "core/models/campaign";
import { CampaignService } from "core/api/campaign/campaignServie";
import { useAppSelector } from "core/hooks/reduxHooks";
import { TRole, verifyRole } from "core/utils/roles";

const RegisterCampaign = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [campaignInfos, setCampaignInfos] = useState<TCampaignRequest>({
    message: "",
    name: "",
  });
  const acceptRoles: TRole[] = [
    "ROLE_ADMIN"];

  useEffect(() => {
    if (!verifyRole(basicUserInfo?.roles, acceptRoles)) {
      navigate(-1);
    }
  }, [basicUserInfo])

  const handleChangeText = (type: keyof TCampaignRequest) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setCampaignInfos({ ...campaignInfos, [type]: event.target.value });
    };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await CampaignService.createCampaign(campaignInfos).then(() => {
      setIsLoading(false);
      setCampaignInfos({ message: "", name: "" });
    }
    ).catch(() => setIsLoading(false));
  };
  if (
    !verifyRole(basicUserInfo?.roles, acceptRoles)
  ) {
    return null;
  }

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar campanha</RegisterPageHeader>
      <RegisterPageContent>
        <Box
          sx={{
            gap: " 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações da campanha
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                name={"nome"}
                label={"Nome"}
                value={campaignInfos.name}
                props={{
                  onChange: handleChangeText("name"),
                }}
              />
              <GenericTextField<string>
                name={"nome"}
                label={"Mensagem"}
                value={campaignInfos.message}
                props={{
                  onChange: handleChangeText("message"),
                  InputProps: { rows: 4 },
                }}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/campanhas")} variant="outlined">
            Voltar
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={
              !campaignInfos.message || !campaignInfos.name || isLoading
            }
          >
            Cadastrar
          </Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  );
};
export default RegisterCampaign;
