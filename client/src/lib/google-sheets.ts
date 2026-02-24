export async function sendToGoogleSheets(data: {
  name: string;
  email: string;
  whatsapp: string;
}) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN9dac97y_fLGRuuu2DIrHO2KJwxSDwV4CiMh16g31mvBqivpQSNoKeSdO-oCd8nrEvw/exec";

  try {
    const formData = new FormData();
    formData.append("Nome", data.name);
    formData.append("Email", data.email);
    formData.append("WhatsApp", data.whatsapp);
    formData.append("Fonte", "Landing Page");

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Importante para evitar erro de CORS
      body: formData,
    });

    console.log("Dados enviados para o Google Sheets com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar para o Google Sheets:", error);
  }
}
