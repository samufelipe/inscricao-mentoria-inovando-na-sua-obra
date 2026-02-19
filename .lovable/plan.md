

## Plano: Reconstruir a LP da Mentoria Exatamente Como o Manus Criou

### Referencia Cruzada: Screenshots + Versao Publicada

Analisei cada screenshot que voce enviou e cruzei com o conteudo ainda disponivel na versao publicada. A estrutura exata que o Manus criou e a seguinte:

### Estrutura Exata da LP (na ordem dos seus screenshots)

| # | Secao | Descricao Visual (conforme screenshots) |
|---|---|---|
| 1 | **Hero** | Fundo beige (#F5F5F0), logo "mentoria INOVANDO na sua obra" no topo, titulo "DOMINE O GERENCIAMENTO DE OBRA DE INTERIORES DE MANEIRA LUCRATIVA E EFICIENTE", subtitulo, formulario com 3 campos (nome, email, WhatsApp) + botao verde "QUERO ENTRAR NA MENTORIA", foto das fundadoras com capacetes amarelos a direita |
| 2 | **Skills** | Titulo dourado "O QUE VOCE VAI APRENDER?", imagem com duas colunas: "HABILIDADES TECNICAS" + "HABILIDADES COMPORTAMENTAIS" com itens listados em cada uma |
| 3 | **Audience** | Titulo "Para quem e?", paragrafo descritivo, imagem com cards em escada mostrando perfis-alvo (arquitetas, designers, engenheiras) |
| 4 | **How It Works** | Imagem completa "Como funciona a Mentoria Inovando na sua Obra" com 9 itens (2 Direcionamentos individuais, Aulas gravadas, 12 meses de acesso, etc.) |
| 5 | **Modules** | Titulo "Como e a mentoria por dentro?", 4 cards de modulos verticais: Modulo 01 (Primeiros Passos), Modulo 02 (Projeto Executavel), Modulo 03 (Gerenciamento de Obra), Modulo 04 (Finalizacao e Fidelizacao) |
| 6 | **Bonus** | Titulo "Bonus Exclusivos", 2 imagens grandes: Pack de documentos + Aulas bonus com especialistas |
| 7 | **Revenue** | Titulo "Como voce pode faturar mais?", 2 imagens com prints de depoimentos WhatsApp de alunas |
| 8 | **Pricing** | Faixa "Investimento" com fundo escuro, titulo "E quanto e o investimento mais importante do seu ano?", 3 stats (+250 Obras, +100 Alunas, 12 Anos), card branco com preco "12x R$ 196,50" ou "R$ 1.900,00 a vista", lista de 6 beneficios, 2 CTAs (cartao verde + boleto link), selo "Compra 100% segura - Garantia de 15 dias" |
| 9 | **Testimonials** | Titulo "Veja o que dizem nossas alunas:", 4 thumbnails (Beatriz Francini, Ingrid Cristina, Monique Figueiredo, Aline Araujo), botao CTA abaixo |
| 10 | **Guarantee** | Titulo "Risco Zero para voce", texto sobre garantia incondicional de 15 dias, imagem do selo de garantia (versao desktop + versao mobile separada) |
| 11 | **About** | Titulo "Quem Somos", bio completa de Ingrid Zarza e Fernanda Bradaschia (texto longo sobre a trajetoria, 250+ obras, criacao da @inovandonasuaobra, mentoria em 2024), foto das duas juntas |
| 12 | **FAQ** | Titulo "Perguntas Frequentes", 5 itens em accordion: (1) Aulas gravadas ou ao vivo?, (2) Em quanto tempo termino?, (3) Por quanto tempo tenho acesso?, (4) Consigo conciliar?, (5) Nao encontrei a resposta |
| 13 | **Footer** | Copyright + informacoes de contato |

### Imagens a Recuperar da Versao Publicada (20 arquivos)

Todas serao salvas em `client/public/images/mentoria/`:

| Arquivo | URL de origem |
|---|---|
| logo.png | assets/logo-B5iBDUge.png |
| hero-photo.png | assets/hero-photo-D9ioNNKp.png |
| skills.png | assets/skills-DhKENN60.png |
| audience.png | assets/audience-B3vdsGgr.png |
| how-works.png | assets/how-works-xiSuDnor.png |
| module1.png | assets/module1-CKV0VCnr.png |
| module2.png | assets/module2-C9z4QJ7C.png |
| module3.png | assets/module3-gvgxXMZp.png |
| module4.png | assets/module4-CEZ2e8h8.png |
| bonus1.png | assets/bonus1-1V7HWBaN.png |
| bonus2.png | assets/bonus2-DB4RGr4R.png |
| revenue1.png | assets/revenue1-lfkgh9Mx.png |
| revenue2.png | assets/revenue2-onwCsygo.png |
| testimonial1.png | assets/testimonial1-D6-4pHHm.png |
| testimonial2.png | assets/testimonial2-y3Li3fMM.png |
| testimonial3.png | assets/testimonial3-BzN-E2zH.png |
| testimonial4.png | assets/testimonial4-DuU-Fjbz.png |
| guarantee.png | assets/guarantee-BWkikap0.png |
| garantia-mobile.png | assets/garantia-15-dias-mobile-2VNARl1S.png |
| about.png | assets/about-B4r7qSBX.png |

### Integracoes Exatas a Implementar

| Integracao | Detalhes |
|---|---|
| **Formulario Hero** | 3 campos: nome completo, email, WhatsApp com mascara BR (99) 99999-9999 + validacao Zod + redireciona para checkout Hotmart |
| **CTA Cartao** | `https://pay.hotmart.com/Y93975016X?off=22jnl093` |
| **CTA Boleto** | `https://pay.hotmart.com/Y93975016X?off=et69m72o` |
| **CTA Mobile Sticky** | Botao fixo na parte inferior em mobile com "12x R$ 196" |

### Design Exato (conforme screenshots)

| Elemento | Valor |
|---|---|
| Fundo geral | Beige #F5F5F0 / #EDE8DC |
| Titulos | Dourado/amarelo, Montserrat Bold Uppercase |
| CTA principal | Verde escuro #1B8A3F, texto branco, bold |
| Secao Pricing | Fundo escuro/preto com card branco central |
| Secao Guarantee | Fundo beige com imagem selo |
| Secao About | Fundo branco com texto a esquerda e foto a direita |
| Animacoes | Fade-in ao scroll com Framer Motion |

### Conteudo Textual Exato (extraido da versao publicada)

**FAQ - 5 perguntas com respostas completas:**
1. "As aulas sao gravadas ou ao vivo?" - Todo o conteudo ja esta gravado e organizado por temas na plataforma...
2. "Em quanto tempo eu termino a mentoria?" - Aproximadamente 3 meses. Todo conteudo gravado sao 16h...
3. "Por quanto tempo eu tenho acesso ao conteudo?" - 1 ano de acesso.
4. "Sera que consigo conciliar a mentoria com meus outros compromissos?" - Sabemos que o dia a dia nas obras sao corridos...
5. "Nao encontrei a resposta para a minha duvida, como faco?" - (link para contato)

**About - Bio completa:**
"Somos Ingrid Zarza e Fernanda Bradaschia, arquitetas apaixonadas por compartilhar conhecimento e transformar a gestao de obras de interiores. Unimos nossas experiencias para fundar a INOVANDO ARQUITETURA..."

**Pricing - 6 beneficios:**
1. 16h de conteudo gravado em 4 modulos
2. 12 meses de acesso a plataforma
3. 1h de mentoria individual
4. Encontro presencial em Sao Paulo
5. Materiais, checklists e ferramentas
6. Suporte e grupo de networking

### Arquivos a Criar/Alterar

| Arquivo | Acao |
|---|---|
| `client/public/images/mentoria/` (20 arquivos) | Salvar imagens da versao publicada |
| `client/src/pages/Home.tsx` | Substituir placeholder pela LP completa com todas as 13 secoes |

### Resultado Final

A rota `/` exibira a LP da Mentoria **identica** a que o Manus criou, com todas as imagens, formulario funcional, links Hotmart, FAQ accordion e CTA mobile sticky. A rota `/alem-da-tendencia` continuara inalterada.

