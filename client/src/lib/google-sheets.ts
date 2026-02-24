export async function sendToGoogleSheets(data: {
  name: string;
  email: string;
  whatsapp: string;
  fonte?: string;
}) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN9dac97y_fLGRuuu2DIrHO2KJwxSDwV4CiMh16g31mvBqivpQSNoKeSdO-oCd8nrEvw/exec";

  try {
    const now = new Date();
    const brDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    }).format(now);

    const params = new URLSearchParams();
    params.append("Data/Hora", brDate);
    params.append("Nome", data.name);
    params.append("Email", data.email);
    params.append("WhatsApp", data.whatsapp);
    params.append("Fonte", data.fonte || "Landing Page");

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    console.log("Dados enviados para o Google Sheets com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar para o Google Sheets:", error);
  }
}
