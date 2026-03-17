

## Plano: Criar nova página de Relatório de Resultados

### Resumo
Criar uma nova página `/relatorio-2` (ou rota similar) que replique exatamente o layout e design do relatório existente em `/relatorio` da URL publicada, mas como página completamente independente. Nenhuma página existente será alterada. Os dados ficarão preparados para serem atualizados com os novos números que você enviará.

### O que será feito

1. **Criar `client/src/pages/Relatorio.tsx`** — Página completa com todas as seções do relatório original:
   - Header com logo Inovando na Obra, título, período e data de geração
   - Resumo Executivo (4 KPIs: Investimento, Receita, Resultado sobre Ads, ROI/ROAS)
   - Frase de ROAS + disclaimer + accordions "O que é ROI?" e "O que é ROAS?"
   - Seção Imersão (Meta Ads, gráfico de leads por fonte com donut chart, vendas Hotmart, criativos, desempenho financeiro, e-mails)
   - Seção Mentoria (Meta Ads, vendas, distribuição de vendas, funil de checkout, gráfico de vendas por dia, criativos, desempenho financeiro, e-mails)
   - Tabela comparativa Imersão vs Mentoria + gráfico de barras comparativo
   - Consolidado Financeiro (tabela)
   - Seção de Oportunidade (leads quentes)
   - Observações e Recomendações (Pontos Fortes, Pontos de Atenção, Ações Prioritárias, Estratégia de Crescimento)
   - Fontes dos Dados (tabela)
   - Botão fixo "Exportar PDF"

2. **Design e estilo** — Tema escuro (fundo `#1a1a2e` / `#16213e`), cards com bordas sutis, tipografia uppercase tracking-wide nos títulos de seção, cores douradas (#C9A84C) nos destaques, verde nos valores positivos, gráficos com Recharts (donut chart, bar chart, line chart).

3. **Adicionar rota em `client/src/App.tsx`** — Nova rota `/relatorio-2` apontando para o componente, sem alterar nenhuma rota existente.

4. **Dados separados em constantes** — Todos os dados do relatório serão organizados em objetos/constantes no topo do arquivo, facilitando a troca posterior pelos novos dados que você enviará.

### O que NÃO será alterado
- Nenhuma página existente (Home, AlemDaTendencia, etc.)
- Nenhum componente existente
- Apenas adição de arquivos novos + uma linha de rota no App.tsx

### Próximo passo
Após aprovação, crio a página com os dados atuais do relatório original. Depois você me envia os novos dados para eu atualizar.

