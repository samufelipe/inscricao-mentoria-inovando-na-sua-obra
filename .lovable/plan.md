

## Plano: Atualizar Relatório para Além da Tendência

### Dados calculados
- **Taxa de conversão da LP**: 35 leads / 514 visualizações = **6,81%**
- **Receita rastreada (remarketing)**: 35 compras × R$ 167 = **R$ 5.845,00**
- **ROAS do remarketing**: R$ 5.845 / R$ 480,62 = **12,16x**
- **ROAS parcial consolidado**: R$ 5.845 / R$ 1.148,61 = **5,09x**

### Estrutura do novo relatório

Reescrever **todo o conteúdo** de `client/src/pages/Relatorio.tsx` mantendo o mesmo design (dark theme, cards, animações, gráficos), mas com estrutura adaptada:

1. **Header** — Logo Além da Tendência (`logo-dark.png`), título "Relatório de Resultados - Campanhas Meta Ads", período 23/02 - 10/03/2026 (15 dias)

2. **Resumo Executivo** — 4 KPIs:
   - Investimento Total: R$ 1.148,61
   - Receita Rastreada (Remarketing): R$ 5.845,00
   - Compras via Ads: 35
   - ROAS Remarketing: 12,16x
   - Disclaimer: receita rastreada refere-se apenas às compras atribuídas à campanha de remarketing

3. **Seção: Campanha de Captação de Leads** — Card com stats (investimento R$ 415,04, CPL R$ 11,85, leads 35, visualizações LP 514, custo/visualização R$ 0,81, CTR campeão 2,34%, taxa conversão LP 6,81%), link do criativo campeão

4. **Seção: Campanha de Distribuição de Vídeo** — Card com stats (investimento R$ 252,95, reproduções 3s+ 8.186, custo/visualização R$ 0,03, visualizações LP 45), links dos 3 melhores vídeos

5. **Seção: Campanha de Remarketing** — Card com stats (investimento R$ 480,62, compras 35, CPA R$ 13,73, ticket R$ 167, CTR 13,22%, receita R$ 5.845), destaque do criativo campeão (todas as 35 vendas), ROAS 12,16x

6. **Distribuição de Investimento** — Donut chart com as 3 campanhas (Captação R$ 415,04, Vídeo R$ 252,95, Remarketing R$ 480,62)

7. **Consolidado Financeiro** — Tabela com investimento, receita rastreada, ROAS por campanha

8. **Observações e Recomendações** — Pontos Fortes (CTR 13,22% do RMKT excepcional, CPL competitivo, custo de vídeo R$ 0,03 excelente, conversão LP 6,81%), Pontos de Atenção (sem rastreamento completo Sympla, base de leads pequena), Ações Prioritárias (implementar pixel Sympla, escalar remarketing, ampliar captação)

9. **Fontes dos Dados** — Gerenciador Meta, Sympla (parcial)

### Seções REMOVIDAS (não se aplicam)
- Imersão e Mentoria separados → substituídos pelas 3 campanhas
- E-mails → não houve disparos
- Funil de checkout → sem dados
- Comparativo Imersão vs Mentoria → não se aplica
- Oportunidade leads quentes → sem dados de abandono

### Arquivo alterado
- `client/src/pages/Relatorio.tsx` — reescrita completa dos dados e seções, mantendo componentes auxiliares (AnimatedNumber, FadeInSection, CardBox, etc.)

