

# Atualização de Horário e Alinhamento da Copy com a Promessa "A Arquitetura Acontece nos Bastidores"

## Resumo

Duas frentes de trabalho: (1) corrigir o horário do evento para 13:30 - 19h em todos os pontos da LP e (2) alinhar a copy inteira com a promessa central "A Arquitetura acontece nos bastidores", reforçando a ideia de que o que sustenta uma carreira sólida em arquitetura é o que acontece por trás dos projetos -- gestão, método, contratos, processos.

---

## 1. Atualização do Horário (13:30 - 19h)

Todos os locais onde o horário ou duração do evento aparecem:

| Arquivo | Texto Atual | Texto Novo |
|---------|------------|------------|
| `faq-accordion.tsx` (FAQ "Quando e onde") | "das 14h as 18h" | "das 13h30 as 19h" |
| `faq-accordion.tsx` (FAQ "vale a pena?") | "4 horas com especialistas" | "mais de 5 horas com especialistas" |
| `scarcity-banner.tsx` | "10 de Marco de 2026" (sem horario) | "10 de Marco de 2026 - 13h30 as 19h" |
| `sticky-header.tsx` | "Evento Presencial - 10 de Marco" | "10 de Marco - 13h30 as 19h" |

---

## 2. Alinhamento da Copy com "A Arquitetura Acontece nos Bastidores"

### Hero (AlemDaTendencia.tsx)

- **H1 atual**: "Inspiracao Sem Gestao E So Tendencia Que Nao Sai do Papel"
- **H1 novo**: "A Arquitetura Acontece nos Bastidores" -- a promessa vira o titulo principal, direto e memoravel.
- **Subtitulo atual**: "Tudo o que voce precisa para sair da ExpoRevestir com um plano real..."
- **Subtitulo novo**: "Gestao de obra, escritorio, iluminacao e contratos: o que ninguem mostra nas feiras, mas que define quem cresce de verdade." -- reforco dos bastidores sem mencionar ExpoRevestir.

### Secao "O Conceito" (Tendencia Encanta. Estrutura Constroi.)

- **Titulo**: manter "Tendencia Encanta. Estrutura Constroi." -- complementa perfeitamente a promessa.
- **Paragrafo 1 ajustado**: Remover referencia a ExpoRevestir. Novo: "O mercado celebra tendencias, lancamentos e vitrines. Mas para que uma ideia vire obra executada e cliente satisfeito, e preciso estrutura."
- **Paragrafo 2 ajustado**: "O evento Alem da Tendencia nasceu para revelar o que acontece nos bastidores. Enquanto o mercado fala de estetica, nos falamos do que sustenta tudo: o negocio."
- **Citacao**: manter como esta -- ja combina perfeitamente.

### Secao "Para Quem E"

- **Subtitulo ajustado**: "Se voce sente que o bastidor do seu negocio precisa de mais estrutura, este evento e para voce."

### Secao Anfitrias (hosts-section.tsx)

- **Frase de abertura atual**: "Nos tres representamos o bastidor que sustenta uma carreira solida." -- ja esta perfeita, manter.
- **Frase final atual**: "Juntas, mostramos que autoridade nao nasce da estetica, nasce da base."
- **Frase final nova**: "Juntas, mostramos que a arquitetura de verdade acontece nos bastidores."

### CTA dos Palestrantes

- **Texto atual**: "4 especialistas. 1 dia. Conteudo que transforma carreiras."
- **Texto novo**: "4 especialistas. 1 dia. O bastidor que transforma carreiras."

### Footer

- **Descricao atual**: "O evento presencial definitivo para arquitetas e designers que buscam gestao, lucratividade e seguranca juridica."
- **Descricao nova**: "O evento que revela os bastidores de uma carreira solida em arquitetura: gestao, lucratividade e seguranca juridica."

### Copyright

- **Ano atual**: 2025
- **Ano novo**: 2026

---

## Detalhes Tecnicos

### Arquivos editados:

1. **`client/src/pages/AlemDaTendencia.tsx`**
   - Linha 147: H1 do hero
   - Linha 151: subtitulo do hero
   - Linhas 222-228: paragrafos da secao O Conceito
   - Linha 273: subtitulo "Para Quem E"
   - Linha 428: texto CTA palestrantes
   - Linha 628: descricao footer
   - Linha 665: copyright 2025 para 2026

2. **`client/src/components/ui/hosts-section.tsx`**
   - Linha 96: frase final das anfitrias

3. **`client/src/components/ui/scarcity-banner.tsx`**
   - Linha 20: adicionar horario

4. **`client/src/components/ui/sticky-header.tsx`**
   - Linha 51: adicionar horario

5. **`client/src/components/ui/faq-accordion.tsx`**
   - Linha 24: "4 horas" para "mais de 5 horas"
   - Linha 32: "14h as 18h" para "13h30 as 19h"

### Principio da edicao:
Todas as alteracoes sao cirurgicas na copy -- nenhuma mudanca de layout, estrutura ou componentes. Apenas texto atualizado para coerencia com a promessa e horario correto.

