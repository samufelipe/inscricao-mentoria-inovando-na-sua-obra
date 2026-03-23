import React, { useEffect, useRef, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { ChevronDown, ExternalLink, Trophy, TrendingUp, AlertTriangle, Target } from "lucide-react";
import logoDark from "@/assets/alem-da-tendencia/logo-dark.png";

// =============================================
// DATA CONSTANTS
// =============================================
const REPORT_META = {
  title: "RELATÓRIO DE RESULTADOS",
  subtitle: "Campanhas Meta Ads · Além da Tendência",
  periodo: "23/02 - 10/03/2026 · 15 dias de campanha",
  geradoEm: "17/03/2026",
};

const EXECUTIVE_SUMMARY = {
  investimentoTotal: 1148.61,
  receitaRastreada: 5845.0,
  comprasViaAds: 35,
  roasRemarketing: 12.16,
  roasConsolidado: 5.09,
  disclaimer:
    "* Receita rastreada refere-se apenas às 35 compras atribuídas diretamente à campanha de remarketing no Meta Ads. Não inclui vendas orgânicas ou de outras fontes do Sympla.",
};

const CAPTACAO = {
  investimento: 415.04,
  cpl: 59.29,
  leads: 7,
  visualizacoesLP: 514,
  custoPorVisualizacao: 0.81,
  ctrCampeao: "2,34%",
  taxaConversaoLP: "1,36%",
  creativoCampeao: {
    link: "https://www.instagram.com/p/DVOhjcUAEYS/#advertiser",
    label: "Criativo campeão · CTR 2,34%",
  },
};

const VIDEO = {
  investimento: 252.95,
  reproducoes3s: 8186,
  custoPorVisualizacao: 0.03,
  visualizacoesLP: 45,
  melhoresVideos: [
    { link: "https://www.instagram.com/p/DVbhtwSgMQE/#advertiser", label: "Vídeo 1" },
    { link: "https://www.instagram.com/p/DVHN-QUAImv/#advertiser", label: "Vídeo 2" },
    { link: "https://www.instagram.com/p/DVOiGt-ADWY/#advertiser", label: "Vídeo 3" },
  ],
};

const REMARKETING = {
  investimento: 480.62,
  compras: 35,
  cpa: 13.73,
  ticketMedio: 167.0,
  ctr: "13,22%",
  receita: 5845.0,
  roas: 12.16,
  publicoUtilizado: "Pessoas que acessaram a LP sem concluir cadastro + pessoas que chegaram ao checkout sem concluir a compra",
  creativoCampeao: {
    link: "https://www.instagram.com/p/DVJG3KlgFyT/#advertiser",
    label: "Criativo campeão · CTR 13,22% · 35 vendas",
    destaque: "Este criativo gerou 100% das 35 vendas da campanha de remarketing.",
  },
};

const DISTRIBUICAO_INVESTIMENTO = [
  { name: "Captação de Leads", value: 415.04, color: "#4A90D9" },
  { name: "Distribuição de Vídeo", value: 252.95, color: "#E74C6F" },
  { name: "Remarketing", value: 480.62, color: "#C9A84C" },
];

const CONSOLIDADO_ROWS = [
  { metrica: "Investimento", captacao: "R$ 415,04", video: "R$ 252,95", remarketing: "R$ 480,62", total: "R$ 1.148,61" },
  { metrica: "Receita Rastreada", captacao: "n/a", video: "n/a", remarketing: "R$ 5.845,00", total: "R$ 5.845,00" },
  { metrica: "ROAS", captacao: "n/a", video: "n/a", remarketing: "12,16x", total: "5,09x" },
  { metrica: "Compras", captacao: "n/a", video: "n/a", remarketing: "35", total: "35" },
];

const OBSERVACOES = {
  pontosFortes: [
    { titulo: "CTR de remarketing excepcional: 13,22%", descricao: "O criativo de remarketing atingiu um CTR muito acima da média do mercado (1-2%), demonstrando alta relevância da mensagem para o público impactado." },
    { titulo: "CPA de remarketing extremamente baixo: R$ 13,73", descricao: "O custo por aquisição no remarketing ficou muito abaixo do ticket médio de R$ 167, demonstrando alta eficiência na conversão de vendas." },
    { titulo: "Custo por visualização de vídeo: R$ 0,03", descricao: "Valor extremamente baixo, indicando alto interesse do público pelo conteúdo em vídeo produzido." },
    { titulo: "Taxa de conversão da LP: 6,81%", descricao: "A landing page converteu 35 dos 514 visitantes, taxa acima da média de mercado para páginas de evento (3-5%)." },
  ],
  pontosAtencao: [
    { titulo: "Sem rastreamento completo do Sympla", descricao: "Não foi possível atribuir todas as vendas do Sympla às campanhas. O ROAS consolidado (5,09x) considera apenas as vendas rastreadas via remarketing." },
    { titulo: "Base de leads pequena", descricao: "35 leads captados. Para próximas campanhas, ampliar o período e investimento em captação pode gerar uma base maior para remarketing." },
    { titulo: "Visualizações LP via vídeo baixas", descricao: "Apenas 45 visualizações da LP vieram dos vídeos (de 8.186 reproduções). A campanha de vídeo funcionou melhor como awareness do que como tráfego direto." },
  ],
  acoesPrioritarias: [
    { titulo: "Implementar pixel/rastreamento no Sympla", descricao: "Configurar rastreamento de conversão completo para atribuir vendas corretamente a cada campanha e calcular o ROAS real." },
    { titulo: "Escalar campanha de remarketing", descricao: "Com ROAS de 12,16x e CTR de 13,22%, o remarketing é o canal mais eficiente. Ampliar o público e orçamento para próximos eventos." },
    { titulo: "Ampliar período de captação", descricao: "15 dias é um período curto. Para próximos eventos, iniciar captação com 30-45 dias de antecedência para construir uma base de leads mais robusta." },
    { titulo: "Testar criativos de vídeo com CTA direto", descricao: "Os vídeos tiveram ótimo engajamento mas pouco tráfego para LP. Testar versões com chamadas mais diretas para ação." },
  ],
};

const FONTES = [
  { dado: "Investimento, impressões, CTR, CPL, CPA, reproduções de vídeo", fonte: "Gerenciador de Anúncios Meta" },
  { dado: "Compras atribuídas ao remarketing, ticket médio", fonte: "Sympla (parcial)" },
];

// =============================================
// HELPER COMPONENTS
// =============================================

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1500, decimals }: { value: number; prefix?: string; suffix?: string; duration?: number; decimals?: number }) {
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

  const dec = decimals ?? (suffix === "%" ? 1 : prefix === "R$ " ? 2 : 0);
  const formatted = prefix === "R$ "
    ? `R$ ${display.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${prefix}${display.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec })}${suffix}`;

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

function SimpleAccordion({ title, children }: { title: string; children: React.ReactNode }) {
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

function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700/30 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-semibold text-sm ${highlight ? "text-green-400" : "text-white"}`}>{value}</span>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="flex-1 h-px bg-gray-700/50" />
      <div className="w-2 h-2 rounded-full bg-gray-600" />
      <div className="flex-1 h-px bg-gray-700/50" />
    </div>
  );
}

function CreativeLink({ link, label }: { link: string; label: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[#C9A84C] text-sm underline hover:text-[#d4b85c] transition-colors"
    >
      <ExternalLink className="w-3.5 h-3.5" />
      {label}
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
              <img src={logoDark} alt="Além da Tendência" className="h-12 w-auto" />
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
            <CardBox className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">Investimento Total</div>
              <div className="text-xl md:text-2xl font-bold text-white">
                <AnimatedNumber value={EXECUTIVE_SUMMARY.investimentoTotal} prefix="R$ " />
              </div>
              <div className="text-xs text-gray-500 mt-1">Meta Ads</div>
            </CardBox>
            <CardBox className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">Receita Rastreada</div>
              <div className="text-xl md:text-2xl font-bold text-green-400">
                <AnimatedNumber value={EXECUTIVE_SUMMARY.receitaRastreada} prefix="R$ " />
              </div>
              <div className="text-xs text-gray-500 mt-1">via Remarketing</div>
            </CardBox>
            <CardBox className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">Compras via Ads</div>
              <div className="text-xl md:text-2xl font-bold text-white">
                <AnimatedNumber value={EXECUTIVE_SUMMARY.comprasViaAds} />
              </div>
              <div className="text-xs text-gray-500 mt-1">Sympla</div>
            </CardBox>
            <CardBox className="text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2">ROAS Remarketing</div>
              <div className="text-xl md:text-2xl font-bold text-green-400">
                <AnimatedNumber value={EXECUTIVE_SUMMARY.roasRemarketing} suffix="x" decimals={2} />
              </div>
              <div className="text-xs text-gray-500 mt-1">ROAS consolidado: {EXECUTIVE_SUMMARY.roasConsolidado.toFixed(2).replace(".", ",")}x</div>
            </CardBox>
          </div>

          {/* ROAS phrase */}
          <CardBox className="text-center mb-4">
            <p className="text-gray-300 text-sm">
              Para cada <span className="text-[#C9A84C] font-bold">R$ 1,00</span> investido em remarketing, retornaram <span className="text-green-400 font-bold">R$ 12,16</span> em receita rastreada.
            </p>
          </CardBox>
          <p className="text-gray-500 text-xs mb-4">{EXECUTIVE_SUMMARY.disclaimer}</p>

          {/* Accordions */}
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            <SimpleAccordion title="O que é ROAS?">
              ROAS (Retorno sobre o Gasto com Anúncios) mostra quanto de receita cada real investido em anúncios gerou. Cálculo: Receita / Investimento em Ads. Exemplo: ROAS de 12,16x significa que cada R$ 1 em anúncios gerou R$ 12,16 em vendas.
            </SimpleAccordion>
            <SimpleAccordion title="O que é CPL?">
              CPL (Custo por Lead) é quanto custa, em média, cada lead capturado através dos anúncios. Cálculo: Investimento / Número de leads. Quanto menor o CPL, mais eficiente é a campanha de captação.
            </SimpleAccordion>
          </div>
        </FadeInSection>

        <Divider />

        {/* CAMPANHA DE CAPTAÇÃO */}
        <FadeInSection>
          <SectionTitle>Campanha de Captação de Leads</SectionTitle>
          <p className="text-gray-400 text-sm mb-6">Objetivo: captar leads qualificados para a landing page do evento</p>

          <CardBox className="mb-6">
            <SubTitle>Desempenho da Campanha</SubTitle>
            <StatRow label="Investimento" value={formatCurrency(CAPTACAO.investimento)} />
            <StatRow label="Leads captados" value={String(CAPTACAO.leads)} />
            <StatRow label="CPL (Custo por Lead)" value={formatCurrency(CAPTACAO.cpl)} />
            <StatRow label="Visualizações da LP" value={String(CAPTACAO.visualizacoesLP)} />
            <StatRow label="Custo por Visualização" value={formatCurrency(CAPTACAO.custoPorVisualizacao)} />
            <StatRow label="CTR do Criativo Campeão" value={CAPTACAO.ctrCampeao} highlight />
            <StatRow label="Taxa de Conversão da LP" value={CAPTACAO.taxaConversaoLP} highlight />
          </CardBox>

          <CardBox className="mb-12">
            <SubTitle>Criativo de Destaque</SubTitle>
            <CreativeLink link={CAPTACAO.creativoCampeao.link} label={CAPTACAO.creativoCampeao.label} />
          </CardBox>
        </FadeInSection>

        <Divider />

        {/* CAMPANHA DE VÍDEO */}
        <FadeInSection>
          <SectionTitle>Campanha de Distribuição de Vídeo</SectionTitle>
          <p className="text-gray-400 text-sm mb-6">Objetivo: awareness e distribuição de conteúdo para aquecer o público</p>

          <CardBox className="mb-6">
            <SubTitle>Desempenho da Campanha</SubTitle>
            <StatRow label="Investimento" value={formatCurrency(VIDEO.investimento)} />
            <StatRow label="Reproduções (3s+)" value={VIDEO.reproducoes3s.toLocaleString("pt-BR")} />
            <StatRow label="Custo por Visualização" value={formatCurrency(VIDEO.custoPorVisualizacao)} highlight />
            <StatRow label="Visualizações da LP" value={String(VIDEO.visualizacoesLP)} />
          </CardBox>

          <CardBox className="mb-12">
            <SubTitle>Melhores Vídeos</SubTitle>
            <div className="flex flex-col gap-3">
              {VIDEO.melhoresVideos.map((v, i) => (
                <CreativeLink key={i} link={v.link} label={`${v.label} · Ver no Instagram`} />
              ))}
            </div>
          </CardBox>
        </FadeInSection>

        <Divider />

        {/* CAMPANHA DE REMARKETING */}
        <FadeInSection>
          <SectionTitle>Campanha de Remarketing</SectionTitle>
          <p className="text-gray-400 text-sm mb-6">Objetivo: conversão direta via checkout do Sympla</p>

          <CardBox className="mb-6">
            <SubTitle>Desempenho da Campanha</SubTitle>
            <StatRow label="Investimento" value={formatCurrency(REMARKETING.investimento)} />
            <StatRow label="Compras" value={String(REMARKETING.compras)} highlight />
            <StatRow label="CPA (Custo por Aquisição)" value={formatCurrency(REMARKETING.cpa)} />
            <StatRow label="Ticket Médio (1º Lote)" value={formatCurrency(REMARKETING.ticketMedio)} />
            <StatRow label="CTR" value={REMARKETING.ctr} highlight />
            <StatRow label="Receita Rastreada" value={formatCurrency(REMARKETING.receita)} highlight />
            <StatRow label="ROAS" value={`${REMARKETING.roas.toFixed(2).replace(".", ",")}x`} highlight />
          </CardBox>

          <CardBox className="mb-4">
            <SubTitle>Público Utilizado</SubTitle>
            <p className="text-gray-300 text-sm">{REMARKETING.publicoUtilizado}</p>
          </CardBox>

          {/* Criativo destaque com highlight */}
          <div className="bg-gradient-to-r from-[#C9A84C]/10 to-transparent border border-[#C9A84C]/30 rounded-xl p-5 md:p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-[#C9A84C]" />
              <SubTitle>Criativo Campeão de Remarketing</SubTitle>
            </div>
            <CreativeLink link={REMARKETING.creativoCampeao.link} label={REMARKETING.creativoCampeao.label} />
            <p className="text-green-400 text-sm mt-3 font-medium">{REMARKETING.creativoCampeao.destaque}</p>
          </div>
        </FadeInSection>

        <Divider />

        {/* DISTRIBUIÇÃO DE INVESTIMENTO — DONUT */}
        <FadeInSection>
          <SectionTitle>Distribuição de Investimento</SectionTitle>
          <CardBox className="mb-12 mt-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DISTRIBUICAO_INVESTIMENTO}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {DISTRIBUICAO_INVESTIMENTO.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {DISTRIBUICAO_INVESTIMENTO.map((item) => {
                  const pct = ((item.value / EXECUTIVE_SUMMARY.investimentoTotal) * 100).toFixed(1);
                  return (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400 text-sm flex-1">{item.name}</span>
                      <span className="text-white font-semibold text-sm">{formatCurrency(item.value)}</span>
                      <span className="text-gray-500 text-xs w-12 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBox>
        </FadeInSection>

        {/* CONSOLIDADO FINANCEIRO */}
        <FadeInSection>
          <SectionTitle>Consolidado Financeiro</SectionTitle>
          <CardBox className="mb-12 mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 text-gray-400 font-medium">Métrica</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Captação</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Vídeo</th>
                  <th className="text-right py-3 text-gray-400 font-medium">Remarketing</th>
                  <th className="text-right py-3 text-[#C9A84C] font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {CONSOLIDADO_ROWS.map((row) => (
                  <tr key={row.metrica} className="border-b border-gray-700/20">
                    <td className="py-2 text-gray-400">{row.metrica}</td>
                    <td className="py-2 text-white text-right">{row.captacao}</td>
                    <td className="py-2 text-white text-right">{row.video}</td>
                    <td className="py-2 text-white text-right">{row.remarketing}</td>
                    <td className="py-2 text-green-400 text-right font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBox>
        </FadeInSection>

        {/* OBSERVAÇÕES E RECOMENDAÇÕES */}
        <FadeInSection>
          <SectionTitle>Observações e Recomendações</SectionTitle>
          <div className="space-y-6 mt-4 mb-12">
            {/* Pontos Fortes */}
            <CardBox>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <SubTitle>Pontos Fortes</SubTitle>
              </div>
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
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <SubTitle>Pontos de Atenção</SubTitle>
              </div>
              <div className="space-y-4">
                {OBSERVACOES.pontosAtencao.map((p) => (
                  <div key={p.titulo}>
                    <div className="text-red-400 font-semibold text-sm mb-1">{p.titulo}</div>
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
