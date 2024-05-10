import React, { useState } from "react";
import DefaultModal from "../../defaultModal/defaultModal";
import { TCampaignRequest } from "core/models/campaign";
import { Container } from "./styles";
import { Button, TextField } from "@mui/material";
import { CampaignService } from "core/api/campaign/campaignServie";

interface ICampaignRegisterModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  disabledButton?: boolean;
  isLoading?: boolean;
}

const CampaignRegisterModal = (props: ICampaignRegisterModalProps) => {
  const { isOpen, onClose, onOpen, disabledButton } = props;
  const [campaignInfos, setCampaignInfos] = useState<TCampaignRequest>({
    message: "",
    name: "",
  });

  const handleChangeText = (type: keyof TCampaignRequest) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setCampaignInfos({ ...campaignInfos, [type]: event.target.value });
    };
  };

  const handleSubmit = async () => {
    await CampaignService.createCampaign(campaignInfos).then((resp) => {
      onClose();
    });
  };

  let registerCampaignBody = (
    <Container>
      <TextField
        label="Nome"
        placeholder="nome da camanpanha..."
        onChange={handleChangeText("name")}
      />
      <TextField
        label="Mensagem"
        placeholder="escreva uma mensagem..."
        multiline
        rows={4}
        onChange={handleChangeText("message")}
      />
      <Button
        onClick={() => handleSubmit()}
        disabled={
          !campaignInfos.message || !campaignInfos.name || disabledButton
        }
      >
        Criar
      </Button>
    </Container>
  );

  return (
    <DefaultModal
      title="Criar campanha"
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      children={registerCampaignBody}
    />
  );
};

export default CampaignRegisterModal;
