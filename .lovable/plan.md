

# Correcao e Otimizacao Completa da LP "Alem da Tendencia"

## Problemas Criticos Encontrados (PDF vs Pagina Atual)

### 1. Palestrantes ERRADAS
A pagina mostra 4 palestrantes, mas o documento lista apenas **2 palestrantes reais**:
- **Luciana Guerra** (Lu Guerra) - Especialista em ILUMINACAO (nao engenharia civil/patologias como esta na pagina). 64.1k seguidores, mais de 2.500 alunos formados
- **Marcia Pereira** - ADVOGADA especializada em contratos para arquitetos (nao arquiteta/gestao de escritorios como esta na pagina)
- "Renata Fuentes" e "Convidada Especial" NAO existem no documento - sao ficticias

### 2. Descricoes das Anfitrias e Palestrantes Incorretas
- **Juliana Campelo** esta descrita no documento como fundadora da AjudaMONU, especialista em gestao estrategica para escritorios de arquitetura, 850+ escritorios atendidos, 3000+ alunos, 47.3k seguidores
- As descricoes de Luciana e Marcia estao completamente erradas

### 3. Horario Errado
- Pagina mostra: **09h as 18h**
- Documento real: **14h as 18h**

### 4. Modulos de Conteudo Incorretos
- Os 4 modulos atuais nao correspondem as palestrantes reais
- Precisam ser reescritos para refletir: Iluminacao (Luciana) e Contratos (Marcia)

---

## Plano de Implementacao

### Tarefa 1: Corrigir Palestrantes (de 4 para 2)
**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linhas 304-356)

Reduzir de 4 para 2 SpeakerCards com dados corretos:

**Luciana Guerra:**
- Role: "Especialista em Iluminacao"
- Description: "Arquiteta e Urbanista especialista em iluminacao, com foco na metodologia propria. Defende que a luz e o elemento mais importante de qualquer espaco. Mentora de profissionais de elite."
- SocialProof: "64.1 mil seguidores | 2.500+ alunos formados"
- Imagem: extrair foto do PDF (pagina 13)

**Marcia Pereira:**
- Role: "Advogada - Contratos para Arquitetos"
- Description: "Especialista em unir seguranca juridica e identidade profissional. Traduz o juridiques para a linguagem do projeto, ajudando escritorios a criarem contratos que valorizam a marca e protegem o profissional."
- SocialProof: "Referencia em contratos de arquitetura"
- Imagem: extrair foto do PDF (pagina 14)

Grid passa de `lg:grid-cols-4` para `md:grid-cols-2` centralizado com `max-w-3xl mx-auto`.

### Tarefa 2: Corrigir Horario
**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linha 439)

Alterar "Das 09h as 18h" para "Das 14h as 18h".

### Tarefa 3: Reescrever Modulos de Conteudo
**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linhas 375-400)

Reduzir de 4 para 4 modulos alinhados com as anfitrias + palestrantes reais:
- Modulo 01: "Gestao de Obra" - Ingrid Zarza e Fernanda Bradaschia
- Modulo 02: "Gestao de Escritorio" - Juliana Campelo
- Modulo 03: "Iluminacao que Transforma" - Luciana Guerra
- Modulo 04: "Contratos que Protegem" - Marcia Pereira

### Tarefa 4: Adicionar Secao de Patrocinadores
**Arquivo:** `client/src/pages/AlemDaTendencia.tsx`

Nova secao entre o FAQ e o CTA final. Estrutura:
- Titulo: "Parceiros e Patrocinadores"
- Grid responsivo para logos (placeholder com texto "Em breve" ate o usuario enviar as logos reais)
- Fundo claro com borda sutil, estilo minimalista
- Preparado para receber de 4 a 8 logos via imagens

### Tarefa 5: Extrair e Salvar Fotos Reais das Palestrantes
**Arquivos novos:**
- `client/src/assets/alem-da-tendencia/luciana-guerra.jpg` (extraida do PDF pagina 13)
- `client/src/assets/alem-da-tendencia/marcia-pereira.jpg` (extraida do PDF pagina 14)

Estas fotos reais substituirao as URLs do Manus CDN que podem expirar.

### Tarefa 6: Melhorias de Copy para Conversao (Meta Ads)

**Hero:**
- Subtitulo mais orientado a acao: "O evento presencial que une as especialistas que voce acompanha online -- ao vivo, em Sao Paulo"
- Adicionar badge de urgencia no formulario: "Ultimas vagas - Auditorio para apenas 297 pessoas"

**Secao "Para Quem E":**
- Reescrever com dor/desejo mais agressivo para ads
- "Voce sai da ExpoRevestir cheia de ideias... mas na segunda-feira, a realidade do escritorio e da obra continua a mesma?"

**CTA Final:**
- Reforcar escassez: "Auditorio AFRESP - Capacidade Maxima: 297 lugares"
- Adicionar contagem de beneficios mais tangivel

**Secao Anfitrias (HostsSection):**
- Atualizar dados da Juliana Campelo com metricas reais: "850+ escritorios impactados, 47.3k seguidores, 3000+ alunos"

---

## Detalhes Tecnicos

### Arquivos editados:
1. `client/src/pages/AlemDaTendencia.tsx` - Correcoes de palestrantes, horario, modulos, nova secao patrocinadores, melhorias de copy
2. `client/src/components/ui/hosts-section.tsx` - Atualizar dados e metricas das anfitrias
3. `client/src/assets/alem-da-tendencia/luciana-guerra.jpg` - Foto real (do PDF)
4. `client/src/assets/alem-da-tendencia/marcia-pereira.jpg` - Foto real (do PDF)

### Secao de Patrocinadores (estrutura):
```text
+----------------------------------------------------------+
|           PARCEIROS E PATROCINADORES                      |
|                                                           |
|   [Logo 1]   [Logo 2]   [Logo 3]   [Logo 4]             |
|   [Logo 5]   [Logo 6]   [Logo 7]   [Logo 8]             |
|                                                           |
|   (placeholders ate o usuario enviar as logos)            |
+----------------------------------------------------------+
```

Grid responsivo: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` com items centralizados, grayscale por padrao e cor no hover.

