

# Reestruturar Secao "Para Quem E Este Evento"

## Objetivo
Restaurar o layout da secao para corresponder exatamente a imagem de referencia: titulo no topo, montagem de imagens em largura total abaixo, seguida por 3 cards em grid e CTA centralizado.

## Layout atual vs. desejado

**Atual:** Grid de 2 colunas (montagem a esquerda, lista de texto a direita)

**Desejado (conforme imagem):**
1. Titulo "PARA QUEM E ESTE EVENTO?" centralizado no topo com subtitulo
2. Montagem de imagens em largura total (AudienceMontageV2) abaixo do titulo
3. Tres cards lado a lado em grid de 3 colunas
4. Texto "SE VOCE SE IDENTIFICOU..." + botao CTA centralizado abaixo

## Cards planejados

**Card 1 - "Arquitetas e Designers de Interiores"**
- Icone: Users
- Texto conforme solicitado: "Voce que projeta, especifica e executa, mas sente que falta metodo para escalar. Aqui voce vai estruturar seu escritorio como uma empresa real."
- Titulo principal: "Arquitetas e Designers de Interiores"
- Abaixo, os 4 topicos fornecidos como lista compacta

**Card 2 - "Quem Busca Estrutura e Processos"**
- Icone: CheckCircle2
- Texto: "Talento sem gestao nao escala. Se voce precisa profissionalizar com seguranca e organizar sua operacao, este evento foi desenhado para voce."

**Card 3 - "Quem Quer Transformar Tendencia em Execucao"**
- Icone: Calendar/Building
- Texto: "Voce acompanha feiras, se inspira e consome conteudo, mas na hora de executar, falta seguranca juridica e metodo de obra. Aqui a tendencia vira projeto entregue."

## Estilo dos cards
- Fundo escuro sutil com borda esquerda dourada (border-l-2 border-[#C9A84C]/30)
- Sem background branco, mantendo coerencia com o fundo escuro da secao
- Icones dourados no topo de cada card

## Detalhes tecnicos

### Arquivo: `client/src/pages/AlemDaTendencia.tsx` (linhas 343-402)

Substituir o grid de 2 colunas por layout empilhado:

```
Titulo + subtitulo (centralizado)
   |
AudienceMontageV2 (largura total, sem grid)
   |
Grid 3 colunas com cards (md:grid-cols-3)
   |
CTA centralizado
```

- A `AudienceMontageV2` sera movida para fora do grid e exibida em largura total
- O primeiro card incluira o titulo "Arquitetas e Designers de Interiores" com os 4 bullet points do usuario em formato compacto
- Cards usam `bg-white/5` com `border-l-2 border-[#C9A84C]/30` e padding generoso
- Subtitulo abaixo do titulo principal: "Se voce sente que o bastidor do seu negocio precisa de mais estrutura, este evento e para voce."

