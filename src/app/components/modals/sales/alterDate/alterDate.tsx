import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import DefaultDatePicker from "app/components/defaultDatePicker/defaultDatePicker";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { Container } from "./styles";
import { BoletoService } from "core/api/boleto/boletoService";
import { IBoletoActionProps } from "core/models/payment/boleto";

const AlterBoletoDate = (props: IBoletoActionProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [dialog, setDialog] = useState(false);
  const [newDate, setNewDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const onClose = () => {
    setDialog(false);
  };

  const onOpen = () => {
    setDialog(true);
  };

  const handleConfirm = () => {
    if (props.nossoNumero) {
      const formattedDate = formatDate(newDate);
      BoletoService.AlterBoletoDate(formattedDate, props.nossoNumero);
      props.onCloseModal();
      onClose();
      if (props.refetch) {
        props.refetch();
      }
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Typography>Nova data:</Typography>
          <DefaultDatePicker
            date={newDate}
            setDate={setNewDate}
            minDate={today}
          />
        </Box>
        <Button
          sx={{ width: 100 }}
          disabled={!newDate || !props.nossoNumero}
          onClick={onOpen}
        >
          Alterar
        </Button>
      </Container>
      <DefaultDialog
        title="Quer mesmo alterar a data do boleto?"
        isOpen={dialog}
        onCloseAction={onClose}
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default AlterBoletoDate;
