import { fetchLinks } from "core/querryes/dashboard/getLinksQuerry";
import { ActionButton, ActionCard, ActionTitle, Container } from "./styles";
import { useQuery } from "@tanstack/react-query";
import copy from "clipboard-copy";
import { LINK_VENDA_CURSO, LINK_VENDA_LIMPA_NOME } from "core/utils/constants";

export type TSaleType = "consultoria" | "limpaNome";

interface ILinksDisplayProps {
  indicationLink: () => void;
}

interface ILinkCardProps {
  title: string;
  actionLabel: string;
  handleAction: () => void;
  disabled?: boolean;
}

// componente que mostra o link
const LinkCard = (props: ILinkCardProps) => {
  return (
    <ActionCard item>
      <ActionTitle>{props.title}</ActionTitle>
      <ActionButton disabled={props.disabled} onClick={props.handleAction}>
        {props.actionLabel}
      </ActionButton>
    </ActionCard>
  );
};

const LinksDisplay = (props: ILinksDisplayProps) => {
  const { indicationLink } = props;

  // copia o link atual dependendo do tipo da venda
  const handleCopyClick = (type: TSaleType, param?: string) => {
    if (type === "limpaNome") return copy(LINK_VENDA_LIMPA_NOME + param);
    else return copy(LINK_VENDA_CURSO + param);
  };

  // pega os links sem indicação
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    staleTime: Infinity,
    queryFn: () => fetchLinks(),
  });

  // cards em objetos
  const cpfCards: ILinkCardProps[] = [
    {
      title: "Link sem indicação limpa nome",
      actionLabel: "Copiar link",
      handleAction: () =>
        handleCopyClick("limpaNome", data?.data.CAMPANHA26022024),
    },
    {
      title: "Link sem indicação consultoria",
      actionLabel: "Copiar link",
      handleAction: () =>
        handleCopyClick("consultoria", data?.data.CAMPANHA26022024),
    },
  ];

  return (
    <Container container gap={"1em"}>
      <LinkCard
        title={"Gerar link por indicação"}
        actionLabel={"Gerar link"}
        handleAction={indicationLink}
      />
      {cpfCards.map((card, index) => (
        <LinkCard
          key={index}
          title={card.title}
          actionLabel={card.actionLabel}
          handleAction={card.handleAction}
          disabled={isLoading}
        />
      ))}
    </Container>
  );
};

export default LinksDisplay;
