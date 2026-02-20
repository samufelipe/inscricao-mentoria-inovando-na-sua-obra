

# Ajustes na LP "Alem da Tendencia"

## Resumo das alteracoes

Sao 5 ajustes principais que serao feitos em arquivos especificos, sem afetar a pagina principal.

---

## 1. Hero Desktop - Reposicionar imagem das tres mulheres

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx`

A imagem central (`heroMain`) atualmente usa `object-position: center 35%`, o que corta parte das anfitrias. Vou ajustar para `object-position: center 15%` (ou similar) para "subir" a imagem e mostrar as tres mulheres de forma mais nitida. Tambem posso aumentar levemente a largura da imagem central (de 60% para 65%) para dar mais destaque.

## 2. Hero Mobile - Trocar imagem e reorganizar layout

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx`

- Trocar a imagem mobile de `heroFar` (publico sentado) para `heroMain` (tres mulheres em pe)
- Reorganizar o layout mobile para que a imagem das anfitrias apareca primeiro com mais destaque, e o formulario fique abaixo da imagem (em vez de sobrepor)
- Ajustar `object-position` para centralizar as tres mulheres no mobile tambem
- Manter os efeitos visuais (gradientes, vinheta) que ja estao aplicados

## 3. Preco com parcelamento estrategico

**Arquivo:** `client/src/components/ui/hero-registration-form.tsx`

Atualizar a exibicao de preco no formulario:
- Manter o preco cheio riscado: ~~R$ 297,00~~
- Manter o preco total: R$ 147,00
- Adicionar abaixo: **ou 5x de R$ 29,40** (mais acessivel visualmente)

Concordo com a sugestao de 5x de R$ 29,40 - e um valor psicologicamente atraente (abaixo de R$ 30 por parcela).

## 4. Reduzir tamanho dos titulos das secoes

**Arquivo:** `client/src/components/ui/architectural-title.tsx`

Reduzir levemente os tamanhos tipograficos do variant `h2` (usado em todas as secoes):

De:
```
text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
```
Para:
```
text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
```

Uma reducao de 1 nivel em cada breakpoint - sutil mas suficiente para ficar mais clean.

## 5. Remover duas perguntas do FAQ

**Arquivo:** `client/src/components/ui/faq-accordion.tsx`

Remover as duas perguntas marcadas em vermelho na imagem:
- "Receberei certificado de participacao?"
- "Havera coffee break?"

O FAQ ficara com 7 perguntas em vez de 9.

---

## Detalhes tecnicos

### Arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `client/src/pages/AlemDaTendencia.tsx` | Reposicionar heroMain no desktop (object-position), trocar imagem mobile para heroMain, reorganizar layout mobile (imagem + formulario empilhados) |
| `client/src/components/ui/hero-registration-form.tsx` | Adicionar linha de parcelamento "ou 5x de R$ 29,40" |
| `client/src/components/ui/architectural-title.tsx` | Reduzir tamanhos do variant h2 em 1 nivel por breakpoint |
| `client/src/components/ui/faq-accordion.tsx` | Remover 2 itens do array de FAQs (certificado e coffee break) |

### Impacto

- Nenhuma alteracao afeta a pagina principal (Home/Mentoria)
- O componente `ArchitecturalTitle` e compartilhado, mas a reducao e sutil e melhora ambas as paginas
- Nenhuma dependencia nova necessaria

