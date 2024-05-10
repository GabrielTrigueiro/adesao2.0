import { Box } from "@mui/material";
import { formatDocument, removeNonNumeric } from "core/utils/globalFunctions";
import React from "react";

function handleMounthName(numeroMes: number): React.ReactNode {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return meses[numeroMes - 1];
}

function returnQuartaClausula(
  documento: string,
  parcelas?: number
): React.ReactNode {
  let cleanedDocument = removeNonNumeric(documento);
  if (cleanedDocument && cleanedDocument.length === 11 && parcelas === 11) {
    return (
      <>
        <p>
          <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a
          título de honorários pela prestação dos serviços, conforme objeto do
          respectivo contrato, os valores e formas de pagamento abaixo
          determinadas:
        </p>
        <p>
          Vendas à vista 1.500 (hum mil e quinhentos reias) sem juros. Parcelado
          em 2 x 750 (setecentos e cinquenta reais) sem juros.
          <p>Parcelado em 3 x 500 (Quinhentos reais) sem juros.</p>
          <p>
            Parcelado em 4 x 475 (quatrocentos e setenta e cinco reais) com
            juros.
          </p>
          <p>Parcelado em 5 x 405 (quatrocentos e cinco reais) com juros.</p>
          <p>
            Parcelado em 6 x 358 (trezentos e cinquenta oito reais) com juros.
          </p>
          <p>
            Parcelado em 7 x 325 (trezentos e vinte e cinco reais) com juros.
          </p>
          <p>Parcelado em 8 x 300 (trezentos reais) com juros.</p>
          <p>Parcelado em 9 x 280 (duzentos e oitenta reais) com juros.</p>
          <p>
            Parcelado em 10 x 265 (duzentos e sessenta e cinco reais) com juros.
          </p>
          <p>
            Parcelado em 11 x 252 (duzentos e cinquenta e dois reais) com juros.
          </p>
          <p>Parcelado em 12 x 240 (duzentos e quarenta reais) com juros.</p>
        </p>
      </>
    );
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 11 &&
    parcelas === 0
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        (x) À vista R$ 997,00 (novecentos e noventa e sete reais), para pagamento através de Pix
        em conta corrente da empresa.
      </p>

      <p>
        ( ) Parcelado em 2 x R$ 600,00 (seiscentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 11 &&
    parcelas === 2
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        ( ) À vista R$ 997,00 (novecentos e noventa e sete reais), para pagamento através de Pix
        em conta corrente da empresa.
      </p>

      <p>
        (x) Parcelado em 2 x R$ 600,00 (seiscentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 14 &&
    parcelas === 0
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        (x) À vista R$ 1,497,00 (mil quatrocentos e noventa e sete reais), a vista
        através de pix em conta corrente da Contratada.
      </p>

      <p>
        ( ) Parcelado em 2 x R$ 900,00 (novecentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 14 &&
    parcelas === 2
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        ( ) À vista R$ 1,497,00 (mil quatrocentos e noventa e sete reais), a vista
        através de pix em conta corrente da Contratada.
      </p>

      <p>
        (x) Parcelado em 2 x R$ 900,00 (novecentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 11 &&
    parcelas === undefined
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        ( ) À vista R$ 997,00 (novecentos e noventa e sete reais), para pagamento através de Pix
        em conta corrente da empresa.
      </p>

      <p>
        ( ) Parcelado em 2 x R$ 600,00 (seiscentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  } else if (
    cleanedDocument &&
    cleanedDocument.length === 14 &&
    parcelas === undefined
  ) {
    <>
      <p>
        <b>CLÁUSULA QUARTA</b> – O (A)Contratante pagará a Contratada, a título
        de honorários pela prestação dos serviços, conforme objeto do respectivo
        contrato, os valores e formas de pagamento abaixo determinadas:{" "}
      </p>

      <p>
        ( ) À vista R$ 1,497,00 (mil quatrocentos e noventa e sete reais), a vista
        através de pix em conta corrente da Contratada.
      </p>

      <p>
        ( ) Parcelado em 2 x R$ 900,00 (novecentos reais) sem juros, para
        pagamento através de Pix em conta corrente da empresa ou Boleto
        Bancário.
      </p>
    </>;
  }
}

export default function handleDeal(
  name: string,
  cpf: string,
  address: string,
  installments?: number
): React.ReactNode {
  return BasicDeal(returnQuartaClausula(cpf, installments), name, cpf, address);
}

export const BasicDeal = (
  quartaClausula: React.ReactNode,
  nome: string,
  documento: string,
  endereco: string
) => {
  const dataAtual = new Date();
  const day = dataAtual.getDate();
  const month = dataAtual.getMonth() + 1;
  const monthName = handleMounthName(month);

  function returnDocumentString(documento: string): string {
    let doc = removeNonNumeric(documento);
    if (doc && doc.length === 11) {
      return "CPF";
    } else {
      return "CNPJ";
    }
  }

  return (
    <Box sx={{ textAlign: "start" }}>
      <h2>
        CONTRATO PARTICULAR DE PRESTAÇÃO DE SERVIÇO COM PAGAMENTO PARCELADO
      </h2>
      <p>
        Por este instrumento particular de{" "}
        <b>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</b>, que entre si fazem, de um
        lado, A{" "}
        <b>POSITIVO BRASIL SERVIÇOS COMBINADOS E APOIO ADMINISTRATIVO LTDA</b>,
        CNPJ nº 35.380.502/0001-70, e-mail: contato@positivobra.com.br, com
        endereço na Avenida Epitácio Pessoa, nº 3701, Bairro Miramar, João
        Pessoa – PB, CEP. 58032-000, representada neste ato pelo Sr.{" "}
        <b>CLEODATO DE LIMA PORTO</b>, na qualidade de diretor executivo, CPF nº
        092.342.134-32, Carteira de Identidade (RG) nº 002.945.651, expedida por
        SSDS/PB, doravante denominada <b>CONTRATADA</b>, e de outro lado {nome},
        sob inscrição {returnDocumentString(documento)} nº{" "}
        {formatDocument(documento)}, com endereço {endereco}, doravante
        denominada <b>CONTRATANTE</b>. Decidem as partes, na melhor forma de
        direito, celebrar o presente CONTRATO DE PRESTAÇÃO DE SERVIÇOS, que
        reger-se-á mediante as cláusulas e condições adiante estipuladas.
      </p>
      <p>
        <b>DO OBJETO</b>
      </p>
      <p>
        Tem entre si contratado a prestação de serviços de intermediação de
        soluções administrativas para{" "}
        <b>
          <u>
            INIBIÇÃO DE APONTAMENTOS NO CPF JUNTO AOS ÓRGÃOS DE PROTEÇÃO AO
            CRÉDITO (SPC, SERASA E BOA VISTA) E REAVALIAÇÃO DE SCORE
          </u>
        </b>
        , que se regerá pelas cláusulas seguintes:
      </p>
      <p>
        <b>CLÁUSULA PRIMEIRA</b> - A Contratada prestará ao contratante,
        assistência desde o primeiro contato. O presente objeto constitui
        responsabilidade finalística, de forma que vincula as partes aos
        resultados almejados
      </p>
      <p>
        <b>
          <u>OBRIGAÇÕES DO CONTRATANTE</u>
        </b>
      </p>
      <p>
        <b>CLÁUSULA SEGUNDA</b> - A Contratante deverá fornecer a Contratada
        todas as informações necessárias a realização dos serviços, devendo
        especificar os detalhes necessários a perfeita consecução do mesmo.
        <b>2.1</b> – A Contratante deverá efetuar os pagamentos na forma e
        condições descritas na cláusula quarta.
      </p>
      <p>
        <b>OBRIGAÇÕES DO CONTRATADA</b>
      </p>
      <p>
        <b>CLÁUSULA TERCEIRA</b> - A Contratada deverá prestar os serviços
        solicitados pelo Contratante conforme descrito no objeto, especificações
        e prazos previsto neste instrumento particular
        <br></br>
        <b>3.1</b> – A Contratada se obriga a manter absoluto sigilo sobre os
        dados, operações, informações e documentos do Contratante, mesmo após a
        conclusão dos serviços ou do término da relação contratual
        <br></br>
        <b>3.2</b> – Os contratos, informações, dados, materiais e documentos
        inerentes ao Contratante deverão ser utilizados, pela Contratada, por
        seus funcionários ou contratados, estritamente para cumprimento dos
        serviços solicitados pela Contratante, sendo VEDADO a comercialização ou
        utilização para outros fins.
        <br></br>
        <b>3.3</b> – Será de responsabilidade da Contratada todo o ônus
        trabalhista ou tributário referente aos funcionários utilizados para
        prestação do serviço objeto deste instrumento, ficando o Contratante
        isento de qualquer obrigação em relação a eles.
      </p>
      <p>
        <b>DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</b>
      </p>

      {quartaClausula}

      <p>
        <b>DA VALIDADE</b>
      </p>
      <p>
        <b>CLÁUSULA QUINTA</b> - O negócio jurídico só será validado, mediante
        pagamento em dia e a quitação integral dos valores acordados com a
        CONTRATADA.
      </p>
      <p>
        <b>DO PRAZO DE ENTREGA DO SERVIÇO</b>
      </p>
      <p>
        <b>CLÁUSULA SEXTA</b> – O prazo para a entrega dos serviços de inibição
        de apontamentos e restauração de score, junto aos órgãos de proteção ao
        crédito <b>(SERASA)</b>, será de no máximo, 45 (quarenta e cinco) dias
        úteis, a partir da assinatura do presente instrumento.
        <br></br>
        <b>6.1</b> – No caso de atraso do pagamento referente as parcelas
        previstas na Cláusula quarta, o prazo aqui estipulado será prorrogado
        por mais 45 (quarenta e cinco) dias úteis a contar do efetivo pagamento
        da parcela em aberto.
      </p>
      <p>
        <b>DOS JUROS DE MORA</b>
      </p>
      <p>
        <b>CLÁUSULA SÉTIMA</b> - No caso de atraso nos pagamentos, o (a)
        CONTRATANTE estará automaticamente em mora, arcando com juros de 1% (um
        por cento) ao mês e multa de 10% (dez por cento), sem prejuízo da
        cobrança judicial do débito pela via executiva judicial.
      </p>

      <p>
        <b>DA CONFIDENCIALIDADE</b>
      </p>

      <p>
        <b>CLÁUSULA OITAVA </b>- Todas as tratativas, negociações, contratos,
        documentos ou quaisquer informações a respeito da atividade desenvolvida
        são estritamente confidenciais, não podendo ser divulgadas por qualquer
        meio ou sob qualquer justificativa, com exceção das previstas na lei,
        sob pena de aplicação de multa contratual no importe de 30% (trinta por
        cento) sobre o valor do contrato.
      </p>
      <p>
        <b>DO PRAZO DE VALIDADE</b>
      </p>
      <p>
        <b>CLÁUSULA NONA</b> - Este Contrato entrará em vigor a partir da data
        da assinatura pelas partes, e terá validade de 6 (seis) meses, para a
        segurança e baixa das restrições dos nomes dos contratantes, contados a
        partir da assinatura do presente instrumento.
      </p>
      <p>
        <b>DO DESCUMPRIMENTO E RESCISÃO CONTRATUAL</b>
      </p>
      <p>
        <b>CLÁUSULA DÉCIMA</b> - O descumprimento de qualquer uma das cláusulas
        por qualquer uma das partes, implicará na rescisão imediata deste
        contrato, não isentando a Contratada de suas responsabilidades
        referentes ao zelo com informações e dados do Contratante
        <br></br>
        <b>10.1</b> - Caso o Contratante atrase o pagamento pelo período de 15
        (quinze) dias, será rescindido imediatamente o presente instrumento, e o
        valor do contrato será executado imediatamente, acrescidos de honorários
        advocatícios em 20% (por cento).
        <br></br>
        <b>10.2</b> - Qualquer tolerância das partes quanto ao descumprimento
        das cláusulas do presente contrato constituirá mera liberalidade, não
        configurando renúncia ou novação do contrato ou de suas cláusulas que
        poderão ser exigidos a qualquer tempo.
      </p>
      <p>
        <b>DO FORO</b>
      </p>
      <p>
        <b>CLÁUSULA DÉCIMA PRIMEIRA</b> - Os casos omissos ou dúvidas que
        surgirem serão dirimidas na forma da legislação aplicável, ficando
        eleito o foro da Comarca de João Pessoa - Paraíba, para qualquer ação
        fundada neste contrato, renunciando-se a qualquer outro, por muito
        especial que seja.
        <br></br>E por estarem em perfeito acordo em tudo quanto neste
        instrumento particular foi lavrado, obrigando-se as partes a cumprir o
        presente contrato.
        <br></br>
        <br></br>
        João Pessoa – PB, {day}, {monthName}, 2024.
      </p>
    </Box>
  );
};
