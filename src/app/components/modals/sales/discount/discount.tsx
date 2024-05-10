import CurrencyTextField from "app/components/currencyInput/currencyInput";
import { useState } from "react";
import { Container } from "./styles";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import { BoletoService } from "core/api/boleto/boletoService";
import { Button } from "@mui/material";
import { IBoletoActionProps } from "core/models/payment/boleto";

const DiscountBoleto = (props: IBoletoActionProps) => {
  const [amount, setAmount] = useState<string>();
  const [dialog, setDialog] = useState(false);

  const onClose = () => {
    setDialog(false);
  };

  const onOpen = () => {
    setDialog(true);
  };

  const handleConfirm = () => {
    if (props.nossoNumero) {
      const value = parseFloat(amount || "0");
      BoletoService.DiscountBoleto(value, props.nossoNumero);
      props.onCloseModal();
      onClose();
      if (props.refetch) {
        props.refetch();
      }
    }
  };

  return (
    <Container>
      <CurrencyTextField
        amount={amount}
        label="Desconto"
        stateFunction={setAmount}
        size="small"
      />
      <Button
        sx={{ width: 100 }}
        disabled={!amount || !props.nossoNumero}
        onClick={onOpen}
      >
        Descontar
      </Button>
      <DefaultDialog
        title="Confirmar desconto?"
        isOpen={dialog}
        onCloseAction={onClose}
        confirmAction={handleConfirm}
      />
    </Container>
  );
};

export default DiscountBoleto;
