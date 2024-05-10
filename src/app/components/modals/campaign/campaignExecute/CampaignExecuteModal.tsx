import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Paper, Typography } from "@mui/material";

import DefaultModal from "../../defaultModal/defaultModal";
import { Container } from "./styles";
import { CampaignService } from "core/api/campaign/campaignServie";
import { Notification } from "app/components/toastNotification/toastNotification";

interface ICampaignExecuteProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  disabledButton?: boolean;
  isLoading?: boolean;
  id: number;
  refresh: any;
}

const CampaignExecuteModal = (props: ICampaignExecuteProps) => {
  const { isOpen, onClose, onOpen } = props;
  
  const [file, setFile] = useState<File | null>(null);
  const [timeOut, setTimeOut] = useState<boolean>(false);

  const fileReader = new FileReader();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  function handleCloseExec() {
    setFile(null);
    onClose();
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    
    if (file) {
      setTimeOut(true);
      fileReader.onload = function (event) {
        const csvOutput = event.target?.result as string;
        const base64Index = csvOutput.indexOf("base64,") + 7;
        const base64String = csvOutput.substring(base64Index);
        CampaignService.execCampaign(props.id, { csv: base64String }).then(
          () => {
            props.refresh();
            handleCloseExec();
          }
        );
      };
      fileReader.readAsDataURL(file);
      Notification("Campanha em execução", "warning");
      setTimeout(() => {
        setTimeOut(false);
      }, 30000);
    }
  };

  return (
    <DefaultModal
      title="Executar campanha"
      isOpen={isOpen}
      onClose={() => handleCloseExec()}
      onOpen={onOpen}
      children={
        <Container>
          <>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Encontrar csv
              <input
                style={{ display: "none" }}
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
              />
            </Button>
            {file && (
              <Paper
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <Typography
                  sx={{
                    maxWidth: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  fontSize={15}
                  fontWeight={"bold"}
                  color={"#212121"}
                >
                  {file.name}
                </Typography>
                <IconButton onClick={() => setFile(null)}>
                  <CloseIcon />
                </IconButton>
              </Paper>
            )}
            <Button
              component="label"
              variant="contained"
              onClick={(event) => handleOnSubmit(event)}
              disabled={!file || timeOut}

            >
              Enviar
            </Button>
          </>
        </Container>
      }
    />
  );
};

export default CampaignExecuteModal;
