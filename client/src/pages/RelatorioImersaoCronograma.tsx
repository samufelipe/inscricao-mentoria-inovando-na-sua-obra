import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import {
  ExternalLink, TrendingUp, AlertCircle, CheckCircle, Zap, Award,
  Eye, MousePointerClick, Users, ShoppingCart, Clapperboard,
  Sparkles, ArrowRight, ChevronDown, Link2,
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
  greenRim:"rgba(46,125,50,0.22)",
  slate:   "#5C6B7A",
  slateBg: "rgba(92,107,122,0.09)",
  slateRim:"rgba(92,107,122,0.22)",
  dark:    "#1A1510",
};

const GROUP_COLOR: Record<string, string> = {
  distribuicao: C.slate,
  imersao: C.gold,
  mentoria: C.green,
};

// ─────────────────────────────────────────
// DADOS REAIS: Meta Ads (via Windsor.ai), conta InovandoObra CA (424518540421639)
// ─────────────────────────────────────────
const REPORT = {
  geral:     "21 de julho a 20 de agosto de 2026",
  captacao:  "22 de julho a 07 de agosto de 2026",
  carrinho:  "08 de agosto a 14 de agosto de 2026",
  geradoEm:  "20/08/2026",
};

const TOTAL = {
  investimento: 4979.93,
  vendasImersao: 183,
  vendasCombo: 11,
  vendasMentoria: 15,
  vendasTotais: 209,
  faturamento: 28747.25,
  roas: 5.77,
};

const DISTRIBUICAO = {
  key: "distribuicao",
  label: "Distribuição de Conteúdo",
  sub: "Vídeo e engajamento pra esquentar quem ainda ia ver a oferta",
  periodo: "22/07 a 24/07",
  investimento: 160.54,
  impressoes: 57534,
  thruplays: 25877,
  custoPorMilThruplay: 6.21,
  campanhas: [
    {
      nome: "Aquecimento em Vídeo",
      badge: "Visualização de Vídeo",
      spend: 55.39, impressions: 14129, reach: 13888, frequencia: 1.02,
      thruplays: 4487, custoPorMilThruplay: 12.35,
      p25: 5937, p50: 2830, p75: 1154, p100: 565,
    },
    {
      nome: "Envolvimento com a Publicação",
      badge: "Envolvimento",
      spend: 105.15, impressions: 43405, reach: 43035, frequencia: 1.01,
      thruplays: 21390, custoPorMilThruplay: 4.92,
      p25: 21272, p50: 12516, p75: 2110, p100: 421,
    },
  ],
};

const VENDAS_IMERSAO = {
  key: "imersao",
  label: "Vendas · Imersão Cronograma",
  sub: "8 campanhas testando página, criativo e caminho até a compra (R$ 29,90)",
  periodo: REPORT.captacao,
  investimento: 4361.58,
  linkClicks: 3975,
  ctr: 2.51, cpc: 0.75,
  vendas: 183,
  faturamento: 4268.03,
  vendasCombo: 11,
  faturamentoCombo: 950.54,
  faturamentoCaptacao: 5218.57,
  roas: 1.20,
  cpa: 23.83,
  taxaConversao: 4.60,
  vendasMeta: 187,
  campanhas: [
    { nome: "LP Imersão Cronograma: Teste V2 (Escala)", spend: 1587.92, vendas: 76, faturamento: 2272.40, roas: 1.43, ctr: 2.60, cpc: 0.71 },
    { nome: "Remarketing: Checkout Direto (Novos Criativos)", spend: 1320.31, vendas: 75, faturamento: 2242.50, roas: 1.70, ctr: 2.37, cpc: 0.75 },
    { nome: "LP Imersão Cronograma: Novos Criativos", spend: 717.08, vendas: 28, faturamento: 837.20, roas: 1.17, ctr: 2.76, cpc: 0.76 },
    { nome: "LP Imersão Cronograma: Lote 1", spend: 509.49, vendas: 7, faturamento: 209.30, roas: 0.41, ctr: 2.39, cpc: 0.82 },
    { nome: "LP Imersão Cronograma: Teste A/B", spend: 82.80, vendas: 1, faturamento: 29.90, roas: 0.36, ctr: 2.23, cpc: 0.91 },
    { nome: "LP Imersão Cronograma: Teste Bid Cap", spend: 81.88, vendas: 0, faturamento: 0, roas: null, ctr: 1.82, cpc: 1.02 },
    { nome: "LP Imersão Cronograma: Teste V2", spend: 35.40, vendas: 0, faturamento: 0, roas: null, ctr: 2.60, cpc: 0.74 },
    { nome: "Remarketing: Checkout Direto", spend: 26.70, vendas: 0, faturamento: 0, roas: null, ctr: 2.58, cpc: 0.67 },
  ],
  criativos: [
    { nome: "Sequência de Serviços", link: "https://www.instagram.com/p/DbLqhSFAzIA/", cliques: 2446, spend: 1778.50, vendas: 83, faturamento: 2481.70 },
    { nome: "Tadinha da Fernanda (variação 1)", link: "https://www.instagram.com/p/Dbl06ewAFSJ/", cliques: 861, spend: 613.62, vendas: 36, faturamento: 1076.40 },
    { nome: "Tadinha da Fernanda (variação 2)", link: "https://www.instagram.com/p/Dbl0ZtagAuY/", cliques: 361, spend: 215.12, vendas: 16, faturamento: 478.40 },
  ],
  lps: [
    { nome: "Checkout Direto", tipo: "Sem página, direto pro checkout", link: "https://pay.hotmart.com/T106814287G?checkoutMode=10", cliques: 1158, vendas: 66, taxa: 5.70 },
    { nome: "Página Imersão", tipo: "Landing page nova", link: "https://inscricao.imersao.inovandonasuaobra.com.br/", cliques: 493, vendas: 27, taxa: 5.48 },
    { nome: "Quiz de Diagnóstico", tipo: "Funil em formato de quiz", link: "https://inscricao.imersao.inovandonasuaobra.com.br/quiz", cliques: 1550, vendas: 81, taxa: 5.23 },
    { nome: "LP Imersão Cronograma", tipo: "Página original do lançamento", link: "https://cronogramadenatal.inovandonasuaobra.com.br/", cliques: 602, vendas: 9, taxa: 1.50 },
    { nome: "LP Imersão Cronograma V2", tipo: "Variação de teste", link: "https://cronogramadenatal.inovandonasuaobra.com.br/natal-v2", cliques: 33, vendas: 0, taxa: 0 },
  ],
};

const VENDAS_MENTORIA = {
  key: "mentoria",
  label: "Vendas · Mentoria",
  sub: "3 campanhas na semana de carrinho aberto (R$ 2.300)",
  periodo: REPORT.carrinho,
  investimento: 457.81,
  linkClicks: 264,
  ctr: 1.86, cpc: 1.08,
  vendas: 15,
  faturamento: 23528.68,
  roas: 51.39,
  cpa: 30.52,
  taxaConversao: 5.68,
  vendasMeta: 1,
  campanhas: [
    { nome: "Mentoria: Campanha Oficial", spend: 267.96, vendas: 1, faturamento: 2300.00, roas: 8.58, ctr: 1.96, cpc: 1.02 },
    { nome: "Mentoria: Remarketing Checkout Direto", spend: 114.72, vendas: 0, faturamento: 0, roas: null, ctr: 1.93, cpc: 1.06 },
    { nome: "Mentoria: Campanha Oficial (Ajuste 13/08)", spend: 75.13, vendas: 0, faturamento: 0, roas: null, ctr: 1.43, cpc: 1.37 },
  ],
  criativos: [
    { nome: "Cobrança de Fornecedores", link: "https://www.instagram.com/p/Db3dIl_gGGG/", cliques: 211, spend: 232.25, vendas: 1, faturamento: 2300.00 },
    { nome: "Estagiária Acertando", link: "https://www.instagram.com/p/Db3dr0Agqqn/", cliques: 151, spend: 125.79, vendas: 0, faturamento: 0 },
    { nome: "Sempre na Correria", link: "https://www.instagram.com/p/Db3drvBgIb1/", cliques: 19, spend: 27.24, vendas: 0, faturamento: 0 },
  ],
  lps: [
    { nome: "Site Institucional", tipo: "Página principal do negócio", link: "https://inovandonasuaobra.com.br/", cliques: 199, vendas: 1, taxa: 0.50 },
    { nome: "Checkout Direto", tipo: "Sem página, direto pro checkout", link: "https://pay.hotmart.com/Y93975016X?off=m6qyf6ov&checkoutMode=10", cliques: 65, vendas: 0, taxa: 0 },
  ],
};

const FUNIL = [
  { etapa: "Impressões", valor: 254825, icon: Eye },
  { etapa: "Cliques no link", valor: 4239, icon: MousePointerClick },
  { etapa: "Visualizou a página", valor: 3652, icon: Users },
  { etapa: "Compra rastreada (Meta)", valor: 188, icon: ShoppingCart },
];

const ATRIBUICAO = [
  { produto: "Imersão", rastreadoMeta: 187, real: 183, janela: REPORT.captacao },
  { produto: "Mentoria", rastreadoMeta: 1, real: 15, janela: REPORT.carrinho },
];

const PONTOS_FORTES = [
  "O funil se pagou sozinho: Imersão e Combo faturaram R$ 5.218,57, mais do que os R$ 4.979,93 investidos no lançamento inteiro. A Mentoria (R$ 23.528,68) veio de lucro em cima disso.",
  "ROAS global de 5,77x confirmado pelo Hotmart. Pra cada R$ 1 investido, R$ 5,77 voltaram em venda.",
  "Custo pra conquistar um comprador da Mentoria, olhando o funil inteiro: cerca de R$ 332. Bem abaixo do que o ticket de R$ 2.300 permite gastar.",
  "Pular a LP e mandar direto pro checkout converteu quase 4x mais que a página original: 5,70% contra 1,50% (rastreado pelo Meta).",
];

const PONTOS_ATENCAO = [
  "O Meta só enxergou 1 das 15 vendas reais da Mentoria, 6,7% de visibilidade. O algoritmo está otimizando essa etapa quase no escuro.",
  "8 campanhas rodando ao mesmo tempo pra testar a Imersão é fragmentação demais. R$ 143,98 foram pra 3 variações sem nenhuma venda rastreada.",
  "A LP original do lançamento converteu só 1,50% no rastreio do Meta, bem abaixo das outras páginas com tráfego relevante, todas acima de 5%, mesmo recebendo 602 cliques, o terceiro maior volume entre as 5 testadas.",
];

const ACOES_RECOMENDADAS = [
  "Colocar Conversions API (ou um evento manual) no fechamento por WhatsApp da Mentoria. Sem isso o Meta não aprende com 93% das vendas reais e a campanha nunca otimiza direito nessa etapa.",
  "Trocar a LP original pelo checkout direto ou pela página do quiz. As duas convertem muito mais no que dá pra medir.",
  "Escalar \"Sequência de Serviços\" com 2 ou 3 variações novas antes que o criativo sature.",
  "Com CAC tão baixo por comprador de Mentoria, dá pra testar 20 a 30% a mais de orçamento no próximo lançamento sem medo.",
];

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtN = (v: number) => v.toLocaleString("pt-BR");
const fmtPct = (v: number, d = 2) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d })}%`;

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
        const t0 = performance.now(), dur = 1200;
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
// REVEAL (scroll-triggered)
// ─────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SLabel({ children, light, color }: { children: React.ReactNode; light?: boolean; color?: string }) {
  const col = color ?? (light ? "rgba(201,162,87,0.75)" : C.gold);
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

function Kpi({
  label, value, sub, color, light,
}: { label: string; value: React.ReactNode; sub?: string; color?: string; light?: boolean }) {
  const bg  = light ? "rgba(255,255,255,0.05)" : C.white;
  const brd = light ? "rgba(255,255,255,0.09)" : C.border;
  const lbl = light ? "rgba(255,255,255,0.4)"  : C.muted;
  const sub_ = light ? "rgba(255,255,255,0.28)" : C.muted;
  const val  = color ?? (light ? C.white : C.ink);
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl p-5 flex flex-col gap-1.5"
      style={{ background: bg, border: `1px solid ${brd}` }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] leading-none" style={{ color: lbl }}>{label}</span>
      <span className="text-xl md:text-[1.6rem] font-black leading-none" style={{ color: val }}>{value}</span>
      {sub && <span className="text-[11px] leading-snug mt-0.5" style={{ color: sub_ }}>{sub}</span>}
    </motion.div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b last:border-0" style={{ borderColor: C.border }}>
      <span className="text-sm" style={{ color: C.muted }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: accent ? C.green : C.ink }}>{value}</span>
    </div>
  );
}

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
// CREATIVE CARD (ranking de criativos)
// ─────────────────────────────────────────
function CreativeCard({
  rank, nome, link, cliques, spend, vendas, faturamento, color,
}: { rank: number; nome: string; link: string; cliques: number; spend: number; vendas: number; faturamento: number; color: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col gap-3 p-5 rounded-xl group cursor-pointer overflow-hidden"
      style={{ background: C.white, border: `1px solid ${C.border}` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.06] pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ background: color, color: C.white }}>
            #{rank}
          </div>
          <p className="text-sm font-bold truncate group-hover:underline" style={{ color: C.ink }}>{nome}</p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color }} />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1">
        <div>
          <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Cliques no anúncio</p>
          <p className="text-lg font-black" style={{ color: C.ink }}>{fmtN(cliques)}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Investido</p>
          <p className="text-sm font-bold" style={{ color: C.ink }}>{fmt(spend)}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Vendas</p>
          <p className="text-lg font-black" style={{ color: vendas > 0 ? color : C.muted }}>{fmtN(vendas)}</p>
        </div>
      </div>
      {faturamento > 0 && (
        <p className="text-[11px] font-semibold" style={{ color: C.green }}>{fmt(faturamento)} no ticket real</p>
      )}
    </motion.a>
  );
}

// ─────────────────────────────────────────
// LP CARD (páginas testadas)
// ─────────────────────────────────────────
function LPCard({
  nome, tipo, link, cliques, vendas, taxa, color, best,
}: { nome: string; tipo: string; link: string; cliques: number; vendas: number; taxa: number; color: string; best?: boolean }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg group cursor-pointer"
      style={{ background: best ? `${color}0d` : C.white, border: `1px solid ${best ? color + "40" : C.border}` }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
          <Link2 className="w-4 h-4" style={{ color }} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold truncate group-hover:underline" style={{ color: C.ink }}>{nome}</p>
            {best && <Badge color={color}>Melhor conversão</Badge>}
          </div>
          <p className="text-[11px] truncate" style={{ color: C.muted }}>{tipo} · {fmtN(cliques)} cliques · {fmtN(vendas)} vendas</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xl font-black" style={{ color }}>{fmtPct(taxa)}</p>
        <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>conversão</p>
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────
// CAMPAIGN LEADERBOARD (barras animadas)
// ─────────────────────────────────────────
function CampaignLeaderboard({
  campanhas, color,
}: { campanhas: Array<{ nome: string; spend: number; vendas: number; faturamento: number; roas: number | null; ctr: number; cpc: number }>; color: string }) {
  const max = Math.max(...campanhas.map(c => c.vendas), 1);
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2.5">
      {campanhas.map((c, i) => {
        const pct = (c.vendas / max) * 100;
        const isOpen = expanded === i;
        return (
          <div key={i} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
            <button
              onClick={() => setExpanded(isOpen ? null : i)}
              className="w-full text-left px-4 py-3 flex flex-col gap-2"
              style={{ background: C.white }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold truncate" style={{ color: C.ink }}>{c.nome}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm font-black" style={{ color }}>{fmtN(c.vendas)} vendas</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ color: C.muted, transform: isOpen ? "rotate(180deg)" : "none" }} />
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(pct, 3)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: C.cream }}
                >
                  <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Investido</p>
                      <p className="text-sm font-bold" style={{ color: C.ink }}>{fmt(c.spend)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Faturamento (ticket real)</p>
                      <p className="text-sm font-bold" style={{ color: c.faturamento > 0 ? C.green : C.ink }}>{c.faturamento > 0 ? fmt(c.faturamento) : "sem venda"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>ROAS</p>
                      <p className="text-sm font-bold" style={{ color: c.roas ? C.green : C.muted }}>{c.roas ? `${c.roas.toFixed(2).replace(".", ",")}x` : "sem venda"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>CTR / CPC</p>
                      <p className="text-sm font-bold" style={{ color: C.ink }}>{fmtPct(c.ctr)} · {fmt(c.cpc)}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// FUNNEL
// ─────────────────────────────────────────
function Funnel({ steps }: { steps: typeof FUNIL }) {
  const max = steps[0].valor;
  return (
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => {
        const pct = (s.valor / max) * 100;
        const dropFromPrev = i > 0 ? (1 - s.valor / steps[i - 1].valor) * 100 : null;
        const Icon = s.icon;
        return (
          <div key={i} className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.goldBg }}>
              <Icon className="w-4 h-4" style={{ color: C.gold }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.inkSoft }}>{s.etapa}</span>
                <div className="flex items-center gap-2">
                  {dropFromPrev !== null && (
                    <span className="text-[10px] font-semibold" style={{ color: C.muted }}>-{dropFromPrev.toFixed(0)}%</span>
                  )}
                  <span className="text-sm font-black" style={{ color: C.ink }}>{fmtN(s.valor)}</span>
                </div>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.green})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(pct, 1.5)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// RETENTION CHART TOOLTIP
// ─────────────────────────────────────────
function RetentionTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 shadow-2xl" style={{ background: C.dark, border: `1px solid ${C.slateRim}` }}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.gold }}>{label} do vídeo</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-black" style={{ color: C.white }}>{fmtN(p.value)} pessoas</p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// TABS
// ─────────────────────────────────────────
const TABS = [
  { key: "distribuicao", label: "Distribuição de Conteúdo", icon: Clapperboard },
  { key: "imersao", label: "Vendas · Imersão Cronograma", icon: Sparkles },
  { key: "mentoria", label: "Vendas · Mentoria", icon: Award },
];

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function RelatorioImersaoCronograma() {
  const [tab, setTab] = useState<string>("distribuicao");

  useEffect(() => {
    document.title = "Relatório de Resultados - Imersão Cronograma Obra Pronta | Inovando na Sua Obra";
  }, []);

  const retencaoChartData = [
    { etapa: "25%", "Aquecimento em Vídeo": DISTRIBUICAO.campanhas[0].p25, "Envolvimento": DISTRIBUICAO.campanhas[1].p25 },
    { etapa: "50%", "Aquecimento em Vídeo": DISTRIBUICAO.campanhas[0].p50, "Envolvimento": DISTRIBUICAO.campanhas[1].p50 },
    { etapa: "75%", "Aquecimento em Vídeo": DISTRIBUICAO.campanhas[0].p75, "Envolvimento": DISTRIBUICAO.campanhas[1].p75 },
    { etapa: "100%", "Aquecimento em Vídeo": DISTRIBUICAO.campanhas[0].p100, "Envolvimento": DISTRIBUICAO.campanhas[1].p100 },
  ];

  const GROUP_PIE = [
    { name: "Distribuição de Conteúdo", value: DISTRIBUICAO.investimento, color: GROUP_COLOR.distribuicao },
    { name: "Vendas · Imersão Cronograma", value: VENDAS_IMERSAO.investimento, color: GROUP_COLOR.imersao },
    { name: "Vendas · Mentoria", value: VENDAS_MENTORIA.investimento, color: GROUP_COLOR.mentoria },
  ];

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>

      {/* ════════════════════════════════ HEADER ════════════════════════════════ */}
      <div style={{ background: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <img src={imgLogo} alt="Inovando na Sua Obra" className="h-9 w-auto opacity-85" />
                <div className="w-px h-9 opacity-15" style={{ background: C.gold }} />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: C.gold }}>
                    Relatório de Resultados
                  </p>
                  <h1 className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight" style={{ color: C.white }}>
                    Lançamento Imersão Cronograma Obra Pronta
                  </h1>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Período geral</p>
                <p className="text-sm font-semibold" style={{ color: C.white }}>{REPORT.geral}</p>
                <p className="text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>Gerado em {REPORT.geradoEm}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Kpi light label="Total Investido"
                value={<AnimatedNumber value={TOTAL.investimento} prefix="R$ " />}
                sub="Meta Ads · 3 frentes de campanha" />
              <Kpi light label="Vendas Confirmadas"
                value={<AnimatedNumber value={TOTAL.vendasTotais} />}
                sub={`${TOTAL.vendasImersao} Imersão + ${TOTAL.vendasCombo} Combo + ${TOTAL.vendasMentoria} Mentoria`} color={C.gold} />
              <Kpi light label="Faturamento"
                value={<AnimatedNumber value={TOTAL.faturamento} prefix="R$ " />}
                sub="confirmado pelo Hotmart" color={C.green} />
              <Kpi light label="ROAS Global"
                value={<AnimatedNumber value={TOTAL.roas} suffix="x" decimals={2} />}
                sub="faturamento / investimento" color={C.green} />
            </div>

            <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Faturamento e vendas aqui vêm direto do Hotmart, número comercial real, não estimativa de pixel. Dentro de cada aba, o detalhamento por campanha e criativo ainda usa o que o Meta rastreou, porque é a granularidade que a plataforma entrega.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ════════════════════════════════ VISÃO GERAL ════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <Reveal>
          <SLabel>Visão Geral</SLabel>
          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-8" style={{ color: C.ink }}>
            As três frentes da campanha
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[DISTRIBUICAO, VENDAS_IMERSAO, VENDAS_MENTORIA].map((g, i) => (
              <motion.button
                key={g.key}
                onClick={() => setTab(g.key)}
                whileHover={{ y: -4 }}
                className="text-left rounded-xl p-5 flex flex-col gap-3 transition-shadow"
                style={{ background: C.white, border: `1px solid ${tab === g.key ? GROUP_COLOR[g.key] : C.border}`, boxShadow: tab === g.key ? `0 0 0 3px ${GROUP_COLOR[g.key]}22` : "none" }}
              >
                <div className="flex items-center justify-between">
                  <Badge color={GROUP_COLOR[g.key]}>{`0${i + 1}`}</Badge>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: GROUP_COLOR[g.key] }} />
                </div>
                <p className="text-sm font-black uppercase tracking-tight" style={{ color: C.ink }}>{g.label}</p>
                <p className="text-[11px] leading-snug" style={{ color: C.muted }}>{g.sub}</p>
                <div className="flex items-end justify-between pt-2 mt-auto" style={{ borderTop: `1px solid ${C.border}` }}>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Investido</p>
                    <p className="text-lg font-black" style={{ color: C.ink }}>{fmt(g.investimento)}</p>
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: GROUP_COLOR[g.key] }}>{fmtPct((g.investimento / TOTAL.investimento) * 100, 0)}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Funil de conversão combinado
              </p>
              <div className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <Funnel steps={FUNIL} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Distribuição do investimento
              </p>
              <div className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-6">
                  <div style={{ width: 150, height: 150 }} className="flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={GROUP_PIE} cx="50%" cy="50%" innerRadius={42} outerRadius={68} dataKey="value" paddingAngle={3}>
                          {GROUP_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <ReTooltip formatter={(v: number) => fmt(v)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3 min-w-0">
                    {GROUP_PIE.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-0.5" style={{ background: item.color }} />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold leading-tight" style={{ color: C.ink }}>{item.name}</p>
                          <p className="text-[10px]" style={{ color: C.muted }}>
                            {fmt(item.value)} ({((item.value / TOTAL.investimento) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
              O que o Meta viu vs. o que aconteceu de verdade
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {ATRIBUICAO.map((a, i) => {
                const visibilidade = (a.rastreadoMeta / a.real) * 100;
                const saudavel = visibilidade >= 80;
                return (
                  <div key={i} className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-black uppercase" style={{ color: C.ink }}>{a.produto}</p>
                      <Badge color={saudavel ? C.green : C.gold}>{saudavel ? "Rastreio saudável" : "Gap de atribuição"}</Badge>
                    </div>
                    <div className="flex items-end gap-6">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Rastreado pelo Meta</p>
                        <p className="text-2xl font-black" style={{ color: C.muted }}>{fmtN(a.rastreadoMeta)}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 mb-1.5 flex-shrink-0" style={{ color: C.border }} />
                      <div>
                        <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Vendas reais (Hotmart)</p>
                        <p className="text-2xl font-black" style={{ color: C.green }}>{fmtN(a.real)}</p>
                      </div>
                    </div>
                    <p className="text-[11px] mt-3" style={{ color: C.muted }}>{a.janela}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ════════════════════════════════ TABS NAV ════════════════════════════════ */}
      <div className="sticky top-0 z-20" style={{ background: `${C.cream}f2`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="relative flex items-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors"
                  style={{ color: active ? GROUP_COLOR[t.key] : C.muted }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                  {active && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2.5px] rounded-full"
                      style={{ background: GROUP_COLOR[t.key] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════ TAB PANELS ════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <AnimatePresence mode="wait">

          {tab === "distribuicao" && (
            <motion.div key="distribuicao" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <SLabel color={GROUP_COLOR.distribuicao}>01 / Distribuição de Conteúdo</SLabel>
                <Badge color={GROUP_COLOR.distribuicao}>{DISTRIBUICAO.periodo}</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
                Aquecimento antes da venda
              </h2>
              <p className="text-sm mb-8" style={{ color: C.muted }}>{DISTRIBUICAO.sub}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <Kpi label="Investimento" value={<AnimatedNumber value={DISTRIBUICAO.investimento} prefix="R$ " />} sub="2 campanhas" />
                <Kpi label="Impressões" value={<AnimatedNumber value={DISTRIBUICAO.impressoes} />} sub="alcance combinado" color={GROUP_COLOR.distribuicao} />
                <Kpi label="ThruPlays" value={<AnimatedNumber value={DISTRIBUICAO.thruplays} />} sub="15s ou vídeo completo" color={GROUP_COLOR.distribuicao} />
                <Kpi label="Custo por 1.000 ThruPlays" value={<AnimatedNumber value={DISTRIBUICAO.custoPorMilThruplay} prefix="R$ " />} sub="aquecimento barato" />
              </div>

              <div className="rounded-xl p-5 md:p-7 mb-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: C.muted }}>Curva de retenção do vídeo</p>
                <p className="text-xs leading-relaxed mb-6" style={{ color: C.muted }}>Quantas pessoas assistiram cada trecho, por campanha</p>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retencaoChartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                      <XAxis dataKey="etapa" tick={{ fontSize: 11, fill: C.muted, fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} tickFormatter={v => fmtN(v)} width={46} />
                      <ReTooltip content={<RetentionTooltip />} cursor={{ fill: "rgba(92,107,122,0.06)" }} />
                      <Bar dataKey="Aquecimento em Vídeo" fill={GROUP_COLOR.distribuicao} radius={[6, 6, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="Envolvimento" fill={C.gold} radius={[6, 6, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {DISTRIBUICAO.campanhas.map((c, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold" style={{ color: C.ink }}>{c.nome}</p>
                      <Badge color={GROUP_COLOR.distribuicao}>{c.badge}</Badge>
                    </div>
                    <Row label="Investimento" value={fmt(c.spend)} />
                    <Row label="Impressões" value={fmtN(c.impressions)} />
                    <Row label="Alcance" value={fmtN(c.reach)} />
                    <Row label="ThruPlays" value={fmtN(c.thruplays)} accent />
                    <Row label="Custo / 1.000 ThruPlays" value={fmt(c.custoPorMilThruplay)} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "imersao" && (
            <motion.div key="imersao" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <SLabel color={GROUP_COLOR.imersao}>02 / Vendas · Imersão Cronograma</SLabel>
                <Badge color={GROUP_COLOR.imersao}>{VENDAS_IMERSAO.periodo}</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
                Vendendo a inscrição de R$ 29,90
              </h2>
              <p className="text-sm mb-8" style={{ color: C.muted }}>{VENDAS_IMERSAO.sub}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <Kpi label="Investimento" value={<AnimatedNumber value={VENDAS_IMERSAO.investimento} prefix="R$ " />} sub="8 campanhas" />
                <Kpi label="Vendas Confirmadas" value={<AnimatedNumber value={VENDAS_IMERSAO.vendas} />} sub={`${fmt(VENDAS_IMERSAO.cpa)} por venda · Hotmart`} color={GROUP_COLOR.imersao} />
                <Kpi label="ROAS" value={<AnimatedNumber value={VENDAS_IMERSAO.roas} suffix="x" decimals={2} />} sub="faturamento / investimento" color={C.green} />
                <Kpi label="Taxa de Conversão" value={fmtPct(VENDAS_IMERSAO.taxaConversao)} sub="cliques que viraram venda" color={GROUP_COLOR.imersao} />
                <Kpi label="CTR" value={fmtPct(VENDAS_IMERSAO.ctr)} sub={`CPC médio ${fmt(VENDAS_IMERSAO.cpc)}`} />
                <Kpi label="Faturamento" value={<AnimatedNumber value={VENDAS_IMERSAO.faturamento} prefix="R$ " />} sub="confirmado pelo Hotmart" color={C.green} />
              </div>

              <div className="rounded-xl px-5 py-4 flex items-start gap-3 mb-10" style={{ background: C.goldBg, border: `1px solid ${C.goldRim}` }}>
                <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                  {VENDAS_IMERSAO.vendasCombo} das {VENDAS_IMERSAO.vendas} pessoas que compraram a Imersão levaram também o Combo de Materiais (checklist + manual de gerenciamento), mais {fmt(VENDAS_IMERSAO.faturamentoCombo)}. Faturamento completo da captação: {fmt(VENDAS_IMERSAO.faturamentoCaptacao)}.
                </p>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Criativos que mais venderam <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {VENDAS_IMERSAO.criativos.map((c, i) => (
                  <CreativeCard key={i} rank={i + 1} nome={c.nome} link={c.link} cliques={c.cliques} spend={c.spend} vendas={c.vendas} faturamento={c.faturamento} color={GROUP_COLOR.imersao} />
                ))}
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Qual página vendeu mais <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <div className="grid gap-3 mb-10">
                {VENDAS_IMERSAO.lps.map((lp, i) => (
                  <LPCard key={i} nome={lp.nome} tipo={lp.tipo} link={lp.link} cliques={lp.cliques} vendas={lp.vendas} taxa={lp.taxa} color={GROUP_COLOR.imersao} best={i === 0} />
                ))}
              </div>
              <DisclaimerCard text="R$ 114,51 investidos nessas 8 campanhas rodaram em anúncios sem página de destino identificada e não entram nessa comparação por LP." />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 mt-10" style={{ color: C.muted }}>
                Todas as 8 campanhas <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <CampaignLeaderboard campanhas={VENDAS_IMERSAO.campanhas} color={GROUP_COLOR.imersao} />
            </motion.div>
          )}

          {tab === "mentoria" && (
            <motion.div key="mentoria" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <SLabel color={GROUP_COLOR.mentoria}>03 / Vendas · Mentoria</SLabel>
                <Badge color={GROUP_COLOR.mentoria}>{VENDAS_MENTORIA.periodo} · carrinho aberto</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2" style={{ color: C.ink }}>
                Vendendo a Mentoria
              </h2>
              <p className="text-sm mb-8" style={{ color: C.muted }}>{VENDAS_MENTORIA.sub}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <Kpi label="Investimento" value={<AnimatedNumber value={VENDAS_MENTORIA.investimento} prefix="R$ " />} sub="3 campanhas" />
                <Kpi label="Vendas Confirmadas" value={<AnimatedNumber value={VENDAS_MENTORIA.vendas} />} sub={`${fmt(VENDAS_MENTORIA.cpa)} por venda · Hotmart`} color={GROUP_COLOR.mentoria} />
                <Kpi label="ROAS" value={<AnimatedNumber value={VENDAS_MENTORIA.roas} suffix="x" decimals={2} />} sub="faturamento / investimento" color={C.green} />
                <Kpi label="Taxa de Conversão" value={fmtPct(VENDAS_MENTORIA.taxaConversao)} sub="cliques que viraram venda" color={GROUP_COLOR.mentoria} />
                <Kpi label="CTR" value={fmtPct(VENDAS_MENTORIA.ctr)} sub={`CPC médio ${fmt(VENDAS_MENTORIA.cpc)}`} />
                <Kpi label="Faturamento" value={<AnimatedNumber value={VENDAS_MENTORIA.faturamento} prefix="R$ " />} sub="confirmado pelo Hotmart" color={C.green} />
              </div>

              <div className="rounded-xl px-5 py-4 flex items-start gap-3 mb-10" style={{ background: C.slateBg, border: `1px solid ${C.slateRim}` }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.slate }} />
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                  O Meta só rastreou {VENDAS_MENTORIA.vendasMeta} dessas {VENDAS_MENTORIA.vendas} vendas. As outras 14 fecharam fora do checkout rastreado, a maioria direto no WhatsApp, um padrão que já se repetiu em maio. O criativo abaixo é o único com venda confirmada pelo pixel, o ranking segue por cliques.
                </p>
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Criativos com mais cliques <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {VENDAS_MENTORIA.criativos.map((c, i) => (
                  <CreativeCard key={i} rank={i + 1} nome={c.nome} link={c.link} cliques={c.cliques} spend={c.spend} vendas={c.vendas} faturamento={c.faturamento} color={GROUP_COLOR.mentoria} />
                ))}
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: C.muted }}>
                Qual página vendeu mais <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <div className="grid gap-3 mb-10">
                {VENDAS_MENTORIA.lps.map((lp, i) => (
                  <LPCard key={i} nome={lp.nome} tipo={lp.tipo} link={lp.link} cliques={lp.cliques} vendas={lp.vendas} taxa={lp.taxa} color={GROUP_COLOR.mentoria} best={i === 0} />
                ))}
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 mt-10" style={{ color: C.muted }}>
                Todas as 3 campanhas <span className="normal-case font-medium tracking-normal">(rastreado pelo Meta)</span>
              </p>
              <CampaignLeaderboard campanhas={VENDAS_MENTORIA.campanhas} color={GROUP_COLOR.mentoria} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ════════════════════════════════ ANÁLISE ════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <Reveal>
          <SLabel>Análise</SLabel>
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-10" style={{ color: C.ink }}>
            Observações e próximos passos
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4" style={{ color: C.green }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.green }}>Pontos fortes</p>
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
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Pontos de atenção</p>
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>Ações recomendadas</p>
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
        </Reveal>

        <Reveal>
          <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: C.muted }}>Fonte dos dados</p>
            <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
Investimento, cliques e detalhamento por campanha e criativo: Meta Ads (conta InovandoObra CA), via Windsor.ai. Vendas e faturamento confirmados: Hotmart.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ════════════════════════════════ FOOTER ════════════════════════════════ */}
      <div style={{ background: C.dark }}>
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={imgLogo} alt="Inovando na Sua Obra" className="h-6 w-auto opacity-30" />
          <p className="text-[10px] text-center md:text-right" style={{ color: "rgba(255,255,255,0.18)" }}>
            Relatório gerado em {REPORT.geradoEm} · Inovando na Sua Obra
          </p>
        </div>
      </div>
    </div>
  );
}
