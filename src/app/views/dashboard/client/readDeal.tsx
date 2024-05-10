import handleDeal from "app/views/nameCleaner/microComponents/contract/deal";
import { useAppSelector } from "core/hooks/reduxHooks";

interface IReadDeal {
  installments: number;
}

const ReadDeal = (props: IReadDeal) => {
  const clientInfos = useAppSelector((state) => state.auth.client);

  return (
    <div
      style={{
        maxHeight: "60svh",
        maxWidth: "60svw",
        overflowY: "scroll",
        marginBottom: "10px",
      }}
    >
      {clientInfos &&
        handleDeal(
          clientInfos.name,
          clientInfos.cpforcnpj.replace(/\D/g, ""),
          clientInfos.address,
          props.installments
        )}
    </div>
  );
};

export default ReadDeal;
