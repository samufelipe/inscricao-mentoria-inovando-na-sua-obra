import React, { useEffect, useRef, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
} from "recharts";
import { ChevronDown } from "lucide-react";
import inovandoLogo from "@/assets/alem-da-tendencia/inovando-obra-new.png";

// =============================================
// DATA CONSTANTS — Update these with new data
// =============================================
const REPORT_META = {
  title: "RELATÓRIO GERAL DE RESULTADOS",
  subtitle: "Lançamento Inovando na sua Obra",
  periodo: "07/01 - 09/02/2026",
  geradoEm: "10/02/2026",
};

const EXECUTIVE_SUMMARY = {
  investimentoTotal: 9242.5,
  investimentoLabel: "Meta Ads",
  receitaTotal: 63143.91,
  receitaLabel: "Hotmart",
  resultadoAds: 53901.41,
  resultadoAdsLabel: "Receita - Ads",
  roiConsolidado: "583,2%",
  roas: "6,83x",
  roasPhrase: "Para cada R$ 1,00 investido, retornaram R$ 6,83 em receita.",
  disclaimer:
    '* "Resultado sobre Ads" considera apenas a diferença entre receita bruta Hotmart e investimento em anúncios. Não inclui taxas da Hotmart, impostos ou custos operacionais.',
};

const IMERSAO = {
  periodo: "07/01 - 30/01/2026 · 24 dias de campanha",
  metaAds: {
    investimento: "R$ 6.674,11",
    impressoes: "384.254",
    alcance: "107.211",
    ctr: "1,59%",
    cpl: "R$ 11,45",
  },
  totalLeads: 581,
  leadsFonte: [
    { name: "Meta Ads", value: 263, pct: "44,4%", color: "#4A90D9" },
    { name: "Instagram Orgânico", value: 169, pct: "28,6%", color: "#E74C6F" },
    { name: "Acesso Direto", value: 161, pct: "27,2%", color: "#C9A84C" },
  ],
  leadsNote: "* 12 leads acessaram por mais de uma fonte (soma = 593, únicos = 581)",
  vendas: {
    ticket: "R$ 29,90",
    totalVendas: "496",
    receitaHotmart: "R$ 11.537,72",
    picoVendas: "30/01 - 31 vendas",
  },
  criativos: [
    {
      titulo: "Campanha Principal",
      vendas: "74 vendas",
      cpa: "CPA R$ 16,57",
      link: "https://www.instagram.com/p/DTaY9KvAP4k/#advertiser",
    },
    {
      titulo: "RMKT Direto ao Checkout",
      vendas: "156 vendas",
      cpa: "CPA R$ 11,62",
      link: "https://www.instagram.com/p/DTQX897AGaD/#advertiser",
    },
  ],
  financeiro: {
    investimento: "R$ 6.674,11",
    receita: "R$ 11.537,72",
    resultadoAds: "R$ 4.863,61",
    roi: "72,9%",
    roas: "1,73x",
  },
  emails: [
    {
      titulo: "E-mail: Boas-Vindas (Imersão)",
      entregues: "94,20%",
      taxaAbertura: "9,73%",
      clicados: "1,30%",
      maiorAbertura: "10,82%",
      links: [
        { label: "Abrir modelo", url: "https://inscricao-mentoria-inovandonasuaobracombr.lovable.app/emails/mentoria-boas-vindas-1.html" },
      ],
    },
    {
      titulo: "E-mail: Carrinho Abandonado (Imersão)",
      entregues: "96,64%",
      taxaAbertura: "8,77%",
      clicados: "1,18%",
      maiorAbertura: "17,69%",
      links: [],
    },
  ],
};

const MENTORIA = {
  periodo: "31/01 - 09/02/2026 · 10 dias de campanha",
  metaAds: {
    investimento: "R$ 2.568,39",
    impressoes: "223.714",
    alcance: "141.427",
    ctr: "1,18%",
    cpl: "R$ 15,88",
  },
  vendas: {
    ticket: "R$ 1.900,00",
    totalVendas: "33",
    receitaHotmart: "R$ 51.606,19",
    obs: "Exclui 7 vendas pré-live (fora da campanha)",
  },
  distribuicaoVendas: [
    { label: "Live (31/01)", vendas: "18 vendas", pct: "54,5%" },
    { label: "Meta Ads", vendas: "14 vendas", pct: "42,4%" },
    { label: "Orgânica (10/02)", vendas: "1 venda", pct: "3,0%" },
  ],
  funilCheckout: {
    entraram: 229,
    conversaoDireta: { valor: 17, pct: "7,4%" },
    recuperados: { valor: 6, pct: "2,6%" },
    abandonaram: { valor: 206, pct: "90%" },
  },
  vendasPorDia: [
    { dia: "31/01", vendas: 18 },
    { dia: "01/02", vendas: 3 },
    { dia: "02/02", vendas: 2 },
    { dia: "03/02", vendas: 2 },
    { dia: "04/02", vendas: 1 },
    { dia: "05/02", vendas: 2 },
    { dia: "06/02", vendas: 1 },
    { dia: "07/02", vendas: 1 },
    { dia: "08/02", vendas: 1 },
    { dia: "09/02", vendas: 1 },
    { dia: "10/02", vendas: 1 },
  ],
  criativos: [
    {
      titulo: "Campanha Principal",
      vendas: "9 vendas",
      cpa: "CPA R$ 95,56",
      link: "https://www.instagram.com/p/DULvVPbgL3e/#advertiser",
    },
    {
      titulo: "RMKT Direto ao Checkout",
      vendas: "5 vendas",
      cpa: "CPA R$ 86,10",
      link: "https://www.instagram.com/p/DUWNWUDgCPq/#advertiser",
    },
  ],
  financeiro: {
    investimento: "R$ 2.568,39",
    receita: "R$ 51.606,19",
    resultadoAds: "R$ 49.037,80",
    roi: "1.909,5%",
    roas: "20,09x",
  },
  emails: [
    {
      titulo: "E-mail: Carrinho Abandonado (Mentoria)",
      entregues: "97,76%",
      taxaAbertura: "5,87%",
      clicados: "0,94%",
      maiorAbertura: "7,75%",
      links: [
        { label: "Abrir modelo", url: "https://inscricao-mentoria-inovandonasuaobracombr.lovable.app/emails/mentoria-boas-vindas-1.html" },
        { label: "Abrir modelo", url: "https://inscricao-mentoria-inovandonasuaobracombr.lovable.app/emails/live-duvidas-imersao-mentoria.html" },
      ],
    },
  ],
};

const COMPARATIVO_ROWS = [
  { metrica: "Período", imersao: "07/01 - 30/01 (24 dias)", mentoria: "31/01 - 09/02 (10 dias)" },
  { metrica: "Investimento", imersao: "R$ 6.674,11", mentoria: "R$ 2.568,39" },
  { metrica: "Ticket", imersao: "R$ 29,90", mentoria: "R$ 1.900,00" },
  { metrica: "Vendas", imersao: "496", mentoria: "33" },
  { metrica: "Receita", imersao: "R$ 11.537,72", mentoria: "R$ 51.606,19" },
  { metrica: "ROI", imersao: "72,9%", mentoria: "1.909,5%" },
  { metrica: "ROAS", imersao: "1,73x", mentoria: "20,09x" },
  { metrica: "CPL", imersao: "R$ 11,45", mentoria: "R$ 15,88" },
  { metrica: "CTR", imersao: "1,59%", mentoria: "1,18%" },
  { metrica: "Abertura e-mail", imersao: "9,73%", mentoria: "5,87%" },
];

const COMPARATIVO_CHART_DATA = [
  { name: "Investimento", imersao: 6674.11, mentoria: 2568.39 },
  { name: "Receita", imersao: 11537.72, mentoria: 51606.19 },
  { name: "Resultado s/ Ads", imersao: 4863.61, mentoria: 49037.80 },
];

const CONSOLIDADO_ROWS = [
  { metrica: "Investimento Ads", imersao: "R$ 6.674,11", mentoria: "R$ 2.568,39", total: "R$ 9.242,50" },
  { metrica: "Receita Hotmart", imersao: "R$ 11.537,72", mentoria: "R$ 51.606,19", total: "R$ 63.143,91" },
  { metrica: "Resultado sobre Ads", imersao: "R$ 4.863,61", mentoria: "R$ 49.037,80", total: "R$ 53.901,41" },
  { metrica: "ROI", imersao: "72,9%", mentoria: "1.909,5%", total: "583,2%" },
  { metrica: "ROAS", imersao: "1,73x", mentoria: "20,09x", total: "6,83x" },
  { metrica: "Vendas", imersao: "496", mentoria: "33", total: "529" },
];

const OPORTUNIDADE = {
  titulo: "206 Leads Quentes",
  subtitulo: "206 pessoas iniciaram o checkout e não compraram",
  descricao:
    "Essas pessoas já demonstraram interesse real na Mentoria (R$ 1.900). São leads quentes que podem ser recuperados com a estratégia certa.",
  acoes: [
    {
      titulo: "Oferta Intermediária",
      descricao:
        "Produto de R$ 297-497 (workshop, módulo avulso). O ticket de R$ 1.900 pode ter sido a barreira.",
    },
    {
      titulo: "Live de Recuperação",
      descricao:
        "Live exclusiva com conteúdo de valor + oferta especial para quem abandonou o carrinho.",
    },
    {
      titulo: "WhatsApp (85% com telefone)",
      descricao:
        "Abordagem personalizada de follow-up. 85% desses leads deixaram WhatsApp no checkout.",
    },
  ],
};

const OBSERVACOES = {
  pontosFortes: [
    { titulo: "Funil em 2 etapas funciona", descricao: "Imersão captou 581 leads a CPL R$ 11,45, aqueceu o público e alimentou a Mentoria. ROI consolidado de 583,2%." },
    { titulo: "Live é o canal mais forte", descricao: "18 das 32 vendas da Mentoria (56,3%) saíram durante a live por link direto." },
    { titulo: "RMKT da Imersão campeão", descricao: "156 vendas com CPA de R$ 11,62 - menor custo por aquisição de toda a operação." },
    { titulo: "ROI da Mentoria excepcional", descricao: "ROAS de 20,09x com investimento de apenas R$ 2.568,39." },
  ],
  pontosAtencao: [
    { titulo: "90% de abandono de carrinho", descricao: "De 229 checkouts, 206 não compraram. Apenas 6 carrinhos recuperados (2,8%)." },
    { titulo: "Abertura de e-mail abaixo da média", descricao: "Taxas entre 5,87% e 9,73% vs. média do mercado de 20-25%." },
    { titulo: "Vendas pós-live baixas", descricao: "Picos de campanha com apenas 3 vendas. Campanhas sozinhas insuficientes para alto ticket." },
  ],
  acoesPrioritarias: [
    { titulo: "Campanhas de topo de funil", descricao: "Investir em anúncios de conteúdo (Reels, carrosséis) com objetivo de tráfego para o perfil. Capitalizar o crescimento de seguidores pós-lançamento e manter o público aquecido." },
    { titulo: "Produto perpétuo de ticket acessível", descricao: "Criar oferta entre R$ 297-697 (workshop, módulo avulso) com LP e anúncios contínuos. Os superinteressados do grupo de WhatsApp da Mentoria recebem condições exclusivas - são leads que já demonstraram intenção de compra e merecem uma porta de entrada diferenciada." },
    { titulo: "Conteúdo de bastidores e prova social", descricao: "Publicar resultados das alunas da Mentoria (antes/depois, depoimentos). Gera autoridade e aquece novos seguidores para próximas ofertas." },
    { titulo: "Ações no RD Marketing", descricao: "O plano atual do RD Station está no limite. Para manter as automações ativas, será necessário upgrade para o plano a partir de R$ 418/mês - valor que varia conforme a base de contatos. Avaliar custo-benefício e considerar limpeza da base para otimizar o investimento." },
  ],
  estrategiaCrescimento: [
    { titulo: "Funil de nutrição orgânico", descricao: "Transformar novos seguidores em leads com iscas digitais (e-book, checklist, mini-aula). Criar lista de e-mail qualificada para o próximo lançamento." },
    { titulo: "Replicar RMKT direto ao checkout", descricao: "O RMKT da Imersão teve CPA de R$ 11,62. Aplicar a mesma estratégia de remarketing direto ao checkout no produto perpétuo." },
    { titulo: "Grupo VIP como canal de conversão", descricao: "Utilizar o grupo de WhatsApp dos superinteressados como canal exclusivo para ofertas especiais, conteúdos antecipados e condições únicas no produto perpétuo." },
    { titulo: "Estruturar calendário de lançamentos", descricao: "Definir ciclo de lançamento da Mentoria com períodos de aquecimento, captação e carrinho aberto bem definidos." },
  ],
};

const FONTES = [
  { dado: "Investimento, impressões, alcance, CTR, CPL, CPA", fonte: "Gerenciador de Anúncios Meta" },
  { dado: "Vendas, receita, ticket", fonte: "Hotmart" },
  { dado: "Leads captados, fontes, funil de checkout, abandonos", fonte: "Sistema de rastreamento próprio" },
  { dado: "Taxas de e-mail", fonte: "RD Station Marketing" },
];

// =============================================
// HELPER COMPONENTS
// =============================================

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1500 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = prefix === "R$ "
    ? `R$ ${display.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${prefix}${display.toLocaleString("pt-BR", { minimumFractionDigits: suffix === "%" ? 1 : 0, maximumFractionDigits: suffix === "%" ? 1 : 0 })}${suffix}`;

  return <span ref={ref}>{formatted}</span>;
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-[#C9A84C] font-medium text-sm hover:bg-white/5 transition-colors"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{children}</div>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#C9A84C] text-lg md:text-xl font-bold tracking-[0.2em] uppercase mb-2">
      {children}
    </h2>
  );
}

function CardBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#16213e]/60 border border-gray-700/40 rounded-xl p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-gray-400 text-xs font-bold tracking-[0.15em] uppercase mb-4">{children}</h4>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700/30 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  );
}

function FinanceBlock({ data }: { data: { investimento: string; receita: string; resultadoAds: string; roi: string; roas: string } }) {
  const items = [
    { label: "Investimento", value: data.investimento, color: "text-white" },
    { label: "Receita", value: data.receita, color: "text-green-400" },
    { label: "Resultado s/ Ads", value: data.resultadoAds, color: "text-green-400" },
    { label: "ROI", value: data.roi, color: "text-green-400" },
    { label: "ROAS", value: data.roas, color: "text-[#C9A84C]" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">{item.label}</div>
          <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function EmailCard({ email }: { email: typeof IMERSAO.emails[0] }) {
  return (
    <CardBox>
      <SubTitle>{email.titulo}</SubTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500">Entregues</div>
          <div className="text-white font-semibold">{email.entregues}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Taxa de Abertura</div>
          <div className="text-white font-semibold">{email.taxaAbertura}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Clicados</div>
          <div className="text-white font-semibold">{email.clicados}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Maior abertura individual</div>
          <div className="text-white font-semibold">{email.maiorAbertura}</div>
        </div>
      </div>
      {email.links.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {email.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] text-sm underline hover:text-[#d4b85c] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </CardBox>
  );
}

function CriativoCard({ criativo }: { criativo: typeof IMERSAO.criativos[0] }) {
  return (
    <a
      href={criativo.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#16213e]/60 border border-gray-700/40 rounded-xl p-5 hover:border-[#C9A84C]/50 transition-colors"
    >
      <div className="text-white font-semibold text-sm mb-2">{criativo.titulo}</div>
      <div className="text-green-400 font-bold text-sm">{criativo.vendas}</div>
      <div className="text-gray-400 text-xs mt-1">{criativo.cpa}</div>
      <div className="text-[#C9A84C] text-xs mt-3 underline">Ver criativo</div>
    </a>
  );
}

// =============================================
// MAIN PAGE COMPONENT
// =============================================

export default function Relatorio() {
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* HEADER */}
        <FadeInSection>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4">
              <img src={inovandoLogo} alt="Inovando na Obra" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">{REPORT_META.title}</h1>
                <p className="text-[#C9A84C] text-sm">{REPORT_META.subtitle}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div>Período: <span className="text-white">{REPORT_META.periodo}</span></div>
              <div>Gerado em: <span className="text-white">{REPORT_META.geradoEm}</span></div>
            </div>
          </div>
        </FadeInSection>

        {/* RESUMO EXECUTIVO */}
        <FadeInSection>
          <SectionTitle>Resumo Executivo</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 mb-6">
            {[
              { label: "INVESTIMENTO TOTAL", value: EXECUTIVE_SUMMARY.investimentoTotal, sub: EXECUTIVE_SUMMARY.investimentoLabel, prefix: "R$ ", color: "text-white" },
              { label: "RECEITA TOTAL", value: EXECUTIVE_SUMMARY.receitaTotal, sub: EXECUTIVE_SUMMARY.receitaLabel, prefix: "R$ ", color: "text-green-400" },
              { label: "RESULTADO SOBRE ADS", value: EXECUTIVE_SUMMARY.resultadoAds, sub: EXECUTIVE_SUMMARY.resultadoAdsLabel, prefix: "R$ ", color: "text-green-400" },
            ].map((kpi) => (
              <CardBox key={kpi.label} className="text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">{kpi.label}</div>
                <div className={`text-xl md:text-2xl font-bold ${kpi.color}`}>
                  <AnimatedNumber value={kpi.value} prefix={kpi.prefix} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{kpi.sub}</div>
              </CardBox>
            ))}
            <CardBox className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">ROI CONSOLIDADO</div>
              <div className="text-xl md:text-2xl font-bold text-green-400">{EXECUTIVE_SUMMARY.roiConsolidado}</div>
              <div className="text-xs text-gray-500 mt-1">ROAS {EXECUTIVE_SUMMARY.roas}</div>
            </CardBox>
          </div>

          {/* ROAS phrase */}
          <CardBox className="text-center mb-4">
            <p className="text-gray-300 text-sm">
              {EXECUTIVE_SUMMARY.roasPhrase.split("R$ 1,00").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>{part}<span className="text-[#C9A84C] font-bold">R$ 1,00</span></React.Fragment>
                ) : (
                  <React.Fragment key={i}>
                    {part.split("R$ 6,83").map((p2, j, arr2) =>
                      j < arr2.length - 1 ? (
                        <React.Fragment key={j}>{p2}<span className="text-green-400 font-bold">R$ 6,83</span></React.Fragment>
                      ) : p2
                    )}
                  </React.Fragment>
                )
              )}
            </p>
          </CardBox>
          <p className="text-gray-500 text-xs mb-4">{EXECUTIVE_SUMMARY.disclaimer}</p>

          {/* Accordions */}
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            <Accordion title="O que é ROI?">
              ROI (Retorno sobre o Investimento) mede o lucro em relação ao valor investido. É calculado assim: (Receita - Investimento) / Investimento × 100. Exemplo: se você investiu R$ 100 e faturou R$ 600, seu ROI é de 500%. Quanto maior, melhor o aproveitamento do investimento.
            </Accordion>
            <Accordion title="O que é ROAS?">
              ROAS (Retorno sobre o Gasto com Anúncios) mostra quanto de receita cada real investido em anúncios gerou. Cálculo: Receita / Investimento em Ads. Exemplo: ROAS de 6,83x significa que cada R$ 1 em anúncios gerou R$ 6,83 em vendas. É a métrica mais direta para avaliar a eficiência dos anúncios.
            </Accordion>
          </div>
        </FadeInSection>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-700/50" />
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <div className="flex-1 h-px bg-gray-700/50" />
        </div>

        {/* IMERSÃO */}
        <FadeInSection>
          <SectionTitle>Imersão - Captação e Vendas</SectionTitle>
          <p className="text-gray-400 text-sm mb-6">{IMERSAO.periodo}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Meta Ads */}
            <CardBox>
              <SubTitle>Meta Ads - Desempenho</SubTitle>
              <StatRow label="Investimento" value={IMERSAO.metaAds.investimento} />
              <StatRow label="Impressões" value={IMERSAO.metaAds.impressoes} />
              <StatRow label="Alcance" value={IMERSAO.metaAds.alcance} />
              <StatRow label="CTR" value={IMERSAO.metaAds.ctr} />
              <StatRow label="CPL" value={IMERSAO.metaAds.cpl} />
            </CardBox>

            {/* Leads Donut */}
            <CardBox>
              <SubTitle>{IMERSAO.totalLeads} Leads por Fonte</SubTitle>
              <div className="flex items-center gap-4">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={IMERSAO.leadsFonte}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {IMERSAO.leadsFonte.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {IMERSAO.leadsFonte.map((lead) => (
                    <div key={lead.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: lead.color }} />
                      <span className="text-gray-400">{lead.name}</span>
                      <span className="text-white font-semibold ml-auto">{lead.value} leads ({lead.pct})</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">{IMERSAO.leadsNote}</p>
            </CardBox>
          </div>

          {/* Vendas Hotmart */}
          <CardBox className="mb-6">
            <SubTitle>Vendas - Hotmart</SubTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatRow label="Ticket" value={IMERSAO.vendas.ticket} />
              <StatRow label="Total de Vendas" value={IMERSAO.vendas.totalVendas} />
              <StatRow label="Receita Hotmart" value={IMERSAO.vendas.receitaHotmart} />
              <StatRow label="Pico de Vendas" value={IMERSAO.vendas.picoVendas} />
            </div>
          </CardBox>

          {/* Criativos */}
          <SubTitle>Criativos de Destaque</SubTitle>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {IMERSAO.criativos.map((c) => <CriativoCard key={c.titulo} criativo={c} />)}
          </div>

          {/* Financeiro */}
          <CardBox className="mb-6">
            <SubTitle>Desempenho Financeiro - Imersão</SubTitle>
            <FinanceBlock data={IMERSAO.financeiro} />
          </CardBox>

          {/* E-mails */}
          <div className="space-y-4 mb-12">
            {IMERSAO.emails.map((e) => <EmailCard key={e.titulo} email={e} />)}
          </div>
        </FadeInSection>

        {/* MENTORIA */}
        <FadeInSection>
          <SectionTitle>Mentoria - Vendas</SectionTitle>
          <p className="text-gray-400 text-sm mb-6">{MENTORIA.periodo}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <CardBox>
              <SubTitle>Meta Ads - Desempenho</SubTitle>
              <StatRow label="Investimento" value={MENTORIA.metaAds.investimento} />
              <StatRow label="Impressões" value={MENTORIA.metaAds.impressoes} />
              <StatRow label="Alcance" value={MENTORIA.metaAds.alcance} />
              <StatRow label="CTR" value={MENTORIA.metaAds.ctr} />
              <StatRow label="CPL" value={MENTORIA.metaAds.cpl} />
            </CardBox>

            <CardBox>
              <SubTitle>Vendas - Hotmart</SubTitle>
              <StatRow label="Ticket" value={MENTORIA.vendas.ticket} />
              <StatRow label="Total de Vendas" value={MENTORIA.vendas.totalVendas} />
              <StatRow label="Receita Hotmart" value={MENTORIA.vendas.receitaHotmart} />
              <StatRow label="Obs." value={MENTORIA.vendas.obs} />
            </CardBox>
          </div>

          {/* Distribuição de Vendas */}
          <CardBox className="mb-6">
            <SubTitle>Distribuição de Vendas</SubTitle>
            <div className="space-y-2">
              {MENTORIA.distribuicaoVendas.map((d) => (
                <div key={d.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{d.label}</span>
                  <span className="text-white font-semibold">{d.vendas} ({d.pct})</span>
                </div>
              ))}
            </div>
          </CardBox>

          {/* Funil de Checkout */}
          <CardBox className="mb-6">
            <SubTitle>Funil de Checkout (Rastreamento do Sistema)</SubTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{MENTORIA.funilCheckout.entraram}</div>
                <div className="text-xs text-gray-400">Entraram no Checkout</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{MENTORIA.funilCheckout.conversaoDireta.valor} <span className="text-sm">({MENTORIA.funilCheckout.conversaoDireta.pct})</span></div>
                <div className="text-xs text-gray-400">Conversão Direta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A84C]">{MENTORIA.funilCheckout.recuperados.valor} <span className="text-sm">({MENTORIA.funilCheckout.recuperados.pct})</span></div>
                <div className="text-xs text-gray-400">Recuperados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{MENTORIA.funilCheckout.abandonaram.valor} <span className="text-sm">({MENTORIA.funilCheckout.abandonaram.pct})</span></div>
                <div className="text-xs text-gray-400">Abandonaram s/ compra</div>
              </div>
            </div>
          </CardBox>

          {/* Vendas por Dia - Line Chart */}
          <CardBox className="mb-6">
            <SubTitle>Vendas por Dia (Hotmart)</SubTitle>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MENTORIA.vendasPorDia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="dia" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#16213e", border: "1px solid #374151", borderRadius: 8 }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="vendas" stroke="#C9A84C" strokeWidth={2} dot={{ fill: "#C9A84C", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-500 text-xs mt-2">O pico de 18 vendas no dia 31/01 corresponde à live de lançamento.</p>
          </CardBox>

          {/* Criativos */}
          <SubTitle>Criativos de Destaque</SubTitle>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {MENTORIA.criativos.map((c) => <CriativoCard key={c.titulo} criativo={c} />)}
          </div>

          {/* Financeiro */}
          <CardBox className="mb-6">
            <SubTitle>Desempenho Financeiro - Mentoria</SubTitle>
            <FinanceBlock data={MENTORIA.financeiro} />
          </CardBox>

          {/* E-mails */}
          <div className="space-y-4 mb-12">
            {MENTORIA.emails.map((e) => <EmailCard key={e.titulo} email={e} />)}
          </div>
        </FadeInSection>

        {/* COMPARATIVO */}
        <FadeInSection>
          <SectionTitle>Comparativo Imersão vs Mentoria</SectionTitle>
          <CardBox className="mb-6 mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 text-gray-400 font-medium">Métrica</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Imersão</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Mentoria</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO_ROWS.map((row) => (
                  <tr key={row.metrica} className="border-b border-gray-700/20">
                    <td className="py-2 text-gray-400">{row.metrica}</td>
                    <td className="py-2 text-white text-right font-semibold">{row.imersao}</td>
                    <td className="py-2 text-white text-right font-semibold">{row.mentoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBox>

          {/* Comparativo Bar Chart */}
          <CardBox className="mb-12">
            <SubTitle>Comparativo de Receita</SubTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPARATIVO_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#16213e", border: "1px solid #374151", borderRadius: 8 }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="imersao" name="Imersão" fill="#4A90D9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mentoria" name="Mentoria" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBox>
        </FadeInSection>

        {/* CONSOLIDADO */}
        <FadeInSection>
          <SectionTitle>Consolidado Financeiro</SectionTitle>
          <CardBox className="mb-12 mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 text-gray-400 font-medium">Métrica</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Imersão</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Mentoria</th>
                  <th className="text-right py-3 text-[#C9A84C] font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {CONSOLIDADO_ROWS.map((row) => (
                  <tr key={row.metrica} className="border-b border-gray-700/20">
                    <td className="py-2 text-gray-400">{row.metrica}</td>
                    <td className="py-2 text-white text-right">{row.imersao}</td>
                    <td className="py-2 text-white text-right">{row.mentoria}</td>
                    <td className="py-2 text-green-400 text-right font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBox>
        </FadeInSection>

        {/* OPORTUNIDADE */}
        <FadeInSection>
          <SectionTitle>Oportunidade: {OPORTUNIDADE.titulo}</SectionTitle>
          <CardBox className="mb-6 mt-4">
            <h3 className="text-white font-bold text-lg mb-2">{OPORTUNIDADE.subtitulo}</h3>
            <p className="text-gray-400 text-sm mb-6">{OPORTUNIDADE.descricao}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {OPORTUNIDADE.acoes.map((acao) => (
                <div key={acao.titulo} className="bg-[#1a1a2e]/80 border border-gray-700/30 rounded-lg p-4">
                  <div className="text-[#C9A84C] font-semibold text-sm mb-2">{acao.titulo}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{acao.descricao}</div>
                </div>
              ))}
            </div>
          </CardBox>
        </FadeInSection>

        {/* OBSERVAÇÕES */}
        <FadeInSection>
          <SectionTitle>Observações e Recomendações</SectionTitle>
          <div className="space-y-6 mt-4 mb-12">
            {/* Pontos Fortes */}
            <CardBox>
              <SubTitle>Pontos Fortes</SubTitle>
              <div className="space-y-4">
                {OBSERVACOES.pontosFortes.map((p) => (
                  <div key={p.titulo}>
                    <div className="text-green-400 font-semibold text-sm mb-1">{p.titulo}</div>
                    <div className="text-gray-400 text-sm">{p.descricao}</div>
                  </div>
                ))}
              </div>
            </CardBox>

            {/* Pontos de Atenção */}
            <CardBox>
              <SubTitle>Pontos de Atenção</SubTitle>
              <div className="space-y-4">
                {OBSERVACOES.pontosAtencao.map((p) => (
                  <div key={p.titulo}>
                    <div className="text-red-400 font-semibold text-sm mb-1">{p.titulo}</div>
                    <div className="text-gray-400 text-sm">{p.descricao}</div>
                  </div>
                ))}
              </div>
            </CardBox>

            {/* Ações Prioritárias */}
            <CardBox>
              <SubTitle>Ações Prioritárias</SubTitle>
              <div className="space-y-4">
                {OBSERVACOES.acoesPrioritarias.map((p) => (
                  <div key={p.titulo}>
                    <div className="text-[#C9A84C] font-semibold text-sm mb-1">{p.titulo}</div>
                    <div className="text-gray-400 text-sm">{p.descricao}</div>
                  </div>
                ))}
              </div>
            </CardBox>

            {/* Estratégia de Crescimento */}
            <CardBox>
              <SubTitle>Estratégia de Crescimento</SubTitle>
              <div className="space-y-4">
                {OBSERVACOES.estrategiaCrescimento.map((p) => (
                  <div key={p.titulo}>
                    <div className="text-[#C9A84C] font-semibold text-sm mb-1">{p.titulo}</div>
                    <div className="text-gray-400 text-sm">{p.descricao}</div>
                  </div>
                ))}
              </div>
            </CardBox>
          </div>
        </FadeInSection>

        {/* FONTES */}
        <FadeInSection>
          <SectionTitle>Fontes dos Dados</SectionTitle>
          <CardBox className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 text-gray-400 font-medium">Dado</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Fonte</th>
                </tr>
              </thead>
              <tbody>
                {FONTES.map((f) => (
                  <tr key={f.dado} className="border-b border-gray-700/20">
                    <td className="py-2 text-gray-400">{f.dado}</td>
                    <td className="py-2 text-white">{f.fonte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBox>
        </FadeInSection>
      </div>

      {/* Fixed Export PDF Button */}
      <button
        onClick={handleExportPDF}
        className="no-print fixed bottom-6 right-6 bg-[#C9A84C] text-[#1a1a2e] font-bold px-6 py-3 rounded-full shadow-lg hover:bg-[#d4b85c] transition-colors z-50"
      >
        Exportar PDF
      </button>
    </div>
  );
}
