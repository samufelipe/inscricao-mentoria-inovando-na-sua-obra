

# E-mail da Imersão: Link da Live (1h antes)

## Contexto

O e-mail será enviado **às 08h00** avisando que a live começa **às 09h00**. Já existe o arquivo `public/emails/boas-vindas-3.html` com essa finalidade, mas vou propor melhorias para maximizar a taxa de abertura e cliques.

## E-mail Proposto

### Configurações de Envio

| Campo | Valor |
|-------|-------|
| **Assunto** | 🔴 *\|PRIMEIRO_NOME\|*, falta 1 HORA! Entre na sala do Zoom |
| **Preheader** | Clique aqui para entrar na sala do Zoom agora |
| **Horário de envio** | 08h00 (1 hora antes da live às 09h00) |
| **Identificador RD** | imersao-1h-antes |

### Estrutura do E-mail

```text
┌─────────────────────────────────────────────────────────┐
│  Background: #18181B (dark mode forçado)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  *|PRIMEIRO_NOME|*, chegou a hora! 🔥                   │
│  (dourado #D4AF37, 20px, bold)                          │
│                                                         │
│  A Imersão Cronograma 2.0: O Mapa da Obra começa        │
│  em 1 hora.                                             │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │     🔴 ACESSE O ZOOM                              │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │      ENTRAR NA SALA AGORA                   │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  (botão dourado #D4AF37)                         │  │
│  │                                                   │  │
│  │  Recomendamos entrar 10 minutos antes            │  │
│  └───────────────────────────────────────────────────┘  │
│  (box #27272A com borda dourada)                        │
│                                                         │
│  📋 LEMBRETE RÁPIDO:                                    │
│                                                         │
│  ✓ Apostila em mãos                                     │
│  ✓ Caneta e papel                                       │
│  ✓ Ambiente tranquilo                                   │
│  ✓ Celular no silencioso                                │
│                                                         │
│  Hoje vamos abordar: A mentalidade de quem gerencia     │
│  obras com sucesso + Os pilares de um cronograma        │
│  eficiente                                              │
│                                                         │
│  Nos vemos em instantes! 🚀                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Um abraço,                                             │
│  Ingrid Zarza e Fernanda Bradaschia                     │
│  Mentoras da Imersão Cronograma 2.0                     │
│  @inovandonasuaobra                                     │
├─────────────────────────────────────────────────────────┤
│  © 2026 Cronograma 2.0: O Mapa da Obra.                 │
│  São Paulo, SP                                          │
└─────────────────────────────────────────────────────────┘
```

### Código HTML Completo

O arquivo `public/emails/boas-vindas-3.html` já contém essa estrutura. Pontos de atenção:

**1. Link do Zoom (CRÍTICO)**
O e-mail já possui um link hardcoded:
```html
href="https://us06web.zoom.us/j/82080980831?pwd=R8Ynpm1cS7bl4AbEPWrksSABexP7en.1"
```

**2. Variável de Personalização**
Usa `*|PRIMEIRO_NOME|*` para personalização (padrão RD Station)

**3. Conteúdo do Módulo Manhã**
Baseado em `src/lib/constants.ts`:
- A mentalidade de quem gerencia obras com sucesso
- Os pilares de um cronograma eficiente

## Alteração Necessária

O e-mail atual já está bem estruturado. A única atualização seria substituir o link do Zoom pelo placeholder configurável `ZOOM_LINK` para uso no painel de admin:

**Linha 51 atual:**
```html
<a href="https://us06web.zoom.us/j/82080980831?pwd=..." ...>
```

**Linha 51 proposta:**
```html
<a href="ZOOM_LINK" ...>
```

Isso permite que o link seja configurado dinamicamente pelo painel `/admin/emails`.

## Resumo de Ações

| Arquivo | Alteração |
|---------|-----------|
| `public/emails/boas-vindas-3.html` | Substituir link hardcoded por `ZOOM_LINK` |

## Preview do E-mail

O e-mail pode ser visualizado e testado em:
- **Rota**: `/admin/emails`
- **Seção**: Boas-Vindas
- **Arquivo**: boas-vindas-3.html

