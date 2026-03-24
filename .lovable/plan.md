

## Plano: Otimizar /materiais para conversao maxima (sem secao de depoimentos)

### O que muda

Aplicar 6 melhorias estrategicas na pagina para aumentar conversao em campanhas de Meta Ads, usando gatilhos psicologicos e copy orientada a acao. A secao de depoimentos **nao** sera implementada.

### Mudancas

**1. CTAs mais fortes (Hero + CTA Final)**
- Hero mobile/desktop: "Ver materiais" → "Quero organizar minhas obras"
- Hero mobile/desktop: "Combo com 10% OFF" → "Quero o Kit Completo — 10% OFF"
- CTA Final: mesma logica, orientados a transformacao
- Sticky mobile: "Quero o Combo" → "Quero o Kit Completo"

**2. Secao "Stack de Valor" (NOVA) — entre Ancoragem de Preco e Produtos**
Lista visual com valor percebido individual antes dos cards de produto:
```text
✓ 21 Checklists de Obra ............. R$ 67
✓ E-book Domine a Sua Obra ......... R$ 97
✓ Acesso vitalicio
✓ Atualizacoes futuras
✓ 7 dias de garantia
─────────────────────────────────────────
Valor total: R$ 164
Voce paga: R$ 147,60 (ou 3x de R$ 49,20)
```
Fundo escuro, borda dourada, estilo premium.

**3. Ancoragem de preco melhorada**
Adicionar comparacao concreta:
- "Um unico retrabalho de piso pode custar R$ 3.000+."
- "Menos que um metro quadrado de porcelanato."

**4. Secao "Para quem NAO e" (NOVA) — logo apos "Para quem e"**
Gatilho de exclusividade com 3 itens:
- "Quem busca formula magica sem colocar em pratica"
- "Quem nao atua ou nao pretende atuar em obra"
- "Quem espera conteudo motivacional — aqui e processo e execucao"
Mesmo estilo visual da secao "Para quem e", mas com icone X vermelho.

**5. Copy "Para quem e" mais emocional**
Substituir os 6 itens atuais por cenarios mais vividos:
- "Voce entrega o projeto lindo, mas na obra sente que perde o controle"
- "Ja perdeu cliente por causa de atraso ou retrabalho que poderia ter sido evitado"
- "Abre a planilha e nao sabe se esta no prazo ou no prejuizo"
- "Quer parar de improvisar e ter processos claros no canteiro"
- "Esta comecando a atuar em obra e sente inseguranca"
- "Quer se posicionar como referencia em gestao de obra"

**6. Micro-urgencia real no Combo**
Adicionar badge "Menor preco disponivel" e texto: "Esse e o menor valor que esses materiais ja tiveram juntos."

### Arquivo modificado
- `client/src/pages/Materiais.tsx` (unico arquivo)

### Ordem final das secoes
1. Hero (CTAs melhorados)
2. Social Proof Numbers
3. Secao de Dor
4. Quem criou
5. Ancoragem de preco (melhorada)
6. Stack de valor (NOVA)
7. Produtos individuais + Combo (com badge de urgencia)
8. Para quem e (copy refinada)
9. Para quem NAO e (NOVA)
10. Garantia
11. FAQ
12. CTA Final (CTAs melhorados)
13. Footer + Sticky mobile

