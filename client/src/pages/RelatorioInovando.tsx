import React, { useEffect, useRef, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import {
  ExternalLink, TrendingUp, AlertCircle, CheckCircle,
  Zap, Award, Play,
} from "lucide-react";
import imgLogo from "@/assets/mentoria/logo.png";

// ─────────────────────────────────────────
// PALETA
// ─────────────────────────────────────────
const C = {
  cream:   "#FAF8F4",
  white:   "#FFFFFF",
  ink:     "#1C1C1A",
  inkSoft: "#3A3A38",
  muted:   "#7A7A77",
  border:  "#E8E4DC",
  gold:    "#C9A257",
  goldBg:  "rgba(201,162,87,0.10)",
  goldRim: "rgba(201,162,87,0.22)",
  green:   "#2E7D32",
  greenBg: "rgba(46,125,50,0.08)",
  dark:    "#1A1510",
};

// ─────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────
const REPORT = {
  periodo:  "04 de maio a 29 de maio de 2026",
  geradoEm: "01/06/2026",
};

const CAPTACAO = {
  investimento:   8914.56,
  inscricoes:     293,
  valorInscricao: 39.90,
  faturamentoBruto: 9460.34,
  custoInscricao: 30.42,
  ctr:            "3,00%",
  roas:           1.06,
  criativos: [
    { link: "https://www.instagram.com/p/DYClPSVALow/#advertiser", label: "Criativo Campeão 01", vendas: 83 },
    { link: "https://www.instagram.com/p/DYSPamoAKOk/#advertiser", label: "Criativo Campeão 02", vendas: 60 },
  ],
};

const VIDEO = {
  investimento:   288.32,
  publico:        "Inscritos da Imersão",
  frequencia:     2.21,
  thruPlays:      5093,
  custoThruPlay:  0.06,
  retencao: [
    { pct: "ThruPlays", valor: 5093, tx: 100.0 },
    { pct: "25%",       valor: 3964, tx: 77.8  },
    { pct: "50%",       valor: 1133, tx: 22.2  },
    { pct: "75%",       valor:  591, tx: 11.6  },
    { pct: "100%",      valor:  370, tx:  7.3  },
  ],
};

const MENTORIA = {
  periodo:              "01/06 a 02/06/2026",
  investimento:         238.48,
  valorMentoria:        1997.00,
  vendasMeta:           10,
  custoPorVenda:        23.84,
  vendasTotais:         14,
  ctr:                  "1,37%",
  roasMeta:             75.30,
  faturamentoBrutoMeta: 17958.30,
  faturamentoBrutoTotal:25141.62,
  criativos: [
    { link: "https://www.instagram.com/p/DZAoGEVAIQe/#advertiser", label: "Criativo Campeão 01", vendas: 3 },
    { link: "https://www.instagram.com/p/DZAoGAOgE0R/#advertiser", label: "Criativo Campeão 02", vendas: 2 },
  ],
};

const TOTAL = {
  investimento:     9441.36,
  faturamentoBruto: 34601.96,
  roas:             3.67,
};

const PIE_DATA = [
  { name: "Captação da Imersão",   value: CAPTACAO.investimento, color: C.gold },
  { name: "Distribuição de Vídeo", value: VIDEO.investimento,    color: "#B08D57" },
  { name: "Campanhas da Mentoria", value: MENTORIA.investimento, color: C.green },
];

const PONTOS_FORTES = [
  "ROAS de 3,67x no consolidado: para cada R$ 1,00 investido em anúncios, o projeto retornou R$ 3,67 em faturamento.",
  "Campanha da Mentoria com ROAS de 75,3x rastreado pelo Meta: 10 vendas com apenas R$ 238,48 investidos em 2 dias.",
  "14 vendas totais da Mentoria, sendo 4 delas por WhatsApp e relacionamento direto, sem custo adicional de mídia.",
  "A captação da Imersão cobriu 106% do investimento em anúncios: o faturamento da inscrição pagou toda a campanha de captação.",
  "Alta taxa de abertura e clique nas mensagens de WhatsApp, validando o canal como forte vetor de conversão.",
];

const PONTOS_ATENCAO = [
  "Fluxos do Reportana e WhatsApp com graves instabilidades: 2 números sofreram restrições repetidas por disparos em massa, prejudicando a constância da comunicação no período de vagas abertas.",
  "A alta taxa de abertura das mensagens de WhatsApp confirma que o canal funciona, mas os bloqueios frequentes limitaram o volume total de vendas.",
  "Fluxos de e-mail testados, porém ineficientes — confirmando o padrão já observado no lançamento de janeiro.",
  "Poucos criativos novos testados durante a captação: o custo por compra ficou elevado, impactando diretamente o número de inscrições.",
  "Canais de tráfego restritos ao Meta Ads: o leilão caro e os custos elevados dificultaram a escala. Outros canais (Google, YouTube, TikTok) não foram ativados.",
];

const ACOES_RECOMENDADAS = [
  "Migrar a estratégia de disparos de WhatsApp para uma solução com API oficial (Cloud API do Meta) para evitar restrições de número.",
  "Testar uma variedade maior de criativos antes do próximo lançamento, especialmente vídeos curtos (15 segundos) com pitch direto.",
  "Ativar Google Ads e YouTube Ads no próximo ciclo para diversificar o leilão e reduzir o custo por aquisição.",
  "Construir uma base de e-mails com segmentação ativa e nutrição pré-lançamento em vez de disparos em massa.",
  "Iniciar retargeting da base de inscritos não convertidos da Imersão atual para o próximo ciclo de vendas.",
];

const DISCLAIMER_FATURAMENTO =
  "Faturamento da Mentoria calculado sobre o valor líquido por venda (R$ 1.795,83), já com dedução das taxas da plataforma Hotmart.";

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtN = (v: number) => v.toLocaleString("pt-BR");

// ─────────────────────────────────────────
// ANIMATED NUMBER
// ─────────────────────────────────────────
function AnimatedNumber({
  value, prefix = "", suffix = "", decimals,
}: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [disp, setDisp] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        if (reduced) { setDisp(value); return; }
        const t0 = performance.now(), dur = 1300;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setDisp((1 - Math.pow(1 - p, 3)) * value);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const dec = decimals ?? (suffix === "x" ? 2 : prefix === "R$ " ? 2 : 0);
  const text =
    prefix === "R$ "
      ? `R$ ${disp.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `${prefix}${disp.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec })}${suffix}`;

  return <span ref={ref}>{text}</span>;
}

// ─────────────────────────────────────────
// FADE IN
// ─────────────────────────────────────────
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────
function SLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  const col = light ? "rgba(201,162,87,0.75)" : C.gold;
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px" style={{ backgroundColor: col }} />
      <span className="text-[10px] font-black uppercase tracking-[0.28em]" style={{ color: col }}>
        {children}
      </span>
      <div className="w-6 h-px" style={{ backgroundColor: col }} />
    </div>
  );
}

// ─────────────────────────────────────────
// KPI CARD
// ─────────────────────────────────────────
function Kpi({
  label, value, sub, color, light,
}: { label: string; value: React.ReactNode; sub?: string; color?: string; light?: boolean }) {
  const bg  = light ? "rgba(255,255,255,0.05)" : C.white;
  const brd = light ? "rgba(255,255,255,0.09)" : C.border;
  const lbl = light ? "rgba(255,255,255,0.4)"  : C.muted;
  const sub_ = light ? "rgba(255,255,255,0.28)" : C.muted;
  const val  = color ?? (light ? C.white : C.ink);
  return (
    <div className="rounded-xl p-5 flex flex-col gap-1.5" style={{ background: bg, border: `1px solid ${brd}` }}>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] leading-none" style={{ color: lbl }}>{label}</span>
      <span className="text-xl md:text-[1.6rem] font-black leading-none" style={{ color: val }}>{value}</span>
      {sub && <span className="text-[11px] leading-snug mt-0.5" style={{ color: sub_ }}>{sub}</span>}
    </div>
  );
}

// ─────────────────────────────────────────
// STAT ROW
// ─────────────────────────────────────────
function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b last:border-0" style={{ borderColor: C.border }}>
      <span className="text-sm" style={{ color: C.muted }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: accent ? C.green : C.ink }}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────
// CREATIVE CARD
// ─────────────────────────────────────────
function CreativeCard({
  link, label, metricLabel, metricValue,
}: { link: string; label: string; metricLabel: string; metricValue: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg group transition-all duration-200 cursor-pointer"
      style={{ background: C.goldBg, border: `1px solid ${C.goldRim}` }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = C.goldRim)}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.gold }}>
          <ExternalLink className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold truncate group-hover:underline" style={{ color: C.ink }}>
          {label}
        </span>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{metricLabel}</p>
        <p className="text-base font-black" style={{ color: C.green }}>{metricValue}</p>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────
function Divider({ light }: { light?: boolean }) {
  const c = light ? "rgba(255,255,255,0.07)" : C.border;
  const d = light ? "rgba(201,162,87,0.35)"  : C.goldRim;
  return (
    <div className="flex items-center gap-4 my-14">
      <div className="flex-1 h-px" style={{ background: c }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${d}` }} />
      <div className="flex-1 h-px" style={{ background: c }} />
    </div>
  );
}

// ─────────────────────────────────────────
// TOOLTIPS
// ─────────────────────────────────────────
function RetentionTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const item = VIDEO.retencao.find(r => r.pct === label);
  return (
    <div className="rounded-xl px-4 py-3 shadow-2xl" style={{ background: C.dark, border: `1px solid ${C.goldRim}` }}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.gold }}>{label}</p>
      <p className="text-lg font-black" style={{ color: C.white }}>{fmtN(payload[0].value)} reproduções</p>
      {item && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Taxa: {item.tx.toFixed(1)}% dos ThruPlays</p>}
    </div>
  );
}

function PieTooltipComp({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 shadow-2xl" style={{ background: C.dark, border: `1px solid ${C.goldRim}` }}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.gold }}>{payload[0].name}</p>
      <p className="text-sm font-black" style={{ color: C.white }}>{fmt(payload[0].value)}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────
function Badge({ children, color = C.gold }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────
// DISCLAIMER CARD
// ─────────────────────────────────────────
function DisclaimerCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 rounded-lg mt-4"
      style={{ background: "rgba(122,122,119,0.07)", border: `1px solid rgba(122,122,119,0.18)` }}>
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.muted }} />
      <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function RelatorioInovando() {
  useEffect(() => {
    document.title = "Relatório de Resultados - Inovando na Sua Obra";
  }, []);

  const retColors = ["#C9A257", "#B08D57", "#8A7545", "#5A4D2E", "#3A3020"];

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>

      {/* ════════════════════════════════
          HEADER
      ════════════════════════════════ */}
      <div style={{ background: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <Fade>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <img src={imgLogo} alt="Inovando na Sua Obra" className="h-9 w-auto opacity-85" />
                <div className="w-px h-9 opacity-15" style={{ background: C.gold }} />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: C.gold }}>
                    Relatório de Resultados
                  </p>
                  <h1 className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight" style={{ color: C.white }}>
                    Campanhas Meta Ads
                  </h1>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Período</p>
                <p className="text-sm font-semibold" style={{ color: C.white }}>{REPORT.periodo}</p>
                <p className="text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>Gerado em {REPORT.geradoEm}</p>
              </div>
            </div>

            {/* KPIs executivos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Kpi light label="Total Investido"
                value={<AnimatedNumber value={TOTAL.investimento} prefix="R$ " />}
                sub="Meta Ads" />
              <Kpi light label="Faturamento Total"
                value={<AnimatedNumber value={TOTAL.faturamentoBruto} prefix="R$ " />}
                sub="Imersão + Mentoria"
                color={C.green} />
              <Kpi light label="Vendas da Mentoria"
                value={<AnimatedNumber value={MENTORIA.vendasTotais} />}
                sub={`${MENTORIA.vendasMeta} via Meta + ${MENTORIA.vendasTotais - MENTORIA.vendasMeta} orgânicas`}
                color={C.gold} />
              <Kpi light label="ROAS Consolidado"
                value={<AnimatedNumber value={TOTAL.roas} suffix="x" decimals={2} />}
                sub="faturamento / investimento"
                color={C.green} />
            </div>

            <div className="mt-5 px-5 py-4 rounded-xl" style={{ background: "rgba(201,162,87,0.07)", border: "1px solid rgba(201,162,87,0.15)" }}>
              <p className="text-sm text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Para cada{" "}
                <strong style={{ color: C.gold }}>R$ 1,00</strong> investido em anúncios,
                o projeto retornou{" "}
                <strong style={{ color: C.green }}>R$ 3,67</strong> em faturamento.
              </p>
            </div>

            <div className="mt-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                Faturamento da Mentoria calculado sobre o valor líquido por venda (R$ 1.795,83), já com as taxas Hotmart deduzidas. Faturamento da Imersão conforme Hotmart.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {/* ════════════════════════════════
          BODY
      ════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-5 py-14">

        {/* ── CAPTAÇÃO DA IMERSÃO ── */}
        <Fade>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <SLabel>01 / Captação da Imersão</SLabel>
            <Badge>Imersão Cronograma 2.0</Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
            Captação de inscrições pagas
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            Campanhas Meta Ads com objetivo de conversão para inscrições pagas na Imersão (R$ 39,90 por inscrição)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <Kpi label="Investimento em Ads"
              value={<AnimatedNumber value={CAPTACAO.investimento} prefix="R$ " />}
              sub="Meta Ads" />
            <Kpi label="Total de Inscrições"
              value={<AnimatedNumber value={CAPTACAO.inscricoes} />}
              sub="inscrições pagas"
              color={C.green} />
            <Kpi label="Custo por Inscrição"
              value={<AnimatedNumber value={CAPTACAO.custoInscricao} prefix="R$ " />}
              sub={`de R$ ${CAPTACAO.valorInscricao.toFixed(2).replace(".", ",")} por inscrição`} />
            <Kpi label="Faturamento Hotmart"
              value={<AnimatedNumber value={CAPTACAO.faturamentoBruto} prefix="R$ " />}
              sub="receita bruta antes das taxas"
              color={C.green} />
            <Kpi label="ROAS da Captação"
              value={<AnimatedNumber value={CAPTACAO.roas} suffix="x" decimals={2} />}
              sub="faturamento / investimento"
              color={C.green} />
            <Kpi label="CTR Geral dos Criativos"
              value={CAPTACAO.ctr}
              sub="taxa de cliques nos anúncios"
              color={C.gold} />
          </div>

          <div className="rounded-xl px-5 py-4 flex items-start gap-3 mb-6"
            style={{ background: C.greenBg, border: "1px solid rgba(46,125,50,0.2)" }}>
            <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
            <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
              O investimento em anúncios se pagou integralmente na captação, com o faturamento
              cobrindo <strong style={{ color: C.green }}>106%</strong> do que foi investido,
              antes de qualquer venda da Mentoria.
            </p>
          </div>

          <div className="rounded-xl p-5 mb-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              Métricas detalhadas
            </p>
            <Row label="Investimento total em ads"       value={fmt(CAPTACAO.investimento)} />
            <Row label="Total de inscrições"             value={fmtN(CAPTACAO.inscricoes)} accent />
            <Row label="Custo por inscrição (CPL)"       value={fmt(CAPTACAO.custoInscricao)} />
            <Row label="Valor por inscrição"             value={fmt(CAPTACAO.valorInscricao)} />
            <Row label="Faturamento Hotmart"              value={fmt(CAPTACAO.faturamentoBruto)} accent />
            <Row label="ROAS da captação"                value={`${CAPTACAO.roas.toFixed(2).replace(".", ",")}x`} accent />
            <Row label="CTR geral dos criativos"         value={CAPTACAO.ctr} />
            <DisclaimerCard text={DISCLAIMER_FATURAMENTO} />
          </div>

          <div className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              Criativos Campeões
            </p>
            <div className="flex flex-col gap-3">
              {CAPTACAO.criativos.map((c, i) => (
                <CreativeCard
                  key={i}
                  link={c.link}
                  label={c.label}
                  metricLabel="Inscrições geradas"
                  metricValue={fmtN(c.vendas)}
                />
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: C.muted }}>
              Os 2 criativos campeões responderam por{" "}
              <strong style={{ color: C.ink }}>
                {Math.round(((CAPTACAO.criativos[0].vendas + CAPTACAO.criativos[1].vendas) / CAPTACAO.inscricoes) * 100)}%
              </strong>{" "}
              das inscrições totais ({CAPTACAO.criativos[0].vendas + CAPTACAO.criativos[1].vendas} de {CAPTACAO.inscricoes}).
            </p>
          </div>
        </Fade>

        <Divider />

        {/* ── DISTRIBUIÇÃO DE VÍDEO ── */}
        <Fade>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <SLabel>02 / Distribuição de Vídeo</SLabel>
            <Badge color={C.inkSoft}>Aquecimento pós-inscrição</Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
            Campanha de vídeo para inscritos
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            Campanha veiculada exclusivamente para a base de inscritos da Imersão, com objetivo de aquecimento e engajamento
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <Kpi label="Investimento"
              value={<AnimatedNumber value={VIDEO.investimento} prefix="R$ " />}
              sub="Meta Ads" />
            <Kpi label="ThruPlays"
              value={<AnimatedNumber value={VIDEO.thruPlays} />}
              sub="reproduções de 15s ou mais"
              color={C.green} />
            <Kpi label="Custo por ThruPlay"
              value={<AnimatedNumber value={VIDEO.custoThruPlay} prefix="R$ " />}
              sub="por reprodução completa" />
            <Kpi label="Frequência Média"
              value={<AnimatedNumber value={VIDEO.frequencia} decimals={2} />}
              sub={`impactos por inscrito (${VIDEO.publico})`}
              color={C.gold} />
          </div>

          <div className="rounded-xl p-5 md:p-7" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: C.muted }}>
                  Curva de retenção do vídeo
                </p>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                  Quantos espectadores assistiram cada etapa do vídeo (% do total de ThruPlays)
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" style={{ color: C.gold }} />
                <span className="text-xs font-semibold" style={{ color: C.gold }}>
                  {fmtN(VIDEO.thruPlays)} ThruPlays
                </span>
              </div>
            </div>

            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VIDEO.retencao} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                  <XAxis dataKey="pct" tick={{ fontSize: 11, fill: C.muted, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} tickFormatter={v => fmtN(v)} width={46} />
                  <ReTooltip content={<RetentionTooltip />} cursor={{ fill: "rgba(201,162,87,0.06)" }} />
                  <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={64}>
                    {VIDEO.retencao.map((_, i) => (
                      <Cell key={i} fill={retColors[i] ?? retColors[retColors.length - 1]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="grid grid-cols-5 gap-2">
                {VIDEO.retencao.map((r, i) => (
                  <div key={i} className="text-center">
                    <div className="w-3 h-3 rounded-sm mx-auto mb-1.5" style={{ background: retColors[i] ?? retColors[retColors.length - 1] }} />
                    <p className="text-[10px] font-bold" style={{ color: C.ink }}>{r.pct}</p>
                    <p className="text-xs font-black" style={{ color: r.tx === 100 ? C.gold : C.ink }}>{r.tx.toFixed(1)}%</p>
                    <p className="text-[10px]" style={{ color: C.muted }}>{fmtN(r.valor)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 px-4 py-3 rounded-lg" style={{ background: C.goldBg, border: `1px solid ${C.goldRim}` }}>
              <p className="text-xs leading-relaxed" style={{ color: C.inkSoft }}>
                <strong style={{ color: C.ink }}>Principal insight:</strong> queda acentuada entre 25% e 50% do vídeo (de 3.964 para 1.133 espectadores). O início retém bem, mas perde o espectador na primeira metade. Nos próximos vídeos, concentrar o CTA e o argumento de venda nos primeiros 30% do conteúdo.
              </p>
            </div>
          </div>
        </Fade>

        <Divider />

        {/* ── CAMPANHAS DA MENTORIA ── */}
        <Fade>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <SLabel>03 / Campanhas da Mentoria</SLabel>
            <Badge color={C.green}>R$ 1.997 por aluna</Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
            Vendas da Mentoria Inovando
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            Campanhas ativas de {MENTORIA.periodo}. O restante do período foi conduzido via WhatsApp, grupos e contatos diretos
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <Kpi label="Investimento em Ads"
              value={<AnimatedNumber value={MENTORIA.investimento} prefix="R$ " />}
              sub="apenas 2 dias ativos" />
            <Kpi label="Vendas via Meta Ads"
              value={<AnimatedNumber value={MENTORIA.vendasMeta} />}
              sub={`${fmt(MENTORIA.custoPorVenda)} por venda`}
              color={C.green} />
            <Kpi label="ROAS Meta Ads"
              value={<AnimatedNumber value={MENTORIA.roasMeta} suffix="x" decimals={1} />}
              sub="faturamento / investimento Meta"
              color={C.green} />
            <Kpi label="Total de Vendas"
              value={<AnimatedNumber value={MENTORIA.vendasTotais} />}
              sub={`${MENTORIA.vendasMeta} Meta + ${MENTORIA.vendasTotais - MENTORIA.vendasMeta} orgânicas`}
              color={C.gold} />
            <Kpi label="Faturamento Total"
              value={<AnimatedNumber value={MENTORIA.faturamentoBrutoTotal} prefix="R$ " />}
              sub="14 vendas (líquido Hotmart)"
              color={C.green} />
            <Kpi label="CTR Geral dos Criativos"
              value={MENTORIA.ctr}
              sub="taxa de cliques nos anúncios" />
          </div>

          <div className="rounded-xl px-5 py-4 flex items-start gap-3 mb-6"
            style={{ background: C.greenBg, border: "1px solid rgba(46,125,50,0.2)" }}>
            <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
            <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
              Com apenas <strong style={{ color: C.ink }}>R$ 238,48</strong> investidos em 2 dias de Meta Ads,
              as campanhas da Mentoria geraram <strong style={{ color: C.green }}>10 vendas rastreadas</strong> com
              ROAS de <strong style={{ color: C.green }}>75,3x</strong>. As 4 vendas restantes
              vieram de WhatsApp e relacionamento direto, sem custo adicional de mídia.
            </p>
          </div>

          <div className="rounded-xl p-5 mb-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              Métricas detalhadas
            </p>
            <Row label="Período ativo de anúncios"              value={MENTORIA.periodo} />
            <Row label="Investimento Meta Ads"                  value={fmt(MENTORIA.investimento)} />
            <Row label="Vendas rastreadas pelo Meta"            value={`${MENTORIA.vendasMeta} vendas`} accent />
            <Row label="Custo por venda (Meta)"                 value={fmt(MENTORIA.custoPorVenda)} />
            <Row label="ROAS Meta Ads"                          value={`${MENTORIA.roasMeta.toFixed(1).replace(".", ",")}x`} accent />
            <Row label="Faturamento rastreado pelo Meta"        value={fmt(MENTORIA.faturamentoBrutoMeta)} accent />
            <Row label="Vendas orgânicas (WhatsApp e grupos)"  value={`${MENTORIA.vendasTotais - MENTORIA.vendasMeta} vendas`} />
            <Row label="Total de vendas"                        value={`${MENTORIA.vendasTotais} vendas`} accent />
            <Row label="Faturamento total"                       value={fmt(MENTORIA.faturamentoBrutoTotal)} accent />
            <Row label="CTR geral dos criativos"                value={MENTORIA.ctr} />
            <DisclaimerCard text={DISCLAIMER_FATURAMENTO} />
          </div>

          <div className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              Criativos Campeões
            </p>
            <div className="flex flex-col gap-3">
              {MENTORIA.criativos.map((c, i) => (
                <CreativeCard
                  key={i}
                  link={c.link}
                  label={c.label}
                  metricLabel="Vendas geradas"
                  metricValue={fmtN(c.vendas)}
                />
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* ════════════════════════════════
          CONSOLIDADO
      ════════════════════════════════ */}
      <div style={{ background: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-14">
          <Fade>
            <SLabel light>Visão Geral</SLabel>
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-10" style={{ color: C.white }}>
              Consolidado do período
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Tabela */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Comparativo por campanha
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        {["Métrica", "Captação", "Vídeo", "Mentoria", "Total"].map(h => (
                          <th key={h}
                            className={`pb-3 font-bold text-[10px] uppercase tracking-[0.16em] ${h !== "Métrica" ? "text-right" : "text-left"}`}
                            style={{ color: h === "Total" ? C.gold : "rgba(255,255,255,0.3)" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          m: "Investimento",
                          v: [fmt(CAPTACAO.investimento), fmt(VIDEO.investimento), fmt(MENTORIA.investimento), fmt(TOTAL.investimento)],
                          accent: false,
                        },
                        {
                          m: "Faturamento",
                          v: [fmt(CAPTACAO.faturamentoBruto), "n/a", fmt(MENTORIA.faturamentoBrutoTotal), fmt(TOTAL.faturamentoBruto)],
                          accent: true,
                        },
                        {
                          m: "ROAS",
                          v: [
                            `${CAPTACAO.roas.toFixed(2).replace(".", ",")}x`,
                            "n/a",
                            `${MENTORIA.roasMeta.toFixed(1).replace(".", ",")}x*`,
                            `${TOTAL.roas.toFixed(2).replace(".", ",")}x`,
                          ],
                          accent: true,
                        },
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td className="py-3.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{row.m}</td>
                          {row.v.map((val, j) => (
                            <td key={j} className="py-3.5 text-right text-sm font-semibold"
                              style={{ color: j === 3 ? (row.accent ? C.green : C.white) : C.white }}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-[10px] mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
                    * ROAS da Mentoria refere-se apenas aos 2 dias de Meta Ads ativos.
                    O ROAS total inclui todas as 14 vendas (Meta e orgânicas).
                    Faturamento da Mentoria calculado sobre o valor líquido por venda (R$ 1.795,83), já com as taxas Hotmart deduzidas.
                  </p>
                </div>
              </div>

              {/* Gráfico de pizza */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Distribuição do investimento
                </p>
                <div className="flex items-center gap-6">
                  <div style={{ width: 150, height: 150 }} className="flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={68}
                          dataKey="value" paddingAngle={3}>
                          {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <ReTooltip content={<PieTooltipComp />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3 min-w-0">
                    {PIE_DATA.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-0.5" style={{ background: item.color }} />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold leading-tight" style={{ color: C.white }}>{item.name}</p>
                          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {fmt(item.value)} ({((item.value / TOTAL.investimento) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* ════════════════════════════════
          ANÁLISE
      ════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <Fade>
          <SLabel>Análise</SLabel>
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-10" style={{ color: C.ink }}>
            Observações e próximos passos
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4" style={{ color: C.green }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.green }}>
                  Pontos fortes
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {PONTOS_FORTES.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
                    <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-4 h-4" style={{ color: C.gold }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                  Pontos de atenção
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {PONTOS_ATENCAO.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                    <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4" style={{ color: C.gold }} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                Ações recomendadas
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              {ACOES_RECOMENDADAS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black"
                    style={{ background: C.goldBg, color: C.gold, border: `1px solid ${C.goldRim}` }}>
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade>
          <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.muted }}>
              Fonte dos dados
            </p>
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
              Investimento, impressões, CTR, ThruPlays e métricas de campanha: Gerenciador de Anúncios Meta.
              Faturamento e inscrições: Hotmart. Mensagens e disparos: Reportana.
            </p>
            <p className="text-xs leading-relaxed mt-2" style={{ color: C.muted }}>
              Importante: todos os valores de faturamento apresentados neste relatório são receita bruta,
              conforme reportado pelo Hotmart. As taxas da plataforma Hotmart não estão deduzidas.
              O faturamento líquido será menor após a dedução dessas taxas.
            </p>
          </div>
        </Fade>
      </div>

      {/* ════════════════════════════════
          FOOTER
      ════════════════════════════════ */}
      <div style={{ background: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={imgLogo} alt="Inovando na Sua Obra" className="h-6 w-auto opacity-30" />
          <p className="text-[10px] text-center md:text-right" style={{ color: "rgba(255,255,255,0.18)" }}>
            Relatório gerado em {REPORT.geradoEm} · Inovando na Sua Obra · Fonte: Meta Ads, Hotmart e Reportana
          </p>
        </div>
      </div>
    </div>
  );
}
