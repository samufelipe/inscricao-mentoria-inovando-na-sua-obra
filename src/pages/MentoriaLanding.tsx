import { useEffect } from "react";

export default function MentoriaLanding() {
  useEffect(() => {
    // Update page title
    document.title = "Inovando na sua Obra – Aprenda a planejar suas obras de interiores com previsibilidade";
    
    // Injetar scripts de automação do RD Station
    const script = document.createElement("script");
    script.innerHTML = `
      document.addEventListener('rdstation-form-success', function(event) {
        var payload = event.detail.payload;
        var email = payload.email || payload.Email;
        var nome = payload.name || payload.nome || payload.Nome;

        // Envia para o RD Station com o identificador de carrinho abandonado
        var data = {
          "token_rdstation": "acabba7b39edc5e0f8232d99a3109840",
          "identificador": "mentoria-inovando-na-sua-obra-carrinho-abandonado",
          "email": email,
          "nome": nome,
          "tags": ["mentoria-2026", "origem-lovable-wp-clone"]
        };

        fetch('https://api.rd.services/platform/conversions', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      });
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <div 
      className="wp-content-wrapper"
      dangerouslySetInnerHTML={{ 
        __html: `
          <div data-elementor-type="wp-page" data-elementor-id="1645" class="elementor elementor-1645" data-elementor-post-type="page">
            <!-- O conteúdo do body do WordPress será injetado aqui pelo Lovable -->
            <div id="wp-body-content"></div>
          </div>
        ` 
      }} 
    />
  );
}
