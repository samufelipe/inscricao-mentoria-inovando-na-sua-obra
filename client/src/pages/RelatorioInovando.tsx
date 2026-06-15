import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ExternalLink, TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  ArrowRight, BarChart2, Users, DollarSign, Target, Zap, Award,
} from "lucide-react";
import imgLogo from "@/assets/mentoria/logo.png";

// =============================================
// PALETA
// =============================================
const C = {
  cream:  "#FAF8F4",
  white:  "#FFFFFF",
  ink:    "#1C1C1A",
  muted:  "#7A7A77",
  border: "#E8E4DC",
  gold:   "#C9A257",
  goldDim:"rgba(201,162,87,0.12)",
  green:  "#2E7D32",
  dark:   "#1A1510",
  darkMid:"#252018",
};

// =============================================
// DADOS — editar aqui quando chegar os dados do Meta
// =============================================
const REPORT_META = {
  periodo: "04 de maio a 29 de maio de 2026",
  geradoEm: "01/06/2026",
};

const CAPTACAO_IMERSAO = {
  investimento: 8648.13,
  inscricoes: 294,
  custoporInscricao: 29.42,
  valorInscricao: 39.90,
  faturamento: 9492.80,
  roas: 1.10,
  mediaAoVivo: 160,
  criativos: [
    // Inserir dados dos criativos campeoes
    // { link: "URL_DO_CRIATIVO", label: "Nome do criativo", ctr: "2,4%", cpl: 29.42 },
  ] as Array<{ link: string; label: string; ctr: string; cpl: number }>,
  observacoes: [
    "A captacao cobriu 109% do investimento em ads: ROAS de 1,10x so com a imersao.",
    "Custo por inscricao de R$ 29,42 para um ingresso de R$ 39,90 — margem apertada, mas justificada pelo modelo: a imersao e a porta de entrada para a Mentoria.",
    "Media de 160 pessoas ao vivo demonstra alto engajamento e qualidade da base captada.",
  ],
};

const CAMPANHAS_MENTORIA = {
  investimento: 0,    // TODO: inserir dados do Meta
  leads: 0,           // TODO
  cpl: 0,             // TODO
  alcance: 0,         // TODO
  impressoes: 0,      // TODO
  ctr: "0,00%",       // TODO
  criativos: [
    // { link: "URL", label: "Nome", ctr: "X%", leads: 0, cpl: 0 },
  ] as Array<{ link: string; label: string; ctr: string; leads: number; cpl: number }>,
  observacoes: [
    // Inserir observacoes apos receber dados do Meta
  ] as string[],
};

// Totais consolidados
const TOTAL = {
  investimento: CAPTACAO_IMERSAO.investimento + CAMPANHAS_MENTORIA.investimento,
  faturamento:  CAPTACAO_IMERSAO.faturamento,
};

const PIE_DATA = [
  { name: "Captacao Imersao", value: CAPTACAO_IMERSAO.investimento, color: C.gold },
  ...(CAMPANHAS_MENTORIA.investimento > 0
    ? [{ name: "Campanhas Mentoria", value: CAMPANHAS_MENTORIA.investimento, color: C.green }]
    : []),
];

const PONTOS_FORTES = [
  "Captacao da Imersao com ROAS de 1,10x: o investimento em ads se pagou integralmente so com as inscricoes.",
  "294 inscricoes a R$ 29,42 de custo medio: base qualificada construida para o periodo de vagas da Mentoria.",
  "Media de 160 pessoas ao vivo durante a Imersao: taxa de presenca alta em relacao ao total de inscritos.",
];

const PONTOS_ATENCAO = [
  "O lucro real da campanha completa depende das vendas da Mentoria no periodo de vagas abertas (01/06 a 12/06).",
  "Vendas da Mentoria: 0 ao final da Imersao. Contexto esperado em produtos de ticket alto — o lead precisa de mais pontos de contato.",
  "Grupo VIP com 7 pessoas: canal de conversao ativo que precisa de comunicacao consistente e conteudo diario.",
];

const ACOES_PRIORITARIAS = [
  "Manter fluxo Reportana ativo com as 13 mensagens configuradas durante todo o periodo de vagas.",
  "Alimentar o Grupo VIP diariamente com bastidores, depoimentos e presenca das mentoras.",
  "Ativar retargeting no Meta Ads para o publico que visitou a LP da Mentoria mas nao comprou.",
  "Publicar Stories com contagem regressiva diaria ate 12/06 no Instagram organico.",
];

// =============================================
// HELPERS
// =============================================
function fmt(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtRoas(v: number) {
  return `${v.toFixed(2).replace(".", ",")}x`;
}

// =============================================
// ANIMATED NUMBER
// =============================================
function AnimatedNumber({
  value, prefix = "", suffix = "", decimals,
}: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const dur = 1400;
          const animate = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setDisplay(ease * value);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const dec = decimals ?? (suffix === "x" ? 2 : prefix === "R$ " ? 2 : 0);
  const text =
    prefix === "R$ "
      ? `R$ ${display.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `${prefix}${display.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec })}${suffix}`;

  return <span ref={ref}>{text}</span>;
}

// =============================================
// FADE IN SECTION
// =============================================
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

// =============================================
// SECTION LABEL
// =============================================
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const col = light ? "rgba(201,162,87,0.8)" : C.gold;
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px" style={{ backgroundColor: col }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: col }}>
        {children}
      </span>
      <div className="w-6 h-px" style={{ backgroundColor: col }} />
    </div>
  );
}

// =============================================
// KPI CARD
// =============================================
function KpiCard({
  label, value, sub, positive, light = false,
}: { label: string; value: React.ReactNode; sub?: string; positive?: boolean; light?: boolean }) {
  const bg    = light ? "rgba(255,255,255,0.06)" : C.white;
  const brd   = light ? "rgba(255,255,255,0.1)"  : C.border;
  const lbl   = light ? "rgba(255,255,255,0.45)" : C.muted;
  const subTx = light ? "rgba(255,255,255,0.3)"  : C.muted;
  const valCol = positive === true ? C.green : positive === false ? "#B71C1C" : (light ? C.white : C.ink);
  return (
    <div
      className="rounded-lg p-5 flex flex-col gap-1"
      style={{ backgroundColor: bg, border: `1px solid ${brd}` }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: lbl }}>{label}</span>
      <span className="text-xl md:text-2xl font-black" style={{ color: valCol }}>{value}</span>
      {sub && <span className="text-[11px]" style={{ color: subTx }}>{sub}</span>}
    </div>
  );
}

// =============================================
// STAT ROW
// =============================================
function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b last:border-0" style={{ borderColor: C.border }}>
      <span className="text-sm" style={{ color: C.muted }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: highlight ? C.green : C.ink }}>{value}</span>
    </div>
  );
}

// =============================================
// CREATIVE LINK
// =============================================
function CreativeLink({ link, label }: { link: string; label: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
      style={{ color: C.gold }}
    >
      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
      {label}
    </a>
  );
}

// =============================================
// DIVIDER
// =============================================
function Divider({ light = false }: { light?: boolean }) {
  const col = light ? "rgba(255,255,255,0.08)" : C.border;
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px" style={{ backgroundColor: col }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${light ? "rgba(201,162,87,0.4)" : C.gold}` }} />
      <div className="flex-1 h-px" style={{ backgroundColor: col }} />
    </div>
  );
}

// =============================================
// CUSTOM PIE TOOLTIP
// =============================================
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-4 py-3 shadow-xl" style={{ backgroundColor: C.dark, border: `1px solid ${C.gold}` }}>
      <p className="text-xs font-bold mb-1" style={{ color: C.gold }}>{payload[0].name}</p>
      <p className="text-sm font-black" style={{ color: C.white }}>{fmt(payload[0].value)}</p>
    </div>
  );
}

// =============================================
// MAIN PAGE
// =============================================
export default function RelatorioInovando() {
  useEffect(() => {
    document.title = "Relatorio de Resultados · Inovando na Sua Obra";
  }, []);

  const mentoriaTemDados = CAMPANHAS_MENTORIA.investimento > 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.cream }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ backgroundColor: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <Fade>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <img src={imgLogo} alt="Inovando na Sua Obra" className="h-10 w-auto opacity-90" />
                <div className="w-px h-10 opacity-20" style={{ backgroundColor: C.gold }} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1" style={{ color: C.gold }}>
                    Relatorio de Resultados
                  </p>
                  <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight" style={{ color: C.white }}>
                    Campanhas Meta Ads
                  </h1>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Periodo</p>
                <p className="text-sm font-semibold" style={{ color: C.white }}>{REPORT_META.periodo}</p>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Gerado em {REPORT_META.geradoEm}</p>
              </div>
            </div>

            {/* Header divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,162,87,0.2)" }} />
              <BarChart2 className="w-4 h-4" style={{ color: "rgba(201,162,87,0.4)" }} />
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,162,87,0.2)" }} />
            </div>

            {/* Header KPIs */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <KpiCard
                light
                label="Total Investido"
                value={<AnimatedNumber value={TOTAL.investimento} prefix="R$ " />}
                sub="Meta Ads"
              />
              <KpiCard
                light
                label="Faturamento Imersao"
                value={<AnimatedNumber value={CAPTACAO_IMERSAO.faturamento} prefix="R$ " />}
                sub="Hotmart"
                positive
              />
              <KpiCard
                light
                label="Inscricoes Imersao"
                value={<AnimatedNumber value={CAPTACAO_IMERSAO.inscricoes} />}
                sub={`a R$ ${CAPTACAO_IMERSAO.valorInscricao.toFixed(2).replace(".",",")} / inscricao`}
              />
              <KpiCard
                light
                label="ROAS Captacao"
                value={<AnimatedNumber value={CAPTACAO_IMERSAO.roas} suffix="x" decimals={2} />}
                sub="faturamento / ads"
                positive
              />
            </div>
          </Fade>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">

        {/* ── SECAO 1: CAPTACAO DA IMERSAO ── */}
        <Fade>
          <SectionLabel>Captacao da Imersao</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-1" style={{ color: C.ink }}>
            Imersao Cronograma 2.0
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            Campanhas de captacao de inscricoes pagas · R$ {CAPTACAO_IMERSAO.valorInscricao.toFixed(2).replace(".",",")} por inscricao
          </p>

          {/* KPIs captacao */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <KpiCard
              label="Investimento em Ads"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.investimento} prefix="R$ " />}
              sub="Meta Ads"
            />
            <KpiCard
              label="Total de Inscricoes"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.inscricoes} />}
              sub="inscricoes pagas"
              positive
            />
            <KpiCard
              label="Custo por Inscricao"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.custoporInscricao} prefix="R$ " />}
              sub={`de R$ ${CAPTACAO_IMERSAO.valorInscricao.toFixed(2).replace(".",",")} por inscricao`}
            />
            <KpiCard
              label="Faturamento Bruto"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.faturamento} prefix="R$ " />}
              sub="Hotmart"
              positive
            />
            <KpiCard
              label="ROAS da Captacao"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.roas} suffix="x" decimals={2} />}
              sub="faturamento / investimento"
              positive
            />
            <KpiCard
              label="Media Ao Vivo"
              value={<AnimatedNumber value={CAPTACAO_IMERSAO.mediaAoVivo} />}
              sub="pessoas por aula"
              positive
            />
          </div>

          {/* Frase de destaque */}
          <div
            className="rounded-lg px-6 py-5 mb-8 flex items-start gap-4"
            style={{ backgroundColor: C.goldDim, border: `1px solid rgba(201,162,87,0.25)` }}
          >
            <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
            <p className="text-sm leading-relaxed" style={{ color: C.ink }}>
              Para cada <strong style={{ color: C.gold }}>R$ 1,00</strong> investido em ads,
              a captacao da Imersao retornou <strong style={{ color: C.green }}>R$ 1,10</strong> em faturamento.
              O investimento se pagou integralmente ja na captacao, antes de qualquer venda da Mentoria.
            </p>
          </div>

          {/* Tabela detalhada */}
          <div
            className="rounded-lg p-6 mb-8"
            style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              Metricas detalhadas
            </p>
            <StatRow label="Investimento total em ads" value={fmt(CAPTACAO_IMERSAO.investimento)} />
            <StatRow label="Total de inscricoes" value={String(CAPTACAO_IMERSAO.inscricoes)} highlight />
            <StatRow label="Custo por inscricao (CPL)" value={fmt(CAPTACAO_IMERSAO.custoporInscricao)} />
            <StatRow label="Valor por inscricao" value={fmt(CAPTACAO_IMERSAO.valorInscricao)} />
            <StatRow label="Faturamento bruto (Hotmart)" value={fmt(CAPTACAO_IMERSAO.faturamento)} highlight />
            <StatRow label="ROAS da captacao" value={fmtRoas(CAPTACAO_IMERSAO.roas)} highlight />
            <StatRow label="Media de pessoas ao vivo" value={`${CAPTACAO_IMERSAO.mediaAoVivo} pessoas`} />
          </div>

          {/* Criativos campeoes */}
          {CAPTACAO_IMERSAO.criativos.length > 0 && (
            <div
              className="rounded-lg p-6 mb-8"
              style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Criativos campeoes
              </p>
              <div className="flex flex-col gap-4">
                {CAPTACAO_IMERSAO.criativos.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                    <CreativeLink link={c.link} label={c.label} />
                    <div className="flex items-center gap-4 text-xs" style={{ color: C.muted }}>
                      <span>CTR: <strong style={{ color: C.ink }}>{c.ctr}</strong></span>
                      <span>CPL: <strong style={{ color: C.ink }}>{fmt(c.cpl)}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observacoes captacao */}
          {CAPTACAO_IMERSAO.observacoes.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {CAPTACAO_IMERSAO.observacoes.map((obs, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
                  <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{obs}</p>
                </div>
              ))}
            </div>
          )}
        </Fade>

        <Divider />

        {/* ── SECAO 2: CAMPANHAS MENTORIA ── */}
        <Fade>
          <SectionLabel>Campanhas da Mentoria</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-1" style={{ color: C.ink }}>
            Mentoria Inovando na Sua Obra
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            Campanhas de aquecimento e conversao · R$ 1.197 por aluna
          </p>

          {mentoriaTemDados ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                <KpiCard
                  label="Investimento em Ads"
                  value={<AnimatedNumber value={CAMPANHAS_MENTORIA.investimento} prefix="R$ " />}
                  sub="Meta Ads"
                />
                <KpiCard
                  label="Leads Gerados"
                  value={<AnimatedNumber value={CAMPANHAS_MENTORIA.leads} />}
                  sub="leads qualificados"
                  positive
                />
                <KpiCard
                  label="Custo por Lead"
                  value={<AnimatedNumber value={CAMPANHAS_MENTORIA.cpl} prefix="R$ " />}
                  sub="CPL medio"
                />
                <KpiCard
                  label="Alcance"
                  value={<AnimatedNumber value={CAMPANHAS_MENTORIA.alcance} />}
                  sub="pessoas alcancadas"
                />
                <KpiCard
                  label="Impressoes"
                  value={<AnimatedNumber value={CAMPANHAS_MENTORIA.impressoes} />}
                  sub="total de impressoes"
                />
                <KpiCard
                  label="CTR Medio"
                  value={CAMPANHAS_MENTORIA.ctr}
                  sub="taxa de cliques"
                />
              </div>

              <div
                className="rounded-lg p-6 mb-8"
                style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                  Metricas detalhadas
                </p>
                <StatRow label="Investimento total em ads" value={fmt(CAMPANHAS_MENTORIA.investimento)} />
                <StatRow label="Leads gerados" value={String(CAMPANHAS_MENTORIA.leads)} highlight />
                <StatRow label="Custo por Lead (CPL)" value={fmt(CAMPANHAS_MENTORIA.cpl)} />
                <StatRow label="Alcance" value={CAMPANHAS_MENTORIA.alcance.toLocaleString("pt-BR")} />
                <StatRow label="Impressoes" value={CAMPANHAS_MENTORIA.impressoes.toLocaleString("pt-BR")} />
                <StatRow label="CTR medio" value={CAMPANHAS_MENTORIA.ctr} highlight />
              </div>

              {CAMPANHAS_MENTORIA.criativos.length > 0 && (
                <div
                  className="rounded-lg p-6 mb-8"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                    Criativos campeoes
                  </p>
                  <div className="flex flex-col gap-4">
                    {CAMPANHAS_MENTORIA.criativos.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                        <CreativeLink link={c.link} label={c.label} />
                        <div className="flex items-center gap-4 text-xs" style={{ color: C.muted }}>
                          <span>CTR: <strong style={{ color: C.ink }}>{c.ctr}</strong></span>
                          <span>Leads: <strong style={{ color: C.ink }}>{c.leads}</strong></span>
                          <span>CPL: <strong style={{ color: C.ink }}>{fmt(c.cpl)}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {CAMPANHAS_MENTORIA.observacoes.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {CAMPANHAS_MENTORIA.observacoes.map((obs, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
                      <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{obs}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              className="rounded-lg px-6 py-8 text-center"
              style={{ backgroundColor: C.white, border: `1px dashed ${C.border}` }}
            >
              <Target className="w-8 h-8 mx-auto mb-3" style={{ color: C.gold }} />
              <p className="text-sm font-semibold mb-1" style={{ color: C.ink }}>Dados em processamento</p>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                Os dados das campanhas da Mentoria serao inseridos em breve.
              </p>
            </div>
          )}
        </Fade>

        {/* ── SECAO 3: CONSOLIDADO GERAL ── */}
        <Fade>
          <div className="mt-16 -mx-5 md:-mx-0 md:rounded-2xl overflow-hidden" style={{ backgroundColor: C.dark }}>
            <div className="px-6 py-10 md:px-10">
              <SectionLabel light>Consolidado Geral</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-black uppercase mb-8" style={{ color: C.white }}>
                Visao completa do periodo
              </h2>

              {/* Tabela consolidada */}
              <div className="overflow-x-auto mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <th className="text-left pb-3 font-bold text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.35)" }}>Metrica</th>
                      <th className="text-right pb-3 font-bold text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.35)" }}>Imersao</th>
                      {mentoriaTemDados && (
                        <th className="text-right pb-3 font-bold text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.35)" }}>Mentoria</th>
                      )}
                      <th className="text-right pb-3 font-bold text-[10px] uppercase tracking-[0.18em]" style={{ color: C.gold }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Investimento",
                        imersao: fmt(CAPTACAO_IMERSAO.investimento),
                        mentoria: mentoriaTemDados ? fmt(CAMPANHAS_MENTORIA.investimento) : "n/a",
                        total: fmt(TOTAL.investimento),
                        highlight: false,
                      },
                      {
                        label: "Faturamento",
                        imersao: fmt(CAPTACAO_IMERSAO.faturamento),
                        mentoria: "n/a",
                        total: fmt(TOTAL.faturamento),
                        highlight: true,
                      },
                      {
                        label: "ROAS",
                        imersao: fmtRoas(CAPTACAO_IMERSAO.roas),
                        mentoria: "n/a",
                        total: fmtRoas(TOTAL.faturamento / TOTAL.investimento),
                        highlight: true,
                      },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td className="py-3.5" style={{ color: "rgba(255,255,255,0.55)" }}>{row.label}</td>
                        <td className="py-3.5 text-right font-medium" style={{ color: C.white }}>{row.imersao}</td>
                        {mentoriaTemDados && (
                          <td className="py-3.5 text-right font-medium" style={{ color: C.white }}>{row.mentoria}</td>
                        )}
                        <td className="py-3.5 text-right font-bold" style={{ color: row.highlight ? C.green : C.white }}>
                          {row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Grafico de pizza */}
              {PIE_DATA.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Distribuicao do investimento
                  </p>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div style={{ width: 180, height: 180 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                            {PIE_DATA.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-3">
                      {PIE_DATA.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <div>
                            <p className="text-xs font-semibold" style={{ color: C.white }}>{item.name}</p>
                            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{fmt(item.value)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fade>

        {/* ── SECAO 4: OBSERVACOES E PROXIMOS PASSOS ── */}
        <Fade>
          <div className="mt-16">
            <SectionLabel>Analise</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-10" style={{ color: C.ink }}>
              Observacoes e proximos passos
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Pontos fortes */}
              <div className="rounded-lg p-6" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <TrendingUp className="w-4 h-4" style={{ color: C.green }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.green }}>Pontos fortes</p>
                </div>
                <div className="flex flex-col gap-4">
                  {PONTOS_FORTES.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
                      <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pontos de atencao */}
              <div className="rounded-lg p-6" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <AlertCircle className="w-4 h-4" style={{ color: C.gold }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Pontos de atencao</p>
                </div>
                <div className="flex flex-col gap-4">
                  {PONTOS_ATENCAO.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                      <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acoes prioritarias */}
            <div className="rounded-lg p-6" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2.5 mb-5">
                <Zap className="w-4 h-4" style={{ color: C.gold }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Acoes prioritarias</p>
              </div>
              <div className="flex flex-col gap-3">
                {ACOES_PRIORITARIAS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                      style={{ backgroundColor: C.goldDim, color: C.gold }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>

        {/* ── FONTES ── */}
        <Fade>
          <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.muted }}>Fonte dos dados</p>
            <p className="text-xs" style={{ color: C.muted }}>
              Investimento, alcance, impressoes, CTR, CPL e metricas de campanha: Gerenciador de Anuncios Meta.
              Faturamento e inscricoes: Hotmart.
            </p>
          </div>
        </Fade>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ backgroundColor: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={imgLogo} alt="Inovando na Sua Obra" className="h-7 w-auto opacity-40" />
          <p className="text-xs text-center md:text-right" style={{ color: "rgba(255,255,255,0.2)" }}>
            Relatorio gerado em {REPORT_META.geradoEm} · Inovando na Sua Obra · Dados: Meta Ads + Hotmart
          </p>
        </div>
      </div>
    </div>
  );
}
