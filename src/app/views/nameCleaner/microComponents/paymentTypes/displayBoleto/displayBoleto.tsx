import { Button } from "@mui/material";
import html2pdf from "html2pdf.js";
import JsBarcode from "jsbarcode";
import logoBb from "../../../../../../images/assets/logoBb.jpeg";
import { Container } from "./styles";
import {
  TBoletoBodyResponse,
  TGetSaleResponse,
} from "core/models/payment/boleto";
import {
  formatCEP,
  formatCurrency,
  formatDateBr,
  formatDocument,
} from "core/utils/globalFunctions";
import { TNewClientBodyRequest } from "core/models/client";

export interface IDowloadPdfProps {
  client: TNewClientBodyRequest;
  boletoInfos: TBoletoBodyResponse;
}

export interface IHtmlProps {
  infos: IDowloadPdfProps;
  svg: string;
}

function getBoleto(infos: IHtmlProps): string {
  function adicionarVirgulaSeNecessario(valor: string): string {
    if (!valor.includes(",")) {
      valor += ",00";
    }

    return valor;
  }

  const {
    nossoNumero,
    seuNumero,
    digitableline,
    value,
    dueDate,
    discount,
    issuancedate,
  } = infos.infos.boletoInfos;

  const { name, address, cep, city, cpforcnpj, neighborhood, uf } =
    infos.infos.client;
  return `<!DOCTYPE html>
<html>
  <head>
  </head>
  <style>
    td.BoletoCodigoBanco {
      font-size: 4m;
      font-family: arial, verdana;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      vertical-align: bottom;
      border-bottom: 0.15mm solid #000000;
      border-right: 0.15mm solid #000000;
      padding-bottom: 2mm;
    }
    td.BoletoLogo {
      border-bottom: 0.15mm solid #000000;
      border-right: 0.15mm solid #000000;
      text-align: center;
      height: 9mm;
    }
    td.BoletoLinhaDigitavel {
      font-size: 4mm;
      font-family: arial, verdana;
      font-weight: bold;
      text-align: center;
      vertical-align: bottom;
      border-bottom: 0.15mm solid #000000;
      padding-bottom: 2mm;
    }
    td.BoletoTituloEsquerdo {
      font-size: 0.2cm;
      font-family: arial, verdana;
      padding-left: 0.15mm;
      border-right: 0.15mm solid #000000;
      text-align: left;
    }
    td.BoletoTituloDireito {
      font-size: 2mm;
      font-family: arial, verdana;
      padding-left: 0.15mm;
      text-align: left;
    }
    td.BoletoValorEsquerdo {
      font-size: 3mm;
      font-family: arial, verdana;
      text-align: center;
      border-right: 0.15mm solid #000000;
      font-weight: bold;
      border-bottom: 0.15mm solid #000000;
      padding-top: 0.5mm;
    }
    td.BoletoValorDireito {
      font-size: 3mm;
      font-family: arial, verdana;
      text-align: right;
      padding-right: 3mm;
      padding-top: 0.8mm;
      border-bottom: 0.15mm solid #000000;
      font-weight: bold;
    }
    td.BoletoTituloSacado {
      font-size: 2mm;
      font-family: arial, verdana;
      padding-left: 0.15mm;
      vertical-align: top;
      padding-top: 0.15mm;
      text-align: left;
    }
    td.BoletoValorEsquerdoCorpo {
      font-size: 3mm;
      font-family: arial, verdana;
      text-align: center;
      border-right: 0.15mm solid #000000;
      font-weight: bold;
      padding-top: 0.5mm;
      text-align: left;
    }
    td.BoletoValorSacado {
      font-size: 3mm;
      font-family: arial, verdana;
      font-weight: bold;
      text-align: left;
    }
    td.BoletoTituloSacador {
      font-size: 2mm;
      font-family: arial, verdana;
      padding-left: 0.15mm;
      vertical-align: bottom;
      padding-bottom: 0.8mm;
      border-bottom: 0.15mm solid #000000;
    }
    td.BoletoValorSacador {
      font-size: 3mm;
      font-family: arial, verdana;
      vertical-align: bottom;
      padding-bottom: 0.15mm;
      border-bottom: 0.15mm solid #000000;
      font-weight: bold;
      text-align: left;
    }
    td.BoletoPontilhado {
      border-bottom: 0.1mm solid #626161;
      /* Ajuste a largura e a cor dos pontos conforme necessário */
      font-size: 0.01px;
      /* Ajuste o tamanho da fonte para reduzir o espaçamento */
      /* margin-top: 1px;
  margin-bottom: 10px; */
      padding-bottom: 10px;
      padding-top: 5px;
    }
    .BoletoPontilhado {
      border-bottom: 0.1mm solid #626161;
      /* Ajuste a largura e a cor dos pontos conforme necessário */
      font-size: 0.01px;
      /* Ajuste o tamanho da fonte para reduzir o espaçamento */
      /* margin-top: 1px;
  margin-bottom: 10px; */
      padding-bottom: 10px;
      padding-top: 5px;
    }
    ul.BoletoInstrucoes {
      font-size: 3mm;
      font-family: verdana, arial;
    }
    .creditos {
      font-size: 3mm;
      font-family: arial, verdana;
      margin-top: 2px;
      padding-top: 3px;
      text-align: right;
    }
    .ambiente {
      color: #9e1a1a;
    }
    .Pontilhado {
      border-bottom: 0.1mm dashed #626161;
      /* Ajuste a largura e a cor dos pontos conforme necessário */
      font-size: 0.01px;
      /* Ajuste o tamanho da fonte para reduzir o espaçamento */
      /* margin-top: 1px;
  margin-bottom: 10px; */
      padding-bottom: 2px;
      padding-top: 2px;
    }
  </style>
  <body>
    <table cellspacing="0" cellpadding="0" border="0" class="Boleto">
      <!-- recibo -->
      
      <tr>
        <td colspan="11" class="BoletoPontilhado">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="4" class="BoletoLogo">
          <!-- logo aqui -->
         <img src="${logoBb}" alt="Minha Imagem" width="180">
        </td>
        <td colspan="3" class="BoletoCodigoBanco">001-9</td>
        <td colspan="6" class="BoletoLinhaDigitavel">
        ${digitableline}
        </td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoTituloEsquerdo">
          Nome do Pagador / Endereço
        </td>
        <td class="BoletoTituloDireito">Data de Vencimento</td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoValorEsquerdoCorpo">${name}</td>
        <td class="BoletoValorDireito">${formatDateBr(dueDate)}</td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorEsquerdoCorpo">${neighborhood} ${cep} ${city} ${uf}</td>
        <td class="BoletoTituloDireito">Agência/Código do Beneficiário</td>
      </tr>
      <tr>
        <td style="text-align: left" colspan="10" class="BoletoValorEsquerdo">
          ${formatDocument(cpforcnpj)}
        </td>
        <td class="BoletoValorDireito">4020-7/48108-4</td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoTituloEsquerdo">
          Nome do Beneficiário / Endereço
        </td>
        <td class="BoletoTituloDireito">Nosso numero</td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoValorEsquerdoCorpo">POSITIVO BRASIL SERV COMBINADOS E APOIO R HELENA FREIRE 530 <br></br> - ALTIPLANO CABO B</td>
        <td class="BoletoValorDireito">${nossoNumero}</td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorEsquerdoCorpo">35.380.502/0001-70</td>
        <td class="BoletoTituloDireito">Valor do Documento</td>
      </tr>
      <tr>
        <td style="text-align: left" colspan="10" class="BoletoValorEsquerdo">
        </td>
        <td class="BoletoValorDireito">${adicionarVirgulaSeNecessario(
          String(value)
        )}</td>
      </tr>

      <tr>
        <td colspan="3" class="BoletoTituloEsquerdo">Uso do Banco</td>
        <td colspan="4" class="BoletoTituloEsquerdo">Nº do Documento</td>
        <td class="BoletoTituloEsquerdo">Espécie Doc</td>
        <td class="BoletoTituloEsquerdo">Aceite</td>
        <td class="BoletoTituloEsquerdo">Data do Processamento</td>
        <td class="BoletoTituloDireito">(=) Valor Pago</td>
      </tr>
      <tr>
        <td colspan="3" class="BoletoValorEsquerdo"></td>
        <td colspan="4" class="BoletoValorEsquerdo">${seuNumero}</td>
        <td class="BoletoValorEsquerdo">DM</td>
        <td class="BoletoValorEsquerdo">N</td>
        <td class="BoletoValorEsquerdo">${formatDateBr(issuancedate)}</td>
        <td class="BoletoValorDireito"></td>
      </tr>

      <tr>
        <td
          colspan="11"
          class="BoletoTituloDireito"
          style="text-align: right; padding-right: 0.1cm"
        >
          Autenticação Mecânica - Ficha de Compensação
        </td>
      </tr>
      <tr>
        <td colspan="11" class="Pontilhado"></td>
      </tr>

      <!-- boleto -->
      <tr>
        <td colspan="11" class="BoletoPontilhado">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="4" class="BoletoLogo">
          <img src="${logoBb}" alt="Minha Imagem" width="180">
        </td>
        <td colspan="3" class="BoletoCodigoBanco">341-7</td>
        <td colspan="6" class="BoletoLinhaDigitavel">
          ${digitableline}
        </td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoTituloEsquerdo">Local de Pagamento</td>
        <td class="BoletoTituloDireito">Data de Vencimento</td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorEsquerdo">Pagar preferencialmente nos canais de autoatendimento do Banco do Brasil.</td>
        <td class="BoletoValorDireito">${formatDateBr(dueDate)}</td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoTituloEsquerdo">Nome do Benceficiário</td>
        <td class="BoletoTituloDireito">Agência/Código do Beneficiário</td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorEsquerdo">POSITIVO BRASIL SERV COMBINADOS E APOIO</td>
        <td class="BoletoValorDireito">4020-7/48108-4</td>
      </tr>

      <tr>
        <td colspan="3" class="BoletoTituloEsquerdo">Data do Documento</td>
        <td colspan="4" class="BoletoTituloEsquerdo">Número do Documento</td>
        <td class="BoletoTituloEsquerdo">Espécie Doc</td>
        <td class="BoletoTituloEsquerdo">Aceite</td>
        <td class="BoletoTituloEsquerdo">Data do Processamento</td>
        <td class="BoletoTituloDireito">Nosso Número</td>
      </tr>
      <tr>
        <td colspan="3" class="BoletoValorEsquerdo">${formatDateBr(
          issuancedate
        )}</td>
        <td colspan="4" class="BoletoValorEsquerdo">${seuNumero}</td>
        <td class="BoletoValorEsquerdo">DM</td>
        <td class="BoletoValorEsquerdo">N</td>
        <td class="BoletoValorEsquerdo">${formatDateBr(issuancedate)}</td>
        <td class="BoletoValorDireito">${nossoNumero}</td>
      </tr>

      <tr>
        <td colspan="3" class="BoletoTituloEsquerdo">Uso do Banco</td>
        <td colspan="2" class="BoletoTituloEsquerdo">Carteira</td>
        <td colspan="2" class="BoletoTituloEsquerdo">Espécie</td>
        <td colspan="2" class="BoletoTituloEsquerdo">Quantidade</td>
        <td class="BoletoTituloEsquerdo">(x) Valor</td>
        <td class="BoletoTituloDireito">(=) Valor do Documento</td>
      </tr>
      <tr>
        <td colspan="3" class="BoletoValorEsquerdo">&nbsp;</td>
        <td colspan="2" class="BoletoValorEsquerdo">17</td>
        <td colspan="2" class="BoletoValorEsquerdo">R$</td>
        <td colspan="2" class="BoletoValorEsquerdo">&nbsp;</td>
        <td class="BoletoValorEsquerdo">&nbsp;</td>
        <td class="BoletoValorDireito">${adicionarVirgulaSeNecessario(
          String(value)
        )}</td>
      </tr>

      <tr>
        <td colspan="10" class="BoletoTituloEsquerdo">
          Informações de Responsabilidade do Benefíciario:
        </td>
        <td class="BoletoTituloDireito">(-) Desconto/Abatimento</td>
      </tr>
      <tr>
        <td
          colspan="10"
          rowspan="5"
          class="BoletoValorEsquerdo"
          style="text-align: left; vertical-align: top; padding-left: 0.1cm"
        >
          JRS: Vl p/Dia Atraso R$0,10 A PARTIR DE data de vencimento
          <br></br>
          MULTA DE R$ 3,00 APARTIR DE data de vencimento
          <br></br>
          APÓS 30 DIAS DE VENCIMENTO, SEU NOME SERÁ NEGATIVADO
        </td>
        <td class="BoletoValorDireito">${
          discount ? formatCurrency(discount) : "0,00"
        }</td>
      </tr>
      <tr>
        <td class="BoletoTituloDireito">(+)Juros/Multa</td>
      </tr>
      <tr>
        <td class="BoletoValorDireito">0,00</td>
      </tr>
      <tr>
        <td class="BoletoTituloDireito">(=) Valor Cobrado</td>
      </tr>
      <tr>
        <td class="BoletoValorDireito">${adicionarVirgulaSeNecessario(
          String(value - discount)
        )}</td>
      </tr>
      <tr>
        <td colspan="10" rowspan="1" class="BoletoTituloSacado">
          Nome do Pagador / Endereço
        </td>
        <td rowspan="1" class="BoletoTituloSacado">CPF:</td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorSacado">
          ${name}
        </td>
        <td colspan="" class="BoletoValorSacado">
         ${neighborhood} 
        </td>,
      </tr>
      <tr>
        <td colspan="10" class="BoletoValorSacado">
        ${formatCEP(cep)} ${city} ${address} ${uf}
        </td>
      </tr>
      <tr>
        <td colspan="10" class="BoletoTituloSacador">Beneficiário final</td>
        <td colspan="" class="BoletoTituloSacador">CPF/CNPJ</td>
      </tr>
      <tr>
        <td
          colspan="11"
          class="BoletoTituloDireito"
          style="text-align: right; padding-right: 0.1cm"
        >
          Autenticação Mecânica - Ficha de Compensação
        </td>
      </tr>
      <tr>
        <td colspan="11" height="60" valign="top">
        ${infos.svg}
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export const handleGeneratePDF = async (infos: IDowloadPdfProps) => {
  let svgString;

  const svgElement = document.createElement("svg");

  JsBarcode(svgElement, infos.boletoInfos.barCode, {
    format: "CODE128",
    width: 1.2,
    height: 50,
    displayValue: false,
    fontSize: 12,
    textAlign: "center",
  });

  svgString = new XMLSerializer().serializeToString(svgElement);

  const boletoRef = document.createElement("div");

  boletoRef.innerHTML = getBoleto({ infos: infos, svg: svgString });

  if (boletoRef && svgElement) {
    const options = {
      margin: 10,
      filename: "boleto.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(boletoRef).set(options).save();
  }
};

const DisplayBoleto = (paymentInfo: TGetSaleResponse) => {
  return (
    <Container>
      <Button
        onClick={() =>
          handleGeneratePDF({
            boletoInfos: paymentInfo.pix as TBoletoBodyResponse,
            client: paymentInfo.client,
          })
        }
      >
        baixar boleto
      </Button>
    </Container>
  );
};

export default DisplayBoleto;
