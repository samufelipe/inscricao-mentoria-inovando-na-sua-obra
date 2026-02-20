

# Melhorias na Hero, FAQ e Fix Mobile

## 1. Hero - Copy Mais Estrategica e Persuasiva

**Problema atual:** O hero nao tem titulo principal visivel — apenas o subtitulo com borda lateral. Falta comunicar o VALOR do evento de forma imediata.

**Mudancas propostas em `client/src/pages/AlemDaTendencia.tsx` (linhas 138-168):**

- Adicionar titulo principal em destaque antes do subtitulo:
  - **"Inspiracao Sem Gestao e So Tendencia Que Nao Sai do Papel"** (headline principal, grande, branco)
- Reescrever subtitulo para ser mais direto e orientado a transformacao:
  - **"4 especialistas. 4 horas. Tudo o que voce precisa para sair da ExpoRevestir com um plano real de gestao de obra, escritorio, iluminacao e contratos."**
- Manter badge de urgencia mas tornar mais incisivo:
  - **"Apenas 297 lugares — Lote Promocional com 50% OFF"**

## 2. FAQ - Duvidas Estrategicas para Quebrar Objecoes

**Problema atual:** As 7 perguntas sao muito genericas e logisticas. Nao quebram objecoes reais de quem esta indeciso antes do checkout.

**Mudancas propostas em `client/src/components/ui/faq-accordion.tsx`:**

Reescrever o array de FAQs para incluir perguntas estrategicas misturadas com as logisticas:

- **"Ja tenho experiencia. O evento e so para iniciantes?"** — Resposta posiciona o evento para quem ja atua mas quer escalar.
- **"Nao moro em Sao Paulo. Vale a pena ir?"** — Resposta reforcar o networking presencial e o ROI.
- **"O que torna este evento diferente de outros?"** — Resposta destaca as 4 especialistas reunidas + foco pratico (nao e palestra motivacional).
- **"Vou conseguir aplicar o conteudo na segunda-feira?"** — Resposta sobre conteudo pratico e acionavel.
- **"O investimento de R$147 se paga?"** — Resposta com comparacao de valor (menos que um almoco de negocios).
- Manter as logisticas essenciais: data/local, certificado, coffee break, cancelamento.
- Total: ~9 perguntas (5 estrategicas + 4 logisticas).

## 3. Hero Mobile - Imagens Muito Grandes

**Problema atual:** As 4 imagens sobrepostas (heroFar, heroLeft, heroMain, heroRight) ocupam toda a tela no mobile, empurrando o conteudo para muito baixo. O layout de composicao de 4 imagens nao funciona em telas pequenas.

**Mudancas propostas em `client/src/pages/AlemDaTendencia.tsx` (linhas 60-114):**

- Reduzir a altura minima do hero no mobile de `min-h-[80vh]` para `min-h-[60vh]`
- Esconder as imagens laterais (heroFar e heroRight) no mobile com classes `hidden md:block`
- Ajustar heroMain para ocupar mais largura no mobile: `w-[90%] md:w-[58%]`
- Ajustar heroLeft para: `hidden md:block` (ou reduzir drasticamente)
- Tornar o gradient overlay mais forte no mobile para garantir legibilidade
- Reduzir o spacer (min-h) entre logo e conteudo no mobile

---

## Detalhes Tecnicos

### Arquivos editados:
1. **`client/src/pages/AlemDaTendencia.tsx`** — Hero copy (titulo + subtitulo), hero mobile (imagens responsivas, altura)
2. **`client/src/components/ui/faq-accordion.tsx`** — Reescrita completa do array de FAQs com perguntas estrategicas

### Resumo das alteracoes por area:

```text
HERO (AlemDaTendencia.tsx):
  - Linha 60: min-h-[80vh] -> min-h-[60vh] md:min-h-[90vh]
  - Linhas 64-102: Adicionar hidden md:block em heroFar e heroRight; ajustar heroMain mobile
  - Linha 133: Reduzir spacer mobile
  - Linhas 144-150: Novo titulo h1 + subtitulo reescrito + badge atualizado

FAQ (faq-accordion.tsx):
  - Linhas 9-37: Substituir array de 7 FAQs por 9 FAQs estrategicas
```

