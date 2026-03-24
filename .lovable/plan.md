

## Plano: Otimizacao Completa da Pagina /materiais

### Problemas Identificados

**Dados incorretos dos produtos:**
- Checklists: a pagina diz "6 checklists" mas o produto real tem **21 Checklists de Obra de Interiores**
- E-book: o link de checkout esta errado (aponta para o checkout dos Checklists). O correto e `https://pay.hotmart.com/Q99258692R?off=ivk4h3rr&checkoutMode=10`
- Beneficios e dores estao genericos, nao refletem o conteudo real dos produtos

**Design vs Alem da Tendencia:**
- Hero atual e flat (grid simples texto+imagem), sem a imersao cinematografica da AT
- Falta o hero full-screen com imagem de fundo e gradientes escuros
- Nao tem sticky CTA no mobile
- Secao de produtos sem imagens dos mockups reais

---

### Otimizacoes Planejadas

#### 1. Corrigir dados dos produtos com conteudo real

**Checklists (R$ 67,00):**
- Nome: "21 Checklists Inovando na Sua Obra"
- Lista completa dos 21 checklists (Inicio de Obra, Primeiro dia, Levantamento, Demolicao, Hidraulica, Ar-condicionado, Eletrica, Impermeabilizacao, Construcao, Revestimentos, Forro de Gesso, Portas e Janelas, Pintura, Iluminacao, Piso Vinilico, Piso de Madeira, Marcenaria, Marmoraria, Vidros Box/Espelhos, Vidros Varanda, Verificacoes Finais)
- Dores: "Esquece detalhes importantes no canteiro", "Sempre apagando incendio na obra", "Nao tem processo padronizado por etapa"
- Resultado: obras mais organizadas, clientes mais satisfeitos, menos retrabalho

**E-book (R$ 97,00):**
- Corrigir URL de checkout para `https://pay.hotmart.com/Q99258692R?off=ivk4h3rr&checkoutMode=10`
- Conteudo real: Planejamento de Obra (cronograma, orcamento), Acompanhamento por Fases (Cinza, Branca, Colorida), Habilidades Tecnicas + Emocionais
- Dores: "Se sente perdida na fase de obra", "Esta sempre apagando incendio mesmo com projeto lindo", "Nao sabe como se posicionar como lider na obra"

#### 2. Inserir mockups reais dos produtos

Usar as imagens do Hotmart CDN como mockups visuais dentro dos cards de produto:
- Checklists: imagem do tablet com checklist aberto (`https://static-media.hotmart.com/IzBR7gYJQMLs2WpVobsEJo0LVuk=/1024x575/filters:quality(100)/hotmart/checkout_custom/846a1be6-e0f1-4292-b131-c26f093a3caf/adgdt769s.png`)
- E-book: mockup do celular com capa do ebook (`https://static-media.hotmart.com/HiIqt2sa_LCowhLmcljNoU7KJ0Y=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9312656/ebook_mockupscapaalternativa_(7).png`)
- Foto das criadoras em obra (`https://static-media.hotmart.com/RjkdOsfhrQmNrW2QcoWoGuqNrZ4=/filters:quality(1):format(webp)/klickart-prod/uploads/media/file/9281425/irmas_a_obra.png`)

Cada card de produto tera uma imagem de mockup no topo antes do texto.

#### 3. Hero cinematografico (estilo Alem da Tendencia)

- Full-screen dark com imagem de fundo das mentoras (usando a foto `irmas_a_obra.png` da Hotmart ou a existente `inovando-obra-new.png`)
- Gradientes escuros laterais e inferiores para legibilidade
- Headline mais agressiva na dor: "Sua obra nao precisa ser um caos"
- Sub-headline: "21 Checklists + E-book criados por quem ja gerenciou mais de 250 obras de interiores"
- Badge de prova social inline no hero

#### 4. Secao de dor antes dos produtos

Nova secao "Voce se identifica?" com cenarios reais de dor:
- "Chega na obra e nao sabe por onde comecar a conferencia"
- "O cliente liga reclamando e voce nao tem controle do que foi feito"
- "Sente que esta sempre correndo atras do prejuizo"
- "O projeto ficou lindo, mas a obra virou um pesadelo"

Estilo visual: fundo escuro, texto branco, icones vermelhos (X) para cada dor, transicao para a solucao

#### 5. Ancoragem de preco e urgencia

- Mostrar o valor que uma unica obra mal gerenciada custa (retrabalho, atraso, cliente insatisfeito)
- Comparar: "Por menos que um almoco de negocios, voce organiza todas as suas obras"
- Destacar "Parcelado em ate 3x" (info real do Hotmart)
- Badge de "Acesso imediato" e "Pagamento 100% seguro"

#### 6. Sticky CTA mobile

Barra fixa no rodape do mobile (como na pagina da Mentoria) com o preco do combo e CTA "Quero o combo completo"

#### 7. Otimizacoes de persuasao nos textos

- CTAs mais diretos: "Quero organizar minhas obras" em vez de "Quero os Checklists"
- Secao "Para Quem E" mais emocional, usando linguagem da pagina original da Hotmart
- Adicionar micro-copy de seguranca nos botoes: "Acesso imediato apos o pagamento"

---

### Arquivos alterados

- `client/src/pages/Materiais.tsx` - reescrita significativa (dados corrigidos, hero cinematografico, mockups, secao de dor, sticky CTA, ancoragem de preco)

Nenhuma alteracao em outras paginas.

