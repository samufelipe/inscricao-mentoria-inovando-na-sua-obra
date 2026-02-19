
# Isolamento da LP "Alem da Tendencia"

## Problema
O titulo da pagina e o favicon sao definidos globalmente no `index.html` como "Mentoria Inovando Sua Obra" com o favicon `favicon-inovando.png`. Quando o usuario acessa `/alem-da-tendencia`, ve o mesmo titulo e favicon da pagina principal.

## Solucao

### 1. Titulo e favicon dinamicos no componente AlemDaTendencia
Adicionar um `useEffect` no componente `AlemDaTendencia.tsx` que:
- Altera `document.title` para "Alem da Tendencia - Evento Presencial" ao montar
- Restaura o titulo original "Mentoria Inovando Sua Obra" ao desmontar
- Altera o favicon dinamicamente para um favicon especifico do evento
- Restaura o favicon original ao desmontar

Isso garante **zero impacto** na pagina principal (`/`), pois as alteracoes so acontecem quando o componente esta montado.

### 2. Arquivos afetados
- `client/src/pages/AlemDaTendencia.tsx` - Adicionar useEffect para titulo e favicon dinamicos

### Detalhes tecnicos
```text
Fluxo:
  Usuario acessa /              -> titulo: "Mentoria Inovando Sua Obra", favicon: favicon-inovando.png
  Usuario acessa /alem-da-tendencia -> titulo: "Alem da Tendencia - Evento Presencial", favicon alterado
  Usuario volta para /          -> titulo e favicon restaurados automaticamente (cleanup do useEffect)
```

Nenhum arquivo da pagina principal sera editado. Apenas o componente `AlemDaTendencia.tsx` recebera o useEffect.
