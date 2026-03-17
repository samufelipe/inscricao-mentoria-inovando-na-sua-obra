import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import logoImg from "@/assets/alem-da-tendencia/inovando-obra-new.png";

// ============================================================
// DATA CONSTANTS — Atualize aqui com os novos dados
// ============================================================

const REPORT_TITLE = "Relatório Geral de Resultados";
const REPORT_SUBTITLE = "Lançamento Inovando na sua Obra";
const REPORT_PERIOD = "07/01 - 09/02/2026";
const REPORT_GENERATED = "10/02/2026";

// Resumo Executivo
const SUMMARY = {
  investimento: { value: 9242.5, label: "Investimento Total", sub: "Meta Ads" },
  receita: { value: 63143.91, label: "Receita Total", sub: "Hotmart" },
  resultado: { value: 53901.41, label: "Resultado sobre Ads", sub: "Receita - Ads" },
  roi: { value: 583.2, label: "ROI Consolidado", sub: "ROAS 6,83x", isPercent: true },
};

const ROAS_VALUE = "6,83";

// Imersão - Captação e Vendas
const IMERSAO = {
  periodo: "07/01 - 30/01/2026 · 24 dias de campanha",
  metaAds: {
    investimento: "R$ 6.674,11",
    impressoes: "384.254",
    alcance: "107.211",
    ctr: "1,59%",
    cpl: "R$ 11,45",
  },
  leads: {
    total: 581,
    fontes: [
      { label: "Meta Ads", value: 263, percent: 44.4, color: "#5B7FB5" },
      { label: "Instagram Orgânico", value: 169, percent: 28.6, color: "#C06080" },
      { label: "Acesso Direto", value: 161, percent: 27.2, color: "#C9A84C" },
    ],
    nota: '* 12 leads acessaram por mais de uma fonte (soma = 593, únicos = 581)',
  },
  vendasHotmart: {
    title: "Vendas Hotmart - Imersão",
    items: [
      { label: "Vendas confirmadas", value: "496", highlight: true },
      { label: "Receita bruta", value: "R$ 11.537,72", color: "green" },
      { label: "Ticket médio", value: "R$ 23,26" },
      { label: "Taxa de conversão", value: "85,4%" },
    ],
  },
  criativos: {
    title: "Criativos - Desempenho por Campanha",
    items: [
      { label: "Imersão Principal", vendas: 74, invest: "R$ 3.951,87", cpa: "R$ 53,40" },
      { label: "Imersão RMKT", vendas: 156, invest: "R$ 2.722,24", cpa: "R$ 17,45" },
    ],
  },
  financeiro: {
    title: "Consolidado Financeiro - Imersão",
    receita: "R$ 11.537,72",
    investimento: "R$ 6.674,11",
    resultado: "R$ 4.863,61",
    roi: "72,9%",
    roas: "1,73x",
  },
  emails: {
    title: "Disparo de E-mails (RD Station)",
    items: [
      { label: "E-mails enviados", value: "4.455" },
      { label: "Taxa de abertura", value: "43,2%" },
      { label: "Taxa de clique", value: "3,8%" },
    ],
  },
};

// Mentoria - Vendas
const MENTORIA = {
  periodo: "31/01 - 09/02/2026 · 10 dias de campanha",
  metaAds: {
    investimento: "R$ 2.568,39",
    impressoes: "104.832",
    alcance: "34.521",
    ctr: "2,14%",
    cpl: "R$ 12,47",
  },
  vendas: {
    title: "Vendas Hotmart - Mentoria",
    items: [
      { label: "Vendas confirmadas", value: "33", highlight: true },
      { label: "Receita bruta", value: "R$ 51.606,19", color: "green" },
      { label: "Ticket médio", value: "R$ 1.563,82" },
    ],
  },
  distribuicao: {
    title: "Distribuição de Vendas",
    items: [
      { label: "Pagamento único", value: "8 vendas", detail: "R$ 14.136,00" },
      { label: "Parcelado (até 12x)", value: "25 vendas", detail: "R$ 37.470,19" },
    ],
  },
  funilCheckout: {
    title: "Funil de Checkout",
    items: [
      { label: "Iniciaram checkout", value: "206" },
      { label: "Finalizaram compra", value: "33" },
      { label: "Taxa de conversão", value: "16,0%", color: "gold" },
    ],
  },
  vendasPorDia: {
    title: "Vendas por Dia - Mentoria",
    data: [
      { dia: "31/01", vendas: 5 },
      { dia: "01/02", vendas: 3 },
      { dia: "02/02", vendas: 4 },
      { dia: "03/02", vendas: 2 },
      { dia: "04/02", vendas: 3 },
      { dia: "05/02", vendas: 4 },
      { dia: "06/02", vendas: 3 },
      { dia: "07/02", vendas: 2 },
      { dia: "08/02", vendas: 4 },
      { dia: "09/02", vendas: 3 },
    ],
  },
  criativos: {
    title: "Criativos - Desempenho por Campanha",
    items: [
      { label: "Mentoria Principal", vendas: 9, invest: "R$ 1.843,27", cpa: "R$ 204,81" },
      { label: "Mentoria RMKT", vendas: 5, invest: "R$ 725,12", cpa: "R$ 145,02" },
    ],
  },
  financeiro: {
    title: "Consolidado Financeiro - Mentoria",
    receita: "R$ 51.606,19",
    investimento: "R$ 2.568,39",
    resultado: "R$ 49.037,80",
    roi: "1909,2%",
    roas: "20,09x",
  },
  emails: {
    title: "Disparo de E-mails (RD Station)",
    items: [
      { label: "E-mails enviados", value: "2.187" },
      { label: "Taxa de abertura", value: "51,7%" },
      { label: "Taxa de clique", value: "5,2%" },
    ],
  },
};

// Comparativo
const COMPARATIVO = {
  title: "Comparativo Imersão vs Mentoria",
  headers: ["Métrica", "Imersão", "Mentoria"],
  rows: [
    ["Investimento Ads", "R$ 6.674,11", "R$ 2.568,39"],
    ["Receita Bruta", "R$ 11.537,72", "R$ 51.606,19"],
    ["Resultado", "R$ 4.863,61", "R$ 49.037,80"],
    ["ROI", "72,9%", "1909,2%"],
    ["ROAS", "1,73x", "20,09x"],
    ["Vendas", "496", "33"],
    ["Ticket Médio", "R$ 23,26", "R$ 1.563,82"],
  ],
};

// Consolidado Final
const CONSOLIDADO = {
  title: "Consolidado Financeiro Geral",
  rows: [
    { label: "Receita Total (Hotmart)", value: "R$ 63.143,91", color: "green" },
    { label: "Investimento Total (Meta Ads)", value: "R$ 9.242,50", color: "gold" },
    { label: "Resultado sobre Ads", value: "R$ 53.901,41", color: "green" },
    { label: "ROI Consolidado", value: "583,2%", color: "gold" },
    { label: "ROAS Consolidado", value: "6,83x", color: "gold" },
  ],
};

// Oportunidade
const OPORTUNIDADE = {
  title: "Oportunidade de Receita",
  subtitle: "206 leads quentes iniciaram checkout mas não finalizaram a compra da Mentoria.",
  estrategias: [
    {
      title: "Remarketing Ativo",
      desc: "Campanha segmentada no Meta Ads para os 206 leads com checkout iniciado, usando criativos de urgência e escassez.",
    },
    {
      title: "Sequência de E-mails",
      desc: "Fluxo automatizado no RD Station com 3 a 5 e-mails de recuperação, incluindo depoimentos e oferta especial.",
    },
    {
      title: "Abordagem Direta",
      desc: "Contato via WhatsApp ou ligação para os leads mais quentes, oferecendo condições exclusivas de pagamento.",
    },
  ],
};

// Observações
const OBSERVACOES = {
  pontosFortes: [
    "ROI de 583,2% e ROAS de 6,83x demonstram excelente eficiência do investimento",
    "Mentoria apresentou ROI de 1909,2%, indicando alto valor percebido pelo público",
    "Taxa de conversão de 85,4% na Imersão mostra forte alinhamento entre oferta e audiência",
    "Custo por lead médio de R$ 11,45 está dentro de benchmarks saudáveis para o nicho",
  ],
  pontosAtencao: [
    "206 leads quentes no checkout da Mentoria representam potencial não convertido significativo",
    "Plano atual do RD Station atingiu o limite, necessitando upgrade (a partir de R$ 418/mês)",
    "Concentração de receita na Mentoria (81,7%) pode representar risco se não diversificada",
  ],
  acoesPrioritarias: [
    "Implementar campanha de remarketing para os 206 leads do checkout",
    "Avaliar upgrade do RD Station para manter automações ativas",
    "Desenvolver estratégia de upsell da Imersão para Mentoria em próximos lançamentos",
    "Criar sequência de nutrição para leads que não converteram",
  ],
  estrategiaCrescimento: [
    "Expandir base orgânica do Instagram com conteúdo estratégico entre lançamentos",
    "Testar novos formatos de criativos (Reels, carrossel) para reduzir CPL",
    "Implementar programa de indicação para alunos da Mentoria",
    "Desenvolver produto intermediário entre Imersão e Mentoria para aumentar LTV",
  ],
};

// Fontes
const FONTES = [
  { fonte: "Meta Ads", tipo: "Gerenciador de Anúncios", acesso: "Business Manager" },
  { fonte: "Hotmart", tipo: "Plataforma de Vendas", acesso: "Dashboard do Produtor" },
  { fonte: "RD Station", tipo: "Automação de Marketing", acesso: "Painel de Relatórios" },
  { fonte: "Google Analytics", tipo: "Análise de Tráfego", acesso: "GA4 Dashboard" },
];

// ============================================================
// COLORS
// ============================================================
const C = {
  bg: "#111111",
  card: "#1a1a1a",
  border: "#2a2a2a",
  gold: "#C9A84C",
  green: "#5cb85c",
  red: "#d9534f",
  blue: "#5B7FB5",
  pink: "#C06080",
  text: "#e8e4dd",
  muted: "#8a857d",
};

// ============================================================
// HELPER COMPONENTS
// ============================================================

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, prefix = "", suffix = "", duration = 1800 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const { ref, visible } = useInView(0.3);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  const formatted = target % 1 !== 0
    ? val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : Math.round(val).toLocaleString("pt-BR");

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <FadeIn>
      <div className="mb-8">
        <h2
          className="text-lg tracking-[0.2em] font-light uppercase"
          style={{ color: C.gold, fontFamily: "Inter, sans-serif" }}
        >
          {children}
        </h2>
        {sub && (
          <p className="text-sm mt-1" style={{ color: C.muted, fontFamily: "Inter, sans-serif" }}>
            {sub}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

function Divider() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: C.border }} />
      <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" />
      </svg>
      <div className="flex-1 h-px" style={{ background: C.border }} />
    </div>
  );
}

function KPICard({ label, value, sub, color, delay = 0, isPercent = false }: {
  label: string; value: number; sub: string; color: string; delay?: number; isPercent?: boolean;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="p-5 border-b-2" style={{ background: C.card, borderBottomColor: color, transition: "transform 0.3s, box-shadow 0.3s" }}>
        <p className="text-[11px] uppercase tracking-[0.15em] mb-2" style={{ color: C.muted, fontFamily: "Inter, sans-serif" }}>{label}</p>
        <p className="text-2xl font-light tracking-tight" style={{ color, fontFamily: "Inter, sans-serif" }}>
          {isPercent
            ? <CountUp target={value} suffix="%" />
            : <CountUp target={value} prefix="R$\u00A0" />}
        </p>
        <p className="text-xs mt-1" style={{ color: C.muted }}>{sub}</p>
      </div>
    </FadeIn>
  );
}

function DataRow({ label, value, colorVal, border = true }: { label: string; value: string; colorVal?: string; border?: boolean }) {
  return (
    <div className={`flex justify-between py-2.5 ${border ? "border-b" : ""}`} style={{ borderColor: C.border }}>
      <span className="text-sm" style={{ color: C.muted }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: colorVal || C.text }}>{value}</span>
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] uppercase tracking-[0.15em] mb-4 pb-2 border-b" style={{ color: C.gold, borderColor: C.border, fontFamily: "Inter, sans-serif" }}>
      {children}
    </h4>
  );
}

function Glossary() {
  const [openRoi, setOpenRoi] = useState(false);
  const [openRoas, setOpenRoas] = useState(false);
  return (
    <FadeIn delay={100}>
      <div className="grid md:grid-cols-2 gap-px mt-6" style={{ background: C.border }}>
        <GlossaryItem
          title="O que é ROI?"
          open={openRoi}
          toggle={() => setOpenRoi(p => !p)}
          text={`ROI (Retorno sobre o Investimento) mede o lucro em relação ao valor investido. É calculado assim: (Receita - Investimento) / Investimento × 100. Exemplo: se você investiu R$ 100 e faturou R$ 600, seu ROI é de 500%. Quanto maior, melhor o aproveitamento do investimento.`}
        />
        <GlossaryItem
          title="O que é ROAS?"
          open={openRoas}
          toggle={() => setOpenRoas(p => !p)}
          text={`ROAS (Retorno sobre o Gasto com Anúncios) mostra quanto de receita cada real investido em anúncios gerou. Cálculo: Receita / Investimento em Ads. Exemplo: ROAS de 6,83x significa que cada R$ 1 em anúncios gerou R$ 6,83 em vendas. É a métrica mais direta para avaliar a eficiência dos anúncios.`}
        />
      </div>
    </FadeIn>
  );
}

function GlossaryItem({ title, open, toggle, text }: { title: string; open: boolean; toggle: () => void; text: string }) {
  return (
    <div className="cursor-pointer" style={{ background: C.card }} onClick={toggle}>
      <div className="flex justify-between items-center p-5">
        <p className="text-sm font-medium select-none" style={{ color: C.gold }}>{title}</p>
        <ChevronDown size={16} style={{ color: C.gold, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
      </div>
      <div style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s, opacity 0.4s" }}>
        <div className="px-5 pb-5 pt-0">
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{text}</p>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ data, size = 160 }: { data: { label: string; value: number; percent: number; color: string }[]; size?: number }) {
  const r = size / 2;
  const innerR = r * 0.55;
  const outerR = r * 0.85;
  let cumulative = 0;

  const arcs = data.map((d) => {
    const startAngle = cumulative * 3.6 * (Math.PI / 180);
    cumulative += d.percent;
    const endAngle = cumulative * 3.6 * (Math.PI / 180);
    const largeArc = d.percent > 50 ? 1 : 0;

    const x1o = r + outerR * Math.sin(startAngle);
    const y1o = r - outerR * Math.cos(startAngle);
    const x2o = r + outerR * Math.sin(endAngle);
    const y2o = r - outerR * Math.cos(endAngle);
    const x1i = r + innerR * Math.sin(endAngle);
    const y1i = r - innerR * Math.cos(endAngle);
    const x2i = r + innerR * Math.sin(startAngle);
    const y2i = r - innerR * Math.cos(startAngle);

    const path = `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const labelR = outerR + 18;
    const lx = r + labelR * Math.sin(midAngle);
    const ly = r - labelR * Math.cos(midAngle);

    return { ...d, path, lx, ly, midAngle };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size + 60} height={size + 40} viewBox={`-30 -10 ${size + 60} ${size + 40}`}>
        {arcs.map((a, i) => (
          <g key={i}>
            <path d={a.path} fill={a.color} stroke="transparent" strokeWidth="1" />
            <text x={a.lx} y={a.ly} fill={C.text} fontSize="11" textAnchor="middle" dominantBaseline="middle">
              {a.percent}%
            </text>
          </g>
        ))}
      </svg>
      <div className="flex flex-col gap-1.5 mt-2 w-full">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
            <span style={{ color: C.muted }}>{d.label}</span>
            <span className="ml-auto font-medium" style={{ color: C.text }}>{d.value} leads ({d.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data, title }: { data: { dia: string; vendas: number }[]; title: string }) {
  const max = Math.max(...data.map(d => d.vendas));
  return (
    <div className="p-5" style={{ background: C.card }}>
      <CardTitle>{title}</CardTitle>
      <div className="flex items-end gap-1.5 h-32 mt-4">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium" style={{ color: C.text }}>{d.vendas}</span>
            <div
              className="w-full rounded-t"
              style={{
                height: `${(d.vendas / max) * 100}%`,
                background: `linear-gradient(to top, ${C.gold}, ${C.gold}dd)`,
                minHeight: "4px",
              }}
            />
            <span className="text-[9px] mt-1" style={{ color: C.muted }}>{d.dia.split("/")[0]}/{d.dia.split("/")[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonBarChart() {
  const items = [
    { label: "Investimento", imersao: 6674.11, mentoria: 2568.39, max: 6674.11 },
    { label: "Receita", imersao: 11537.72, mentoria: 51606.19, max: 51606.19 },
    { label: "Resultado", imersao: 4863.61, mentoria: 49037.80, max: 49037.80 },
  ];
  return (
    <div className="p-5" style={{ background: C.card }}>
      <CardTitle>Comparativo Visual</CardTitle>
      <div className="space-y-4 mt-4">
        {items.map((item, i) => (
          <div key={i}>
            <p className="text-xs mb-1.5" style={{ color: C.muted }}>{item.label}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] w-16 shrink-0" style={{ color: C.blue }}>Imersão</span>
                <div className="flex-1 h-4 rounded" style={{ background: C.border }}>
                  <div className="h-full rounded" style={{ width: `${(item.imersao / item.max) * 100}%`, background: C.blue }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] w-16 shrink-0" style={{ color: C.gold }}>Mentoria</span>
                <div className="flex-1 h-4 rounded" style={{ background: C.border }}>
                  <div className="h-full rounded" style={{ width: `${(item.mentoria / item.max) * 100}%`, background: C.gold }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BorderCard({ children, borderColor = C.gold, className = "" }: { children: React.ReactNode; borderColor?: string; className?: string }) {
  return (
    <div className={`border-l-2 pl-4 py-3 ${className}`} style={{ borderColor }}>
      {children}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Relatorio() {
  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: "Inter, sans-serif" }}>
      {/* Print button */}
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg hover:scale-105 transition-transform"
        style={{ background: C.gold, color: "#111" }}
      >
        Exportar PDF
      </button>

      <div className="max-w-4xl mx-auto px-8 py-12 print:px-4 print:py-4">
        {/* HEADER */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4">
              <img
                src={logoImg}
                alt="Inovando na sua Obra"
                className="w-10 h-10 object-contain"
                style={{ mixBlendMode: "lighten" }}
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-light tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                  {REPORT_TITLE}
                </h1>
                <p className="text-sm mt-0.5" style={{ color: C.gold }}>{REPORT_SUBTITLE}</p>
              </div>
            </div>
            <div className="text-right text-sm" style={{ color: C.muted }}>
              <p>Período: <span style={{ color: C.text }}>{REPORT_PERIOD}</span></p>
              <p>Gerado em: <span style={{ color: C.text }}>{REPORT_GENERATED}</span></p>
            </div>
          </div>
        </FadeIn>

        {/* RESUMO EXECUTIVO */}
        <SectionTitle>Resumo Executivo</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-6" style={{ background: C.border }}>
          <KPICard label={SUMMARY.investimento.label} value={SUMMARY.investimento.value} sub={SUMMARY.investimento.sub} color={C.gold} delay={0} />
          <KPICard label={SUMMARY.receita.label} value={SUMMARY.receita.value} sub={SUMMARY.receita.sub} color={C.green} delay={100} />
          <KPICard label={SUMMARY.resultado.label} value={SUMMARY.resultado.value} sub={SUMMARY.resultado.sub} color={C.green} delay={200} />
          <KPICard label={SUMMARY.roi.label} value={SUMMARY.roi.value} sub={SUMMARY.roi.sub} color={C.gold} delay={300} isPercent />
        </div>

        <FadeIn delay={400}>
          <div className="p-4 text-center text-sm font-light" style={{ background: C.card, color: C.muted }}>
            Para cada <span style={{ color: C.gold }}>R$ 1,00</span> investido, retornaram <span style={{ color: C.green }}>R$ {ROAS_VALUE}</span> em receita.
          </div>
          <p className="text-[10px] mt-2 text-center" style={{ color: C.muted }}>
            * "Resultado sobre Ads" considera apenas a diferença entre receita bruta Hotmart e investimento em anúncios. Não inclui taxas da Hotmart, impostos ou custos operacionais.
          </p>
        </FadeIn>

        <Glossary />
        <Divider />

        {/* IMERSÃO */}
        <SectionTitle sub={IMERSAO.periodo}>Imersão - Captação e Vendas</SectionTitle>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Meta Ads - Desempenho</CardTitle>
              <DataRow label="Investimento" value={IMERSAO.metaAds.investimento} colorVal={C.gold} />
              <DataRow label="Impressões" value={IMERSAO.metaAds.impressoes} />
              <DataRow label="Alcance" value={IMERSAO.metaAds.alcance} />
              <DataRow label="CTR" value={IMERSAO.metaAds.ctr} />
              <DataRow label="CPL" value={IMERSAO.metaAds.cpl} border={false} />
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{IMERSAO.leads.total} Leads por Fonte</CardTitle>
              <DonutChart data={IMERSAO.leads.fontes} />
              <p className="text-[10px] mt-3" style={{ color: C.muted }}>{IMERSAO.leads.nota}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{IMERSAO.vendasHotmart.title}</CardTitle>
              {IMERSAO.vendasHotmart.items.map((item, i) => (
                <DataRow
                  key={i}
                  label={item.label}
                  value={item.value}
                  colorVal={item.color === "green" ? C.green : item.highlight ? C.text : undefined}
                  border={i < IMERSAO.vendasHotmart.items.length - 1}
                />
              ))}
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{IMERSAO.criativos.title}</CardTitle>
              {IMERSAO.criativos.items.map((item, i) => (
                <div key={i} className={`py-3 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: C.border }}>
                  <p className="text-sm font-medium mb-1" style={{ color: C.text }}>{item.label}</p>
                  <div className="flex gap-4 text-xs" style={{ color: C.muted }}>
                    <span><span style={{ color: C.green }}>{item.vendas}</span> vendas</span>
                    <span>Invest: {item.invest}</span>
                    <span>CPA: {item.cpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{IMERSAO.financeiro.title}</CardTitle>
              <DataRow label="Receita" value={IMERSAO.financeiro.receita} colorVal={C.green} />
              <DataRow label="Investimento" value={IMERSAO.financeiro.investimento} colorVal={C.gold} />
              <DataRow label="Resultado" value={IMERSAO.financeiro.resultado} colorVal={C.green} />
              <DataRow label="ROI" value={IMERSAO.financeiro.roi} colorVal={C.gold} />
              <DataRow label="ROAS" value={IMERSAO.financeiro.roas} colorVal={C.gold} border={false} />
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{IMERSAO.emails.title}</CardTitle>
              {IMERSAO.emails.items.map((item, i) => (
                <DataRow key={i} label={item.label} value={item.value} border={i < IMERSAO.emails.items.length - 1} />
              ))}
            </div>
          </div>
        </FadeIn>

        <Divider />

        {/* MENTORIA */}
        <SectionTitle sub={MENTORIA.periodo}>Mentoria - Vendas</SectionTitle>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Meta Ads - Desempenho</CardTitle>
              <DataRow label="Investimento" value={MENTORIA.metaAds.investimento} colorVal={C.gold} />
              <DataRow label="Impressões" value={MENTORIA.metaAds.impressoes} />
              <DataRow label="Alcance" value={MENTORIA.metaAds.alcance} />
              <DataRow label="CTR" value={MENTORIA.metaAds.ctr} />
              <DataRow label="CPL" value={MENTORIA.metaAds.cpl} border={false} />
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{MENTORIA.vendas.title}</CardTitle>
              {MENTORIA.vendas.items.map((item, i) => (
                <DataRow
                  key={i}
                  label={item.label}
                  value={item.value}
                  colorVal={item.color === "green" ? C.green : item.highlight ? C.text : undefined}
                  border={i < MENTORIA.vendas.items.length - 1}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{MENTORIA.distribuicao.title}</CardTitle>
              {MENTORIA.distribuicao.items.map((item, i) => (
                <div key={i} className={`py-2.5 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: C.border }}>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: C.muted }}>{item.label}</span>
                    <span className="text-sm font-medium" style={{ color: C.text }}>{item.value}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{MENTORIA.funilCheckout.title}</CardTitle>
              {MENTORIA.funilCheckout.items.map((item, i) => (
                <DataRow
                  key={i}
                  label={item.label}
                  value={item.value}
                  colorVal={item.color === "gold" ? C.gold : undefined}
                  border={i < MENTORIA.funilCheckout.items.length - 1}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <BarChart data={MENTORIA.vendasPorDia.data} title={MENTORIA.vendasPorDia.title} />
        </FadeIn>

        <FadeIn delay={100} className="mt-6">
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{MENTORIA.criativos.title}</CardTitle>
              {MENTORIA.criativos.items.map((item, i) => (
                <div key={i} className={`py-3 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: C.border }}>
                  <p className="text-sm font-medium mb-1" style={{ color: C.text }}>{item.label}</p>
                  <div className="flex gap-4 text-xs" style={{ color: C.muted }}>
                    <span><span style={{ color: C.green }}>{item.vendas}</span> vendas</span>
                    <span>Invest: {item.invest}</span>
                    <span>CPA: {item.cpa}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>{MENTORIA.financeiro.title}</CardTitle>
              <DataRow label="Receita" value={MENTORIA.financeiro.receita} colorVal={C.green} />
              <DataRow label="Investimento" value={MENTORIA.financeiro.investimento} colorVal={C.gold} />
              <DataRow label="Resultado" value={MENTORIA.financeiro.resultado} colorVal={C.green} />
              <DataRow label="ROI" value={MENTORIA.financeiro.roi} colorVal={C.gold} />
              <DataRow label="ROAS" value={MENTORIA.financeiro.roas} colorVal={C.gold} border={false} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="p-5 mb-6" style={{ background: C.card }}>
            <CardTitle>{MENTORIA.emails.title}</CardTitle>
            {MENTORIA.emails.items.map((item, i) => (
              <DataRow key={i} label={item.label} value={item.value} border={i < MENTORIA.emails.items.length - 1} />
            ))}
          </div>
        </FadeIn>

        <Divider />

        {/* COMPARATIVO */}
        <SectionTitle>{COMPARATIVO.title}</SectionTitle>

        <FadeIn delay={100}>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm" style={{ background: C.card }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {COMPARATIVO.headers.map((h, i) => (
                    <th key={i} className="text-left p-4 text-[11px] uppercase tracking-[0.15em] font-medium" style={{ color: i === 0 ? C.muted : C.gold }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < COMPARATIVO.rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-4" style={{ color: j === 0 ? C.muted : C.text }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <ComparisonBarChart />
        </FadeIn>

        <Divider />

        {/* CONSOLIDADO FINANCEIRO */}
        <SectionTitle>{CONSOLIDADO.title}</SectionTitle>

        <FadeIn delay={100}>
          <div className="p-5 mb-6" style={{ background: C.card }}>
            {CONSOLIDADO.rows.map((row, i) => (
              <DataRow
                key={i}
                label={row.label}
                value={row.value}
                colorVal={row.color === "green" ? C.green : C.gold}
                border={i < CONSOLIDADO.rows.length - 1}
              />
            ))}
          </div>
        </FadeIn>

        <Divider />

        {/* OPORTUNIDADE */}
        <SectionTitle>{OPORTUNIDADE.title}</SectionTitle>

        <FadeIn delay={100}>
          <div className="p-5 mb-6" style={{ background: C.card }}>
            <p className="text-sm mb-6" style={{ color: C.muted }}>{OPORTUNIDADE.subtitle}</p>
            <div className="space-y-4">
              {OPORTUNIDADE.estrategias.map((e, i) => (
                <BorderCard key={i} borderColor={i === 0 ? C.blue : i === 1 ? C.gold : C.green}>
                  <p className="text-sm font-medium mb-1" style={{ color: C.text }}>{e.title}</p>
                  <p className="text-sm" style={{ color: C.muted }}>{e.desc}</p>
                </BorderCard>
              ))}
            </div>
          </div>
        </FadeIn>

        <Divider />

        {/* OBSERVAÇÕES */}
        <SectionTitle>Observações e Recomendações</SectionTitle>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Pontos Fortes</CardTitle>
              <ul className="space-y-2">
                {OBSERVACOES.pontosFortes.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.muted }}>
                    <span style={{ color: C.green }}>+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Pontos de Atenção</CardTitle>
              <ul className="space-y-2">
                {OBSERVACOES.pontosAtencao.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.muted }}>
                    <span style={{ color: C.red }}>!</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid md:grid-cols-2 gap-px mb-6" style={{ background: C.border }}>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Ações Prioritárias</CardTitle>
              <ul className="space-y-2">
                {OBSERVACOES.acoesPrioritarias.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.muted }}>
                    <span style={{ color: C.gold }}>{i + 1}.</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5" style={{ background: C.card }}>
              <CardTitle>Estratégia de Crescimento</CardTitle>
              <ul className="space-y-2">
                {OBSERVACOES.estrategiaCrescimento.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.muted }}>
                    <span style={{ color: C.blue }}>→</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <Divider />

        {/* FONTES */}
        <SectionTitle>Fontes dos Dados</SectionTitle>

        <FadeIn delay={100}>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm" style={{ background: C.card }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <th className="text-left p-4 text-[11px] uppercase tracking-[0.15em] font-medium" style={{ color: C.gold }}>Fonte</th>
                  <th className="text-left p-4 text-[11px] uppercase tracking-[0.15em] font-medium" style={{ color: C.gold }}>Tipo</th>
                  <th className="text-left p-4 text-[11px] uppercase tracking-[0.15em] font-medium" style={{ color: C.gold }}>Acesso</th>
                </tr>
              </thead>
              <tbody>
                {FONTES.map((f, i) => (
                  <tr key={i} style={{ borderBottom: i < FONTES.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <td className="p-4" style={{ color: C.text }}>{f.fonte}</td>
                    <td className="p-4" style={{ color: C.muted }}>{f.tipo}</td>
                    <td className="p-4" style={{ color: C.muted }}>{f.acesso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* FOOTER */}
        <FadeIn>
          <div className="mt-12 pt-6 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
            <img src={logoImg} alt="Inovando na sua Obra" className="w-8 h-8 mx-auto mb-3 object-contain" style={{ mixBlendMode: "lighten" }} />
            <p className="text-xs" style={{ color: C.muted }}>
              Relatório gerado em {REPORT_GENERATED} · Dados consolidados de {REPORT_PERIOD}
            </p>
            <p className="text-[10px] mt-1" style={{ color: C.muted }}>
              Inovando na sua Obra · Todos os direitos reservados
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
