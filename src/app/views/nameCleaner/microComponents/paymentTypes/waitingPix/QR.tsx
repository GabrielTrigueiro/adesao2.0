import React, { useEffect, useState } from "react";
import { Typography, Paper, Button, Grid } from "@mui/material";
import QRCode from "react-qr-code";
import copy from "clipboard-copy";
import { QRCodeBox } from "../../../style";
import { TPixBodyResponse } from "core/models/payment/pix";
import { axiosInstance } from "core/api/axios/axiosInstance";
import { SALE } from "core/utils/constants";
import { Notification } from "app/components/toastNotification/toastNotification";

const QR = (paymentInfo: TPixBodyResponse) => {
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(10); 


  const handleCopyClick = async () => {
    try {
      setIsClicked(true);
      await copy(paymentInfo.brcode);
      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    } catch (err) {
      console.error("Erro ao copiar o texto:", err);
    }
  };


  const checkPaymentStatus = () => {
    axiosInstance.get(SALE + "/pix/" + paymentInfo.id).then((resp) => {
      if (resp.data.data.isPayment === true) {
        Notification("Pagamento concluído", "success");
        window.location.pathname = "/login";
      } else {
        Notification("Aguardando pagamento", "warning");
      }
    });
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
      if (counter === 0) {
        checkPaymentStatus(); 
        setCounter(10); 
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [counter]); 

  return (
    <QRCodeBox>
      <Grid container justifyContent="center">
        <Grid item>
          <QRCode value={paymentInfo.brcode} />
        </Grid>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography fontWeight="bold">
              O acesso à plataforma será concedido após o pagamento.
            </Typography>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                height: 100,
                maxWidth: 300,
                overflowWrap: "break-word",
                overflowY: "scroll",
                padding: 1,
                border: "2px solid #000",
              }}
            >
              {paymentInfo.brcode}
            </Paper>
          </Grid>
          <Grid item>
            <Button
              sx={{
                color: isClicked 
                  ? "#17B169" 
                  : (theme) => theme.palette.secondary.main,
                borderColor: isClicked
                  ? "#17B169"
                  : (theme) => theme.palette.secondary.main,
                transition: "ease-in",
              }}
              onClick={handleCopyClick}
              variant="outlined"
            >
              {isClicked ? "Pix copiado" : "Copiar pix"}
            </Button>
          </Grid>
          <Grid item>
            <Typography fontWeight="bold" margin="4px">
            Próxima checagem de pagamento em {counter} segundos
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </QRCodeBox>
  );
};

export default QR;
