import { useEffect } from "react";
import "../styles/mentoria-wp.css";

// Link do Hotmart para a Mentoria
const HOTMART_LINK = "https://pay.hotmart.com/Y93975016X?off=22jnl093&bid=1759350326376";
const HOTMART_BOLETO_LINK = "https://pay.hotmart.com/Y93975016X?off=et69m72o&bid=1759350383011";

// URLs das imagens do WordPress CDN
const WP_CDN = "https://inovandonasuaobra.com.br/wp-content/uploads";

const images = {
  logo: `${WP_CDN}/2025/07/Masterclass-Cronograma-1507-e1752603988566.webp`,
  heroPhoto: `${WP_CDN}/2025/06/Post-instagram-contratar-advogado-moderno-azul-e-bege-4-e1752604162881.png`,
  skills: `${WP_CDN}/2025/07/1-2-e1752679552648.webp`,
  audience: `${WP_CDN}/2025/07/2-1.webp`,
  audienceMobile: `${WP_CDN}/2025/07/2.webp`,
  howWorks: `${WP_CDN}/2025/07/3-1-e1752674351215.png`,
  howWorksMobile: `${WP_CDN}/2025/07/3-e1752678867880.webp`,
  modules1: `${WP_CDN}/2025/07/5-1.png`,
  modules2: `${WP_CDN}/2025/07/6-1024x576.png`,
  modules3: `${WP_CDN}/2025/07/7-1024x576.png`,
  modules4: `${WP_CDN}/2025/07/8-e1752606854888.png`,
  modulesMobile: `${WP_CDN}/2025/07/5-e1752604964742.webp`,
  bonus1: `${WP_CDN}/2025/07/15.png`,
  bonus2: `${WP_CDN}/2025/07/16-1.png`,
  revenue1: `${WP_CDN}/2025/07/12-e1752605232522-651x1024.webp`,
  revenue2: `${WP_CDN}/2025/07/13-576x1024.png`,
  pricing: `${WP_CDN}/2025/10/Pagina-de-VendaSite-1-e1759350501979-768x658.png`,
  guarantee: `${WP_CDN}/2025/07/14-e1752677582621-1024x172.png`,
  guaranteeMobile: `${WP_CDN}/2025/07/14mobile.webp`,
  about: `${WP_CDN}/2025/01/inso4-1-e1738203060570.png`,
  testimonial1Poster: `${WP_CDN}/2025/05/beatriz-com-frase-1.jpg`,
  testimonial2Poster: `${WP_CDN}/2025/05/ingrid-com-frase.jpg`,
  testimonial3Poster: `${WP_CDN}/2025/05/monique-com-frase.jpg`,
  testimonial4Poster: `${WP_CDN}/2025/05/aline-com-frase.jpg`,
};

const videos = {
  testimonial1: `${WP_CDN}/2025/02/video-do-whatsapp-de-2025-02-12-a-s-192020-bc2c9e42_b5SbHjIn.mp4`,
  testimonial2: `${WP_CDN}/2025/02/video-do-whatsapp-de-2025-02-12-a-s-192014-d8f07a40_94n43JX7.mp4`,
  testimonial3: `${WP_CDN}/2025/02/video-do-whatsapp-de-2025-02-12-a-s-191958-e3b1a838_OJuygEE2.mp4`,
  testimonial4: `${WP_CDN}/2025/02/video-do-whatsapp-de-2025-02-12-a-s-192005-91a62508_ZRfhS0aI.mp4`,
};

const faqItems = [
  {
    question: "As aulas são gravadas ou ao vivo?",
    answer: "Todo o conteúdo já está gravado e organizado por temas na plataforma. Assim que você comprar, terá acesso imediato aos 4 primeiros módulos. Além disso, as aulas bônus e os plantões de dúvidas serão ao vivo pelo Zoom, com as gravações disponíveis na plataforma Hotmart."
  },
  {
    question: "Em quanto tempo eu termino a mentoria?",
    answer: "Aproximadamente 3 meses. Todo conteúdo gravado são 16h e isso dá 1h33 por semana (12 semanas)"
  },
  {
    question: "Por quanto tempo eu tenho acesso ao conteúdo?",
    answer: "1 ano de acesso."
  },
  {
    question: "Será que consigo conciliar a mentoria com meus outros compromissos?",
    answer: "Sabemos que o dia a dia nas obras são corridos, e é por isso que nossas aulas foram planejadas para se ajustarem à sua rotina. Conteúdo prático e direto ao ponto, em módulos concisos, para você aprender no seu ritmo e aplicar no dia seguinte."
  },
  {
    question: "Não encontrei a resposta para a minha dúvida, como faço?",
    answer: "Basta enviar um e-mail para inovandonasuaobra@gmail.com ou chamar o suporte do whatsapp e nossa equipe responderá todas as suas dúvidas."
  }
];

export default function MentoriaLanding() {
  useEffect(() => {
    // Update page metadata
    document.title = "Mentoria Inovando na sua Obra – Domine o gerenciamento de obra de interiores";
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o primeiro contato até a entrega final. Mentoria para arquitetas e designers.");
    }

    // Track page view
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_title: 'Mentoria Landing Page',
        page_location: window.location.href,
      });
    }
  }, []);

  // Handler para disparar evento ao clicar no CTA
  const handleCtaClick = () => {
    // DataLayer event para GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'checkout_intent',
        product: 'mentoria',
        conversion_identifier: 'mentoria-inovando-na-sua-obra-carrinho-abandonado',
      });
    }
    
    // Redireciona para Hotmart
    window.location.href = HOTMART_LINK;
  };

  const handleBoletoClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'checkout_intent',
        product: 'mentoria',
        payment_method: 'boleto',
        conversion_identifier: 'mentoria-inovando-na-sua-obra-carrinho-abandonado',
      });
    }
    window.location.href = HOTMART_BOLETO_LINK;
  };

  return (
    <div className="mentoria-wp-page">
      {/* Hero Section */}
      <section className="mentoria-section mentoria-hero">
        <div className="mentoria-section-inner">
          <div className="mentoria-hero-content">
            <div className="mentoria-hero-text">
              <img 
                src={images.logo} 
                alt="Mentoria Inovando na sua Obra" 
                className="mentoria-logo"
                loading="eager"
              />
              <h2>
                <b>Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente</b>
              </h2>
              <h5>
                Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o primeiro contato até a entrega final.
              </h5>
              <button 
                className="mentoria-cta-button"
                onClick={handleCtaClick}
              >
                Quero ENTRAR NA MENTORIA
              </button>
            </div>
            <div className="mentoria-hero-image">
              <img 
                src={images.heroPhoto} 
                alt="Ingrid Zarza e Fernanda Bradaschia" 
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn - Skills Section */}
      <section className="mentoria-section mentoria-skills">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">O que você vai aprender?</h2>
          <img 
            src={images.skills} 
            alt="Habilidades técnicas e comportamentais"
            className="mentoria-skills-image hidden-mobile"
            loading="lazy"
          />
        </div>
      </section>

      {/* Audience Section */}
      <section className="mentoria-section mentoria-audience">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">Para quem é?</h2>
          <p className="mentoria-audience-description">
            Para arquitetas, designers de interiores e engenheiras que queiram aprender a organizar obras de forma eficiente e previsível.
          </p>
          <img 
            src={images.audience} 
            alt="Para quem é a mentoria"
            className="mentoria-skills-image hidden-mobile"
            loading="lazy"
          />
          <img 
            src={images.audienceMobile} 
            alt="Para quem é a mentoria"
            className="mentoria-skills-image hidden-desktop"
            loading="lazy"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mentoria-section mentoria-how-works">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">
            Como funciona a <br /><b>Mentoria Inovando na sua Obra</b>?
          </h2>
          <img 
            src={images.howWorks} 
            alt="Como funciona a mentoria"
            className="mentoria-skills-image hidden-mobile"
            loading="lazy"
          />
          <img 
            src={images.howWorksMobile} 
            alt="Como funciona a mentoria"
            className="mentoria-skills-image hidden-desktop"
            loading="lazy"
          />
        </div>
      </section>

      {/* Modules Section - Desktop */}
      <section className="mentoria-section mentoria-modules hidden-mobile">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">Como é a mentoria por dentro?</h2>
          <div className="mentoria-modules-grid">
            <img src={images.modules1} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
            <img src={images.modules2} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
            <img src={images.modules3} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
            <img src={images.modules4} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Modules Section - Mobile */}
      <section className="mentoria-section mentoria-modules hidden-desktop">
        <div className="mentoria-section-inner text-center">
          <img src={images.modulesMobile} alt="Módulos da mentoria" className="mentoria-module-image" loading="lazy" />
        </div>
      </section>

      {/* Bonus Section */}
      <section className="mentoria-section hidden-mobile" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="mentoria-section-inner text-center">
          <img src={images.bonus1} alt="Bônus da mentoria" className="mentoria-skills-image mb-8" loading="lazy" />
          <img src={images.bonus2} alt="Bônus da mentoria" className="mentoria-skills-image" loading="lazy" />
        </div>
      </section>

      {/* Revenue Section - Desktop */}
      <section className="mentoria-section mentoria-revenue hidden-mobile">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">Como você pode faturar mais?</h2>
          <div className="mentoria-revenue-grid">
            <img src={images.revenue1} alt="Como faturar mais" className="mentoria-revenue-image" loading="lazy" />
            <img src={images.revenue2} alt="Como faturar mais" className="mentoria-revenue-image" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mentoria-section mentoria-pricing">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">
            E quanto é o investimento mais importante do seu ano?
          </h2>
          <div className="mentoria-pricing-card">
            <img 
              src={images.pricing} 
              alt="Investimento" 
              className="mentoria-pricing-image"
              loading="lazy"
            />
            <div className="mentoria-pricing-buttons">
              <button 
                className="mentoria-cta-button"
                onClick={handleCtaClick}
              >
                Quero meu acesso agora
              </button>
              <button 
                className="mentoria-cta-secondary"
                onClick={handleBoletoClick}
              >
                boleto parcelado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mentoria-section mentoria-testimonials">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">
            Veja o que dizem <b>nossas alunas:</b>
          </h2>
          <div className="mentoria-testimonials-grid">
            <video 
              className="mentoria-testimonial-video"
              src={videos.testimonial1}
              poster={images.testimonial1Poster}
              controls
              preload="metadata"
              controlsList="nodownload"
            />
            <video 
              className="mentoria-testimonial-video"
              src={videos.testimonial2}
              poster={images.testimonial2Poster}
              controls
              preload="metadata"
              controlsList="nodownload"
            />
            <video 
              className="mentoria-testimonial-video"
              src={videos.testimonial3}
              poster={images.testimonial3Poster}
              controls
              preload="metadata"
              controlsList="nodownload"
            />
            <video 
              className="mentoria-testimonial-video"
              src={videos.testimonial4}
              poster={images.testimonial4Poster}
              controls
              preload="metadata"
              controlsList="nodownload"
            />
          </div>
          <div className="text-center">
            <button 
              className="mentoria-cta-button"
              onClick={handleCtaClick}
            >
              quero entrar na mentoria
            </button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="mentoria-section mentoria-guarantee">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">Risco Zero para você</h2>
          <p className="mentoria-guarantee-text">
            Confiamos tanto no nosso conteúdo que damos uma <br />
            <b>garantia incondicional de 15 dias</b> pra você.
          </p>
          <img 
            src={images.guarantee} 
            alt="Garantia de 15 dias"
            className="mentoria-guarantee-image hidden-mobile"
            loading="lazy"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="mentoria-section mentoria-about">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title">Quem Somos</h2>
          <div className="mentoria-about-content">
            <div className="mentoria-about-text">
              <h2>
                Somos <b>Ingrid Zarza e Fernanda Bradaschia</b>, arquitetas <b>apaixonadas</b> por compartilhar conhecimento e <b>transformar a gestão de obras de interiores</b>.<br /><br />
                Unimos nossas experiências para fundar a <b>INOVANDO ARQUITETURA</b>, um escritório dedicado ao desenvolvimento e gerenciamento de projetos residenciais e comerciais de interiores. Ao longo da nossa trajetória, <b>já concluímos mais de 250 obras</b>, ajudando clientes a realizarem o seu sonho.<br /><br />
                Criamos a <b>@inovandonasuaobra</b>, um instagram para arquitetas, designers de interiores e engenheiras que querem aprender a gerenciar obras de interiores com mais segurança e qualidade. Lá, <b>compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas</b> baseadas na nossa vivência em campo.<br /><br />
                Em <b>2024</b>, criamos a <b>Mentoria Inovando na Sua Obra</b> para <b>compartilhar todo esse conhecimento de forma organizada e acessível</b>. Já são dezenas de alunas impactadas diretamente pela nossa metodologia, conquistando mais confiança e resultados.
              </h2>
            </div>
            <div className="mentoria-about-image">
              <img 
                src={images.about} 
                alt="Ingrid Zarza e Fernanda Bradaschia"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mentoria-section mentoria-faq">
        <div className="mentoria-section-inner">
          <h2 className="mentoria-section-title"><b>Perguntas Frequentes</b></h2>
          <div className="mentoria-faq-list">
            {faqItems.map((item, index) => (
              <details key={index} className="mentoria-faq-item" open={index === 0}>
                <summary>{item.question}</summary>
                <div className="mentoria-faq-content">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mentoria-footer">
        <p>© 2025 | Inovando na Sua Obra | Todos os Direitos Reservados</p>
      </footer>
    </div>
  );
}
