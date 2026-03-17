

## Plano: Recriar Relatório de Resultados em nova página "/"

### O que será feito

Recriar a página de relatório que existe no link compartilhado (`/relatorio` do projeto publicado) como uma nova página no projeto atual. A página atual `Home` (Mentoria) será movida para `/mentoria` e a nova página de relatório ocupará a rota `/`.

### Identidade Visual (resgatada do relatório original)

- Fundo escuro (#1a1a1a) com cards em bordas sutis
- Acentos dourados (#C9A84C / #D4AF37) para títulos e destaques
- Tipografia Montserrat/Inter com tracking wide e uppercase nos títulos de seção
- Separadores com ponto central dourado
- Cards com borda lateral esquerda colorida (verde para positivo, vermelho para atenção, azul para estratégia)
- Gráficos de rosca (donut) para distribuição de leads
- Gráfico de barras para vendas por dia e comparativos
- KPIs com animação count-up ao entrar na viewport
- Glossário colapsável (O que é ROI? / O que é ROAS?)
- Botão fixo "Exportar PDF" com classe `.no-print`
- Scroll-triggered fade-in animations

### Estrutura da Página

A página será um componente único `Relatorio.tsx` com as seguintes seções (mesma estrutura do original):

1. **Header**: Logo + título "Relatório Geral de Resultados" + período + data de geração
2. **Resumo Executivo**: 4 KPIs (Investimento, Receita, Resultado, ROI) + frase ROAS + disclaimer + glossário
3. **Imersão - Captação e Vendas**: Meta Ads desempenho, leads por fonte (donut chart), vendas Hotmart, criativos, financeiro, e-mails
4. **Mentoria - Vendas**: Meta Ads, vendas, distribuição, funil checkout, vendas por dia (bar chart), criativos, financeiro, e-mails
5. **Comparativo**: Tabela lado a lado + gráfico de barras comparativo
6. **Consolidado Financeiro**: Tabela final
7. **Oportunidade**: 206 leads quentes com 3 estratégias
8. **Observações e Recomendações**: Pontos fortes, atenção, ações prioritárias, estratégia de crescimento
9. **Fontes dos Dados**: Tabela de fontes
10. **Footer**

### Alterações Técnicas

1. **Criar `client/src/pages/Relatorio.tsx`** com toda a estrutura e dados do relatório original, usando os mesmos padrões visuais (dark theme, gold accents, count-up animations, fade-in on scroll, donut/bar charts com CSS/SVG puro)

2. **Atualizar `client/src/App.tsx`**: A rota `/` apontará para o novo `Relatorio`, e a atual `Home` (Mentoria) será movida para `/mentoria`

3. **Componentes auxiliares criados inline** no próprio Relatorio.tsx: CountUpNumber, DonutChart, BarChart, CollapsibleGlossary, para manter simplicidade

### Dados

A página será criada com a estrutura e layout completos, mas **sem dados reais preenchidos ainda**. Vou aguardar o envio dos novos dados para popular o relatório. Todos os valores serão facilmente editáveis como constantes no topo do arquivo.

### Observação

Nenhuma alteração será feita na LP Além da Tendência nem em outras páginas existentes, apenas a rota `/` será redirecionada.

