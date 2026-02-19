

# Otimizacao da Hero - LP Alem da Tendencia

## Objetivo
Limpar e otimizar a secao Hero, usando a foto das tres mulheres em pe (DSC03181_1.jpg) como imagem principal, reduzindo a logo, removendo redundancias e melhorando o layout mobile.

## Alteracoes

### 1. Nova imagem hero
- Copiar `DSC03181_1.jpg` para `client/src/assets/alem-da-tendencia/hero-event.png` (substituindo a atual)
- Ajustar `object-position` para focar nas tres mulheres (parte superior/centro)

### 2. Reduzir a logo
- Diminuir o container da logo de `max-w-[320px] md:max-w-[400px]` para `max-w-[180px] md:max-w-[220px]`
- Aplicar `mix-blend-mode: multiply` na imagem da logo para remover o fundo branco visualmente (funciona quando o fundo da secao e claro)

### 3. Limpar informacoes redundantes
- Remover o badge "Evento Presencial em Sao Paulo" (ja esta implicito na data/local abaixo)
- Remover o texto "Vagas limitadas a 200 participantes" (ja existe um ScarcityBanner logo abaixo da hero)
- Manter apenas: logo (menor), subtitulo, card de data/local e formulario

### 4. Arquivo editado
- `client/src/pages/AlemDaTendencia.tsx` - Secao hero (linhas 54-134)

### Detalhes tecnicos

```text
Estrutura da Hero apos otimizacao:
  [Imagem hero: 3 mulheres em pe - full width com gradient fade]
  [Grid 2 colunas]
    Esquerda:
      - Logo (menor, com mix-blend-mode: multiply para fundo transparente)
      - Subtitulo com borda lateral
      - Card data + local
    Direita:
      - Formulario de inscricao (sem alteracao)
```

A tecnica `mix-blend-mode: multiply` faz com que pixels brancos da logo se tornem transparentes visualmente sobre fundos claros, sem necessidade de editar a imagem original.

