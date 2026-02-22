

# Otimizacao: Badge "Ultimas Vagas" + Destaque para 1o Lote

## 1. Remover background do badge "ULTIMAS VAGAS DISPONIVEIS"

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linha 538)

Atual:
```text
bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full
```

Novo: remover `bg-red-500/10` e `border border-red-500/30`, mantendo apenas o texto com a animacao:
```text
text-red-400 px-4 py-2 text-sm font-bold uppercase tracking-wider animate-pulse
```

Resultado: badge sem fundo e sem borda, apenas o texto vermelho pulsando.

---

## 2. Otimizar tag "LOTE 01" com destaque e escassez

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linhas 561-563)

Atual: um simples badge dourado com texto "Lote 01"

Novo: substituir por um bloco maior e mais impactante com:
- Titulo em destaque: **1o LOTE** (texto maior, dourado, sem background no badge)
- Subtitulo de escassez logo abaixo: "Valor exclusivo para as primeiras inscritas" em texto claro/dourado menor
- Remover o `bg-[#C9A84C]` do badge e usar apenas texto dourado destaque
- Layout: texto centralizado, sem pill/badge, direto no header do card

Estrutura visual:
```text
[Logo Alem da Tendencia]

1o LOTE
Valor exclusivo para as primeiras inscritas
```

O texto "1o LOTE" sera grande (`text-2xl font-bold text-[#C9A84C] tracking-widest uppercase`) e o subtitulo sera menor (`text-xs text-white/50`).

---

## Arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `client/src/pages/AlemDaTendencia.tsx` | Linha 538: remover bg/border do badge de urgencia. Linhas 561-563: substituir pill dourada por texto grande "1o LOTE" + frase de escassez |

