export async function sendToGoogleSheets(data: {
  name: string;
  email: string;
  whatsapp: string;
  fonte?: string;
}) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwcGsKsQUgyebQB6UB_m-ZtyoZWlLw1XVCPJasIXOoBciXTCpbM6thP6_vu6D69QIHhzg/exec";

  try {
    const now = new Date();
    const brDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    }).format(now);

    const params = new URLSearchParams({
      "data_hora": brDate,
      "nome": data.name,
      "email": data.email,
      "e-mail": data.email,
      "whatsapp": data.whatsapp,
      "fonte": data.fonte || "Landing Page",
    });

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    console.log("Dados enviados para o Google Sheets com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar para o Google Sheets:", error);
  }
}

function detectFonte(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = (params.get("utm_source") || "").toLowerCase();
    if (source === "facebook" || source === "instagram" || source === "meta-ads") {
      return "Meta Ads";
    }
    return "Orgânico";
  } catch {
    return "Orgânico";
  }
}

export async function sendToMaterialsSheet(data: {
  name: string;
  email: string;
  whatsapp: string;
  produto?: string;
}) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuZa9h35RGHAGRnuprikP7-pvC715R_aNtmPpJXGvJrR0MGDyz1FgNEZs0bsfhR1q7xQ/exec";

  try {
    const now = new Date();
    const brDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    }).format(now);

    const params = new URLSearchParams({
      "data_hora": brDate,
      "nome": data.name,
      "email": data.email,
      "e-mail": data.email,
      "whatsapp": data.whatsapp,
      "produto": data.produto || "Não identificado",
      "fonte": detectFonte(),
    });

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    console.log("Dados enviados para a planilha de Materiais com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar para a planilha de Materiais:", error);
  }
}
