// noinspection UnnecessaryLocalVariableJS
import { BACKEND_BASE_URL } from "./constants";

export function formatDocument(doc: string) {
  doc = doc.replace(/\D/g, "");
  if (doc.length === 11) {
    doc = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (doc.length === 14) {
    doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return doc;
}

export function formatPhoneNumber(phoneNumber: string) {
  let numericPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
  if (numericPhoneNumber.length === 11) {
    numericPhoneNumber = numericPhoneNumber.replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
      (_, ddd, nine, firstPart, secondPart) =>
        `(${ddd}) ${nine}${firstPart}-${secondPart}`
    );
  } else if (numericPhoneNumber.length === 13) {
    numericPhoneNumber = numericPhoneNumber.replace(
      /^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/,
      (_, country, ddd, nine, firstPart, secondPart) =>
        `+${country} (${ddd}) ${nine} ${firstPart}-${secondPart}`
    );
  }
  return numericPhoneNumber;
}

export function formatCEP(cep: string) {
  return cep.replace(/^(\d{2})(\d{3})(\d{2})$/, "$1.$2-$3");
}

export function formatDateBr(dataISO: string): string {
  if (!dataISO) {
    return "--";
  }

  const [ano, mes, dia] = dataISO.split("T")[0].split("-");

  return `${dia}/${mes}/${ano}`;
}

function convertTypeToString(type: string): string {
  switch (type) {
    case "SELLER": {
      return "seller";
    }
    case "CLIENT": {
      return "client";
    }
    case "ADMIN": {
      return "seller";
    }
    case "INDICATION": {
      return "indication";
    }
    default: {
      return "";
    }
  }
}

export function urlByUserType(type: string, id: number, put?: boolean): string {
  let userUrl = `${BACKEND_BASE_URL}v1/${convertTypeToString(type)}/${
    put ? "update/" : ""
  }${id}`;
  return userUrl;
}

export function validarCpfCnpj(input: string): boolean {
  const cleanedInput = input.replace(/\D/g, "");
  if (cleanedInput.length === 11) {
    return validarCpf(cleanedInput);
  } else if (cleanedInput.length === 14) {
    return validarCnpj(cleanedInput);
  }
  return false;
}

function validarCpf(cpf: string): boolean {
  const numeros = cpf.substring(0, 9).split("").map(Number);
  const digitos = cpf.substring(9).split("").map(Number);

  const calcularDigito = (numeros: number[]): number => {
    let soma = 0;
    let multiplicador = numeros.length + 1;

    for (const numero of numeros) {
      soma += numero * multiplicador;
      multiplicador--;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros);
  const segundoDigito = calcularDigito([...numeros, primeiroDigito]);

  return digitos[0] === primeiroDigito && digitos[1] === segundoDigito;
}

function validarCnpj(cnpj: string): boolean {
  const numeros = cnpj.substring(0, 12).split("").map(Number);
  const digitos = cnpj.substring(12).split("").map(Number);

  const calcularDigito = (numeros: number[], multiplicador: number): number => {
    let soma = 0;

    for (const numero of numeros) {
      soma += numero * multiplicador;
      multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(numeros, 5);
  const segundoDigito = calcularDigito([...numeros, primeiroDigito], 6);

  return digitos[0] === primeiroDigito && digitos[1] === segundoDigito;
}

export function formatCurrencyBR(input: number | undefined): string {
  if (input === undefined) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(input);
}

export function downloadCSVFromBase64(
  base64String: string,
  fileName: string
): void {
  // Convertendo a string base64 para um array de bytes
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Criando um Blob a partir do array de bytes
  const blob = new Blob([byteArray], { type: "text/csv" });

  // Criando um link temporário para download
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  // Simulando o clique no link para iniciar o download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function removeExtraSpaces(input: string): string {
  return input.trim();
}

export function removeNonNumeric(
  input: string | undefined
): string | undefined {
  if (input) return input.replace(/\D/g, "");
  else return undefined;
}

export function formatCurrency(numero?: number): string {
  if (numero === undefined || numero === null) {
    return "0,00";
  }

  // Formatando o número com duas casas decimais
  const numeroFormatado = numero.toFixed(2);

  // Substituindo o ponto por vírgula
  return numeroFormatado.replace(".", ",");
}

export function periodoAtual(tipo: "mes" | "ano"): string {
  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });
  const anoAtual = dataAtual.getFullYear();

  if (tipo === "mes") {
    return `Período: ${mesAtual} ${anoAtual}`;
  } else if (tipo === "ano") {
    return `Período: ${anoAtual}`;
  } else {
    throw new Error(
      'Tipo de período inválido. Por favor, passe "mes" ou "ano" como parâmetro.'
    );
  }
}

export function formatInt(value: string): string {
  let numericValue = value.replace(/\D/g, "");
  return numericValue;
}

export function downloadPdf(base64String: string, fileName: string) {
  // Decodifica a string base64 para um array de bytes
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Cria um blob a partir do array de bytes
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // Cria um URL de objeto para o blob
  const url = window.URL.createObjectURL(blob);

  // Cria um link (a) e atribui o URL do blob
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Dispara o evento de clique no link para iniciar o download
  link.click();

  // Limpa o URL de objeto para liberar recursos
  window.URL.revokeObjectURL(url);
}
